<?php

namespace App\Common\Helpers;

use Carbon\Carbon;

class DateUtils
{
    /**
     * Formats the date to the nearest 5 minute mark.
     * For example: 2018-01-01 14:32:10 becomes 2018-01-01 14:30:00
     *
     * @param Carbon $date
     * @return Carbon
     */
    public static function toNearestFiveMinutes(Carbon $date)
    {
        $date->minute = floor($date->minute / 5 ) * 5;
        $date->second = 0;

        return $date;
    }

    /**
     * Formats the date to the nearest (rounded down) hour mark.
     * For example: 2018-01-01 14:32:10 becomes 2018-01-01 14:00:00
     *
     * @param Carbon $date
     * @return Carbon
     */
    public static function toNearestHour(Carbon $date)
    {
        $date->minute = 0;
        $date->second = 0;

        return $date;
    }

    /**
     * Parses a Y-m-d H:i:s date time string into a carbon object.
     *
     * @param string $date
     * @return Carbon
     */
    public static function toCarbon(string $date)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $date);
    }
}
