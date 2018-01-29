<?php

namespace App\Common\History;

use App\Models\History\PortfolioCoinDayHistory;
use App\Models\History\PortfolioCoinHourHistory;
use App\Models\History\PortfolioCoinMinuteHistory;
use App\Models\Portfolio;
use Carbon\Carbon;

class PortfolioHistory
{
    const TIME_TO_KEEP_MINUTE_DATA = 2880, // In minutes (48h)
        TIME_TO_KEEP_HOUR_DATA = 168,      // In hours   (7d)
        TIME_TO_KEEP_DAY_DATA = 3650;      // In days    (10y)

    public static function cleanupOldHistory()
    {
        $minuteDeleteDate = Carbon::now()->subMinutes(self::TIME_TO_KEEP_MINUTE_DATA);
        PortfolioCoinMinuteHistory::where('date', '<=', $minuteDeleteDate)->delete();

        $hourDeleteDate = Carbon::now()->subHour(self::TIME_TO_KEEP_HOUR_DATA);
        PortfolioCoinDayHistory::where('date', '<=', $hourDeleteDate)->delete();

        $dayDeleteDate = Carbon::now()->subDays(self::TIME_TO_KEEP_DAY_DATA);
        PortfolioCoinDayHistory::where('date', '<=', $dayDeleteDate)->delete();
    }

    public static function saveAllMinuteHistory()
    {
        $carbonNow = Carbon::now();
        $carbonNow->minute = floor($carbonNow->minute / 5) * 5;
        $now = $carbonNow->format('Y-m-d H:i:00');

        foreach (Portfolio::all() as $portfolio) {
            self::saveSingleMinuteHistory($portfolio, $now);
        }
    }

    public static function saveSingleMinuteHistory(Portfolio $portfolio, $now = null, $override = false)
    {
        if ($now === null) {
            $carbonNow = Carbon::now();
            $carbonNow->minute = floor($carbonNow->minute / 5) * 5;
            $now = $carbonNow->format('Y-m-d H:i:00');
        }

        if ($override) {
            $portfolioHistory = PortfolioCoinMinuteHistory::wherePortfolioId($portfolio->id)
                ->where('date', '=', $now)
                ->first();
            if (!$portfolioHistory) {
                $portfolioHistory = new PortfolioCoinMinuteHistory();
            }
        } else {
            $portfolioHistory = new PortfolioCoinMinuteHistory();
        }

        try {
            $portfolioHistory->portfolio_id = $portfolio->id;
            $portfolioHistory->date = $now;
            $portfolioHistory->usd_value = $portfolio->usd_value;
            $portfolioHistory->btc_value = $portfolio->btc_value;
            $portfolioHistory->save();
        } catch(\Exception $e) {
            print "Exception while setting portfolio minute history (override is " . ($override ? 'true' : 'false') . ").\n";
        }
    }

    public static function saveAllHourHistory()
    {
        foreach (Portfolio::all() as $portfolio) {
            PortfolioHistory::saveSingleHourHistory($portfolio);
        }
    }

    public static function saveSingleHourHistory(Portfolio $portfolio)
    {
        $now = Carbon::now()->format('Y-m-d H:00:00');
        $previousHour = Carbon::now()->subHour()->format('Y-m-d H:00:00');

        $portfolioHistoryCoins = PortfolioCoinMinuteHistory::wherePortfolioId($portfolio->id)
            ->where('date', '>', $previousHour)
            ->where('date', '<=', $now)
            ->get();

        if ($portfolioHistoryCoins->isEmpty()) {
            print "Aborting while setting portfolio coin hour history because there are no minute history coins.\n";
            return;
        }

        $results = self::getLowHighAndAverages($portfolioHistoryCoins, $portfolio);

        $portfolioHistory = PortfolioCoinHourHistory::wherePortfolioId($portfolio->id)
            ->where('date', '=', $now)
            ->first();
        if (! $portfolioHistory) {
            $portfolioHistory = new PortfolioCoinHourHistory();
        }

        try {
            $portfolioHistory->portfolio_id = $portfolio->id;
            $portfolioHistory->date = $now;
            $portfolioHistory->usd_value = $portfolio->usd_value;
            $portfolioHistory->btc_value = $portfolio->btc_value;

            foreach($results as $key => $value) {
                $portfolioHistory->{$key} = $value;
            }

            $portfolioHistory->save();
        } catch (\Exception $e) {
            print "Exception while setting portfolio hour history.\n";
        }
    }

    public static function saveDayHistory()
    {
        foreach (Portfolio::all() as $portfolio) {
            self::saveSingleDayHistory($portfolio);
        }
    }

    public static function saveSingleDayHistory(Portfolio $portfolio)
    {
        $now = Carbon::now()->format('Y-m-d');
        $nowWithHour = Carbon::now()->format('Y-m-d 00:00:00');
        $yesterday = Carbon::now()->subDay()->format('Y-m-d 00:00:00');

        $portfolioHistoryCoins = PortfolioCoinMinuteHistory::wherePortfolioId($portfolio->id)
            ->where('date', '>=', $yesterday)
            ->where('date', '<', $nowWithHour)
            ->get();

        if ($portfolioHistoryCoins->isEmpty()) {
            print "Aborting while setting portfolio coin day history because there are no minute history coins.\n";
            return;
        }

        $results = self::getLowHighAndAverages($portfolioHistoryCoins, $portfolio);

        $portfolioHistory = PortfolioCoinDayHistory::wherePortfolioId($portfolio->id)
            ->where('date', '=', $now)
            ->first();
        if (! $portfolioHistory) {
            $portfolioHistory = new PortfolioCoinDayHistory();
        }

        try {
            $portfolioHistory->portfolio_id = $portfolio->id;
            $portfolioHistory->date = $now;
            $portfolioHistory->usd_value = $portfolio->usd_value;
            $portfolioHistory->btc_value = $portfolio->btc_value;

            foreach($results as $key => $value) {
                $portfolioHistory->{$key} = $value;
            }

            $portfolioHistory->save();
        } catch (\Exception $e) {
            print "Exception while setting portfolio day history.\n";
        }
    }

    private static function getLowHighAndAverages($portfolioHistories, $portfolio) {
        $usdHigh = 0;
        $usdLow  = 1000000000;

        $btcHigh = 0;
        $btcLow  = 1000000000;

        foreach($portfolioHistories as $history) {
            if ($history->btc_value > $btcHigh) {
                $btcHigh = $history->btc_value;
            }
            if ($history->btc_value < $btcLow) {
                $btcLow = $history->btc_value;
            }
            if ($history->usd_value > $usdHigh) {
                $usdHigh = $history->usd_value;
            }
            if ($history->usd_value < $usdLow) {
                $usdLow = $history->usd_value;
            }
        }

        $usdHigh = $portfolio->usd_value;
        $usdLow = $portfolio->usd_value;


        $btcHigh = $portfolio->btc_value;
        $btcLow = $portfolio->btc_value;


        return [
            'btc_value_low' => $btcLow,
            'btc_value_high' => $btcHigh,

            'usd_value_low' => $usdLow,
            'usd_value_high' => $usdHigh,
        ];
    }
}
