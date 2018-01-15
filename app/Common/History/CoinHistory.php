<?php

namespace App\Common\History;

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
        $now = Carbon::now()->format('Y-m-d H:i:00');

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

        foreach (Coin::all() as $coin) {
            try {
                $historyCoin = new CoinHourHistory();
                $historyCoin->date = $now;
                $historyCoin = self::setPropertiesOfHistoryCoin($historyCoin, $coin);
                $historyCoin->save();

            } catch (\Exception $e) {
                print "Exception while setting coin hour history.\n";
            }
        }
    }

    public static function saveDayHistory()
    {
        $now = Carbon::now()->format('Y-m-d');

        foreach (Coin::all() as $coin) {
            try {
                $historyCoin = new CoinDayHistory();
                $historyCoin->date = $now;
                $historyCoin = self::setPropertiesOfHistoryCoin($historyCoin, $coin);
                $historyCoin->save();
            } catch(\Exception $e) {
                print "Exception while setting coin day history.\n";
            }
        }
    }

    private static function setPropertiesOfHistoryCoin($historyCoin, Coin $coin)
    {
        $historyCoin->coin_id = $coin->id;
        $historyCoin->btc_value = $coin->btc_value;
        $historyCoin->usd_market_cap = $coin->usd_market_cap;
        $historyCoin->usd_value = $coin->usd_value;

        return $historyCoin;
    }
}
