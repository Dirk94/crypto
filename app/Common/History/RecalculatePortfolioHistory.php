<?php

namespace App\Common\History;

use App\Common\Helpers\DateUtils;
use App\Jobs\UpdatePortfolioBalance;
use App\Models\History\CoinMinuteHistory;
use App\Models\History\PortfolioCoinDayHistory;
use App\Models\History\PortfolioCoinHourHistory;
use App\Models\History\PortfolioCoinMinuteHistory;
use App\Models\Portfolio;
use App\Models\PortfolioCoin;
use App\Models\Transaction;
use Carbon\Carbon;

class RecalculatePortfolioHistory
{
    public static function recalculateHistory(Portfolio $portfolio, $startAtDate = null)
    {
        $transactions = $portfolio->transactions()
            ->orderBy('transaction_at', 'ASC')
            ->whereProcessed(false)
            ->get();

        if ($transactions->isEmpty()) {
            return false;
        }

        $firstMinuteDate = DateUtils::toNearestFiveMinutes(Carbon::now()->subMinutes(PortfolioHistory::TIME_TO_KEEP_MINUTE_DATA));
        $firstHourDate = Carbon::now()->subHours(PortfolioHistory::TIME_TO_KEEP_HOUR_DATA);
        $firstDayDate = Carbon::now()->subDays(PortfolioHistory::TIME_TO_KEEP_DAY_DATA);

        $firstTransactionDate = DateUtils::toNearestFiveMinutes($transactions->first()->transaction_at);
        $startDate = DateUtils::toNearestFiveMinutes($firstTransactionDate);

        $latestDate = DateUtils::toCarbon(CoinMinuteHistory::orderBy('date', 'DESC')->first()->date);

        self::destroyPortfolioHistory($portfolio, $startDate);

        while($startDate->lessThan($latestDate)) {
            self::calculatePortfolioValueAt($portfolio, $startDate, $firstMinuteDate, $firstHourDate, $firstDayDate);

            if ($startDate->greaterThan($firstMinuteDate)) {
                $startDate->addMinutes(5);
            } else if ($startDate->greaterThan($firstHourDate)) {
                $startDate->addHour();
            } else {
                $startDate->addDay();
            }
        }

        return true;
    }

    private static function calculatePortfolioValueAt(
        Portfolio $portfolio,
        Carbon $datetime,
        Carbon $firstMinuteDate,
        Carbon $firstHourDate,
        Carbon $firstDayDate
    ) {

        $transactions = $portfolio->transactions()
            ->whereProcessed(false)
            ->where('transaction_at', '<=', $datetime)
            ->get();

        foreach($transactions as $transaction) {
            $transaction->process();
        }

        $portfolio->updateBalance($datetime);

        if ($datetime->greaterThanOrEqualTo($firstMinuteDate)) {
            PortfolioHistory::saveSingleMinuteHistory(
                $portfolio,
                $datetime
            );
            self::saveSingleHourHistory($portfolio, $datetime);
            self::saveSingleDayHistory($portfolio, $datetime);
        } else if ($datetime->greaterThanOrEqualTo($firstHourDate)) {
            self::saveSingleHourHistory($portfolio, $datetime);
            self::saveSingleDayHistory($portfolio, $datetime);
        } else {
            self::saveSingleDayHistory($portfolio, $datetime);
        }
    }

    private static function saveSingleHourHistory(Portfolio $portfolio, Carbon $datetime)
    {
        $hour = $datetime->format('Y-m-d H:00:00');
        $historyModel = PortfolioCoinHourHistory::wherePortfolioId($portfolio->id)
            ->where('date', '=', $hour)
            ->first();

        if (! $historyModel) {
            $portfolioHistory = new PortfolioCoinHourHistory();
            $portfolioHistory->portfolio_id = $portfolio->id;
            $portfolioHistory->date = $hour;
            $portfolioHistory->usd_value = $portfolio->usd_value;
            $portfolioHistory->btc_value = $portfolio->btc_value;

            $portfolioHistory = self::setHourHighAndLowValues($portfolioHistory, $portfolio, $datetime);

            $portfolioHistory->save();
        }
    }

    private static function saveSingleDayHistory(Portfolio $portfolio, Carbon $datetime)
    {
        $day = $datetime->format('Y-m-d');
        $historyModel = PortfolioCoinDayHistory::wherePortfolioId($portfolio->id)
            ->where('date', '=', $day)
            ->first();

        if (! $historyModel) {
            $portfolioHistory = new PortfolioCoinDayHistory();
            $portfolioHistory->portfolio_id = $portfolio->id;
            $portfolioHistory->date = $day;
            $portfolioHistory->usd_value = $portfolio->usd_value;
            $portfolioHistory->btc_value = $portfolio->btc_value;

            $portfolioHistory = self::setDayHighAndLowValues($portfolioHistory, $portfolio, $datetime);

            $portfolioHistory->save();
        }
    }

    private static function destroyPortfolioHistory(Portfolio $portfolio, Carbon $destroyStartingAt)
    {
        PortfolioCoinMinuteHistory::wherePortfolioId($portfolio->id)
            ->where('date', '>=', $destroyStartingAt)
            ->delete();
        PortfolioCoinHourHistory::wherePortfolioId($portfolio->id)
            ->where('date', '>=', $destroyStartingAt)
            ->delete();
        PortfolioCoinDayHistory::wherePortfolioId($portfolio->id)
            ->where('date', '>=', $destroyStartingAt)
            ->delete();

        self::resetPortfolioToDate($portfolio, $destroyStartingAt);
    }

    private static function resetPortfolioToDate(Portfolio $portfolio, Carbon $date)
    {
        $dateAsString = $date->format('Y-m-d H:i:s');

        $transactionToRedo = $portfolio->transactions()
            ->where('transaction_at', '>=', $dateAsString)
            ->orderBy('transaction_at', 'ASC')
            ->get();

        foreach($transactionToRedo as $transaction) {
            $transaction->processed = false;
            $transaction->save();
        }

        $transactions = $portfolio->transactions()
            ->where('transaction_at', '<', $dateAsString)
            ->orderBy('transaction_at', 'ASC')
            ->get();

        $portfolio->usd_value = 0;
        $portfolio->btc_value = 0;
        $portfolio->coins()->delete();
        $portfolio->save();

        foreach($transactions as $transaction) {
            $transaction->process();
        }
    }

    private static function setHourHighAndLowValues(PortfolioCoinHourHistory $history, Portfolio $portfolio, Carbon $date)
    {
        $lowUsd = 0;
        $lowBtc = 0;
        $highUsd = 0;
        $highBtc = 0;

        foreach(PortfolioCoin::wherePortfolioId($portfolio->id)->get() as $coin) {
            $coinHistory = CoinHistory::getCoinHourOrDayHistoryModel($coin->coin_id, $date);

            $coinLowUsdValue  = ($coinHistory !== null) ? $coinHistory->usd_value_low  : $coin->coin->usd_value;
            $coinHighUsdValue = ($coinHistory !== null) ? $coinHistory->usd_value_high : $coin->coin->usd_value;

            $coinLowBtcValue  = ($coinHistory !== null) ? $coinHistory->btc_value_low  : $coin->coin->btc_value;
            $coinHighBtcValue = ($coinHistory !== null) ? $coinHistory->btc_value_high : $coin->coin->btc_value;


            $lowUsdValue  = $coin->amount * $coinLowUsdValue;
            $highUsdValue = $coin->amount * $coinHighUsdValue;

            $lowBtcValue  = $coin->amount * $coinLowBtcValue;
            $highBtcValue = $coin->amount * $coinHighBtcValue;

            $lowUsd  += $lowUsdValue;
            $highUsd += $highUsdValue;
            $lowBtc  += $lowBtcValue;
            $highBtc += $highBtcValue;
        }

        $history->usd_value_low  = $lowUsd;
        $history->usd_value_high = $highUsd;

        $history->btc_value_low = $lowBtc;
        $history->btc_value_high = $highBtc;

        return $history;
    }

    private static function setDayHighAndLowValues(PortfolioCoinDayHistory $history, Portfolio $portfolio, Carbon $date)
    {
        $lowUsd = 0;
        $lowBtc = 0;
        $highUsd = 0;
        $highBtc = 0;

        foreach(PortfolioCoin::wherePortfolioId($portfolio->id)->get() as $coin) {
            $coinHistory = CoinHistory::getCoinDayHistoryModel($coin->coin_id, $date);

            $coinLowUsdValue  = ($coinHistory !== null) ? $coinHistory->usd_value_low  : $coin->coin->usd_value;
            $coinHighUsdValue = ($coinHistory !== null) ? $coinHistory->usd_value_high : $coin->coin->usd_value;

            $coinLowBtcValue  = ($coinHistory !== null) ? $coinHistory->btc_value_low  : $coin->coin->btc_value;
            $coinHighBtcValue = ($coinHistory !== null) ? $coinHistory->btc_value_high : $coin->coin->btc_value;


            $lowUsdValue  = $coin->amount * $coinLowUsdValue;
            $highUsdValue = $coin->amount * $coinHighUsdValue;

            $lowBtcValue  = $coin->amount * $coinLowBtcValue;
            $highBtcValue = $coin->amount * $coinHighBtcValue;

            $lowUsd  += $lowUsdValue;
            $highUsd += $highUsdValue;
            $lowBtc  += $lowBtcValue;
            $highBtc += $highBtcValue;
        }

        $history->usd_value_low  = $lowUsd;
        $history->usd_value_high = $highUsd;

        $history->btc_value_low = $lowBtc;
        $history->btc_value_high = $highBtc;

        return $history;
    }
}
