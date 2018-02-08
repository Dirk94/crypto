<?php

namespace App\Models\History;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\History\CoinHourHistory
 *
 * @property int $id
 * @property int $coin_id
 * @property string $date
 * @property float $usd_market_cap
 * @property float $btc_value
 * @property float $usd_value
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinHourHistory whereBtcValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinHourHistory whereCoinId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinHourHistory whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinHourHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinHourHistory whereUsdMarketCap($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinHourHistory whereUsdValue($value)
 * @mixin \Eloquent
 * @property float $btc_value_high
 * @property float $btc_value_low
 * @property float $usd_value_high
 * @property float $usd_value_low
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinHourHistory whereBtcValueHigh($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinHourHistory whereBtcValueLow($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinHourHistory whereUsdValueHigh($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinHourHistory whereUsdValueLow($value)
 */
class CoinHourHistory extends Model
{
    public $timestamps = false;

    protected $table = 'coin_hour_history';
}
