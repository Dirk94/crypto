<?php

namespace App\Models\History;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\History\PortfolioCoinDayHistory
 *
 * @property int $id
 * @property int $portfolio_id
 * @property string $date
 * @property float $btc_value
 * @property float $usd_value
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinDayHistory whereBtcValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinDayHistory whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinDayHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinDayHistory wherePortfolioId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinDayHistory whereUsdValue($value)
 * @mixin \Eloquent
 * @property float $btc_value_high
 * @property float $btc_value_low
 * @property float $usd_value_high
 * @property float $usd_value_low
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinDayHistory whereBtcValueHigh($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinDayHistory whereBtcValueLow($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinDayHistory whereUsdValueHigh($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\History\PortfolioCoinDayHistory whereUsdValueLow($value)
 */
class PortfolioCoinDayHistory extends Model
{
    public $timestamps = false;

    protected $table = 'portfolio_coins_day_history';
}
