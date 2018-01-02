<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Coin
 *
 * @mixin \Eloquent
 * @property int $id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string $name
 * @property string $api_name
 * @property float $btc_value
 * @property float $usd_value
 * @property float $eur_value
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coin whereApiName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coin whereBtcValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coin whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coin whereEurValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coin whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coin whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coin whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coin whereUsdValue($value)
 * @property string $symbol
 * @property int $rank
 * @property float $usd_24h_volume
 * @property float $usd_market_cap
 * @property float $available_supply
 * @property float $total_supply
 * @property float $max_supply
 * @property float $percentage_change_1h
 * @property float $percentage_change_24h
 * @property float $percentage_change_7d
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coin whereAvailableSupply($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coin whereMaxSupply($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coin wherePercentageChange1h($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coin wherePercentageChange24h($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coin wherePercentageChange7d($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coin whereRank($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coin whereSymbol($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coin whereTotalSupply($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coin whereUsd24hVolume($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coin whereUsdMarketCap($value)
 */
class Coin extends Model
{
    protected $fillable = [
        'name', 'api_name', 'symbol', 'rank', 'btc_value', 'usd_value', 'usd_24h_volume', 'usd_market_cap',
        'available_supply', 'total_supply', 'max_supply', 'percentage_change_1h', 'percentage_change_24h',
        'percentage_change_7d'
    ];
}
