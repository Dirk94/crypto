<?php

namespace App\Models\History;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\History\PortfolioCoinMinuteHistory
 *
 * @property int $id
 * @property int $portfolio_id
 * @property string $date
 * @property float $btc_value
 * @property float $usd_value
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinMinuteHistory whereBtcValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinMinuteHistory whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinMinuteHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinMinuteHistory wherePortfolioId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinMinuteHistory whereUsdValue($value)
 * @mixin \Eloquent
 */
class PortfolioCoinMinuteHistory extends Model
{
    public $timestamps = false;

    protected $table = 'portfolio_coins_minute_history';
}
