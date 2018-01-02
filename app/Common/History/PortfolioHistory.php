<?php

namespace App\Common\History;

use App\Models\History\PortfolioCoinDayHistory;
use App\Models\History\PortfolioCoinHourHistory;
use App\Models\History\PortfolioCoinMinuteHistory;
use App\Models\Portfolio;
use Carbon\Carbon;

class PortfolioHistory
{
    const TIME_TO_KEEP_MINUTE_DATA = 1440, // In minutes
        TIME_TO_KEEP_HOUR_DATA = 168,      // In hours
        TIME_TO_KEEP_DAY_DATA = 3650;      // In days

    public static function cleanupOldHistory()
    {
        $minuteDeleteDate = Carbon::now()->subMinutes(self::TIME_TO_KEEP_MINUTE_DATA);
        PortfolioCoinMinuteHistory::where('date', '<=', $minuteDeleteDate)->delete();

        $hourDeleteDate = Carbon::now()->subHour(self::TIME_TO_KEEP_HOUR_DATA);
        PortfolioCoinDayHistory::where('date', '<=', $hourDeleteDate)->delete();

        $dayDeleteDate = Carbon::now()->subDays(self::TIME_TO_KEEP_DAY_DATA);
        PortfolioCoinDayHistory::where('date', '<=', $dayDeleteDate)->delete();
    }

    public static function saveMinuteHistory()
    {
        $now = Carbon::now()->format('Y-m-d H:i:00');

        foreach (Portfolio::all() as $portfolio) {
            try {
                $portfolioHistory = new PortfolioCoinMinuteHistory();
                $portfolioHistory->portfolio_id = $portfolio->id;
                $portfolioHistory->date = $now;
                $portfolioHistory->usd_value = $portfolio->usd_value;
                $portfolioHistory->btc_value = $portfolio->btc_value;
                $portfolioHistory->save();
            } catch(\Exception $e) {
                print "Exception while setting portfolio minute history.\n";
            }
        }
    }

    public static function saveHourHistory()
    {
        $now = Carbon::now()->format('Y-m-d H:00:00');

        foreach (Portfolio::all() as $portfolio) {
            try {
                $portfolioHistory = new PortfolioCoinHourHistory();
                $portfolioHistory->portfolio_id = $portfolio->id;
                $portfolioHistory->date = $now;
                $portfolioHistory->usd_value = $portfolio->usd_value;
                $portfolioHistory->btc_value = $portfolio->btc_value;
                $portfolioHistory->save();
            } catch (\Exception $e) {
                print "Exception while setting portfolio hour history.\n";
            }
        }
    }

    public static function saveDayHistory()
    {
        $now = Carbon::now()->format('Y-m-d');

        foreach (Portfolio::all() as $portfolio) {
            try {
                $portfolioHistory = new PortfolioCoinDayHistory();
                $portfolioHistory->portfolio_id = $portfolio->id;
                $portfolioHistory->date = $now;
                $portfolioHistory->usd_value = $portfolio->usd_value;
                $portfolioHistory->btc_value = $portfolio->btc_value;
                $portfolioHistory->save();
            } catch (\Exception $e) {
                print "Exception while setting portfolio day history.\n";
            }
        }
    }
}
