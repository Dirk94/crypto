<?php

namespace App\Models\History;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\History\PortfolioCoinHourHistory
 *
 * @property int $id
 * @property int $portfolio_id
 * @property string $date
 * @property float $btc_value
 * @property float $usd_value
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinHourHistory whereBtcValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinHourHistory whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinHourHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinHourHistory wherePortfolioId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinHourHistory whereUsdValue($value)
 * @mixin \Eloquent
 * @property float $btc_value_high
 * @property float $btc_value_low
 * @property float $usd_value_high
 * @property float $usd_value_low
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinHourHistory whereBtcValueHigh($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinHourHistory whereBtcValueLow($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinHourHistory whereUsdValueHigh($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinHourHistory whereUsdValueLow($value)
 */
class PortfolioCoinHourHistory extends Model
{
    public $timestamps = false;

    protected $table = 'portfolio_coins_hour_history';
}
