<?php

namespace App\Models\History;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\History\CoinDayHistory
 *
 * @property int $id
 * @property int $coin_id
 * @property string $date
 * @property float $usd_market_cap
 * @property float $btc_value
 * @property float $usd_value
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinDayHistory whereBtcValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinDayHistory whereCoinId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinDayHistory whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinDayHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinDayHistory whereUsdMarketCap($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinDayHistory whereUsdValue($value)
 * @mixin \Eloquent
 * @property float $btc_value_high
 * @property float $btc_value_low
 * @property float $usd_value_high
 * @property float $usd_value_low
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinDayHistory whereBtcValueHigh($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinDayHistory whereBtcValueLow($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinDayHistory whereUsdValueHigh($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinDayHistory whereUsdValueLow($value)
 */
class CoinDayHistory extends Model
{
    public $timestamps = false;

    protected $table = 'coin_day_history';
}
