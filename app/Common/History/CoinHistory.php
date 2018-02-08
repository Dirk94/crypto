<?php

namespace App\Common\History;

use App\Common\Helpers\DateUtils;
use App\Models\Coin;
use App\Models\History\CoinDayHistory;
use App\Models\History\CoinHourHistory;
use App\Models\History\CoinMinuteHistory;
use Carbon\Carbon;

class CoinHistory
{
    const TIME_TO_KEEP_MINUTE_DATA = 2880, // In minutes (48h)
        TIME_TO_KEEP_HOUR_DATA = 168,      // In hours   (7d)
        TIME_TO_KEEP_DAY_DATA = 3650;      // In days    (10y)

    public static function cleanupOldHistory()
    {
        $minuteDeleteDate = Carbon::now()->subMinutes(self::TIME_TO_KEEP_MINUTE_DATA);
        CoinMinuteHistory::where('date', '<=', $minuteDeleteDate)->delete();

        $hourDeleteDate = Carbon::now()->subHour(self::TIME_TO_KEEP_HOUR_DATA);
        CoinHourHistory::where('date', '<=', $hourDeleteDate)->delete();

        $dayDeleteDate = Carbon::now()->subDays(self::TIME_TO_KEEP_DAY_DATA);
        CoinDayHistory::where('date', '<=', $dayDeleteDate)->delete();
    }

    public static function saveMinuteHistory()
    {
        $carbonNow = Carbon::now();
        $carbonNow->minute = floor($carbonNow->minute / 5) * 5;
        $now = $carbonNow->format('Y-m-d H:i:00');

        foreach (Coin::all() as $coin) {
            try {
                $historyCoin = new CoinMinuteHistory();
                $historyCoin->date = $now;
                $historyCoin = self::setPropertiesOfHistoryCoin($historyCoin, $coin);
                $historyCoin->save();
            } catch(\Exception $e) {
                print "Exception while setting coin minute history.\n";
            }
        }
    }

    public static function saveHourHistory()
    {
        $now = Carbon::now()->format('Y-m-d H:00:00');
        $previousHour = Carbon::now()->subHour()->format('Y-m-d H:00:00');

        foreach (Coin::all() as $coin) {
            $minuteHistoryCoins = CoinMinuteHistory::whereCoinId($coin->id)
                ->where('date', '>', $previousHour)
                ->where('date', '<=', $now)
                ->get();

            $results = self::getLowHighAndAverages($minuteHistoryCoins, $coin);

            try {
                $historyCoin = new CoinHourHistory();
                $historyCoin->date = $now;
                $historyCoin = self::setPropertiesOfHistoryCoin($historyCoin, $coin);

                foreach($results as $key => $value) {
                    $historyCoin->{$key} = $value;
                }

                $historyCoin->save();
            } catch (\Exception $e) {
                print "Exception while setting coin hour history.\n";
            }
        }
    }

    public static function saveDayHistory()
    {
        $now = Carbon::now()->format('Y-m-d');
        $nowWithHour = Carbon::now()->format('Y-m-d 00:00:00');
        $yesterday = Carbon::now()->subDay()->format('Y-m-d 00:00:00');

        foreach (Coin::all() as $coin) {
            $minuteHistoryCoins = CoinMinuteHistory::whereCoinId($coin->id)
                ->where('date', '>=', $yesterday)
                ->where('date', '<', $nowWithHour)
                ->get();

            $results = self::getLowHighAndAverages($minuteHistoryCoins, $coin);

            try {
                $historyCoin = new CoinDayHistory();
                $historyCoin->date = $now;
                $historyCoin = self::setPropertiesOfHistoryCoin($historyCoin, $coin);

                foreach($results as $key => $value) {
                    $historyCoin->{$key} = $value;
                }

                $historyCoin->save();
            } catch(\Exception $e) {
                print "Exception while setting coin day history.\n";
            }
        }
    }

    public static function getCoinHistoryModel(int $coinId, Carbon $date)
    {
        $date = DateUtils::toNearestFiveMinutes($date);
        $coinHistory = CoinMinuteHistory::whereCoinId($coinId)
            ->where('date', '<=', $date)
            ->orderBy('date', 'DESC')
            ->first();

        if (! $coinHistory) {
            $coinHistory = CoinHourHistory::whereCoinId($coinId)
                ->where('date', '<=', $date)
                ->orderBy('date', 'DESC')
                ->first();
        }

        if (! $coinHistory) {
            $coinHistory = CoinDayHistory::whereCoinId($coinId)
                ->where('date', '<=', $date)
                ->orderBy('date', 'DESC')
                ->first();
        }

        return $coinHistory;
    }

    public static function getCoinHourOrDayHistoryModel(int $coinId, Carbon $date)
    {
        $coinHistory = CoinHourHistory::whereCoinId($coinId)
            ->where('date', '<=', $date)
            ->orderBy('date', 'DESC')
            ->first();

        if (! $coinHistory) {
            $coinHistory = CoinDayHistory::whereCoinId($coinId)
                ->where('date', '<=', $date)
                ->orderBy('date', 'DESC')
                ->first();
        }

        return $coinHistory;
    }

    public static function getCoinDayHistoryModel(int $coinId, Carbon $date)
    {
        return CoinDayHistory::whereCoinId($coinId)
            ->where('date', '<=', $date)
            ->orderBy('date', 'DESC')
            ->first();
    }

    private static function setPropertiesOfHistoryCoin($historyCoin, Coin $coin)
    {
        $historyCoin->coin_id = $coin->id;
        $historyCoin->btc_value = $coin->btc_value;
        $historyCoin->usd_market_cap = $coin->usd_market_cap;
        $historyCoin->usd_value = $coin->usd_value;

        return $historyCoin;
    }

    private static function getLowHighAndAverages($historyCoins, $coin) {
        $usdHigh = 0;
        $usdLow  = 1000000000;
        $usdAverage = 0;

        $btcHigh = 0;
        $btcLow  = 1000000000;
        $btcAverage = 0;

        $n = 0;
        foreach($historyCoins as $historyCoin) {
            if ($historyCoin->btc_value > $btcHigh) {
                $btcHigh = $historyCoin->btc_value;
            }
            if ($historyCoin->btc_value < $btcLow) {
                $btcLow = $historyCoin->btc_value;
            }
            if ($historyCoin->usd_value > $usdHigh) {
                $usdHigh = $historyCoin->usd_value;
            }
            if ($historyCoin->usd_value < $usdLow) {
                $usdLow = $historyCoin->usd_value;
            }

            $usdAverage += $historyCoin->usd_value;
            $btcAverage += $historyCoin->btc_value;

            $n++;
        }

        if ($n == 0) {
            $usdHigh = $coin->usd_value;
            $usdLow = $coin->usd_value;
            $usdAverage = $coin->usd_value;

            $btcHigh = $coin->btc_value;
            $btcLow = $coin->btc_value;
            $btcAverage = $coin->btc_value;
        } else {
            $usdAverage /= $n;
            $btcAverage /= $n;
        }

        return [
            'btc_value' => $btcAverage,
            'btc_value_low' => $btcLow,
            'btc_value_high' => $btcHigh,

            'usd_value' => $usdAverage,
            'usd_value_low' => $usdLow,
            'usd_value_high' => $usdHigh,
        ];
    }
}
