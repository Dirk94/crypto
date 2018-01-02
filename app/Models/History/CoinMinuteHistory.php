<?php

namespace App\Models\History;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\History\CoinMinuteHistory
 *
 * @property int $id
 * @property int $coin_id
 * @property string $date
 * @property float $usd_market_cap
 * @property float $btc_value
 * @property float $usd_value
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinMinuteHistory whereBtcValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinMinuteHistory whereCoinId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinMinuteHistory whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinMinuteHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinMinuteHistory whereUsdMarketCap($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\CoinMinuteHistory whereUsdValue($value)
 * @mixin \Eloquent
 */
class CoinMinuteHistory extends Model
{
    public $timestamps = false;

    protected $table = 'coin_minute_history';
}
