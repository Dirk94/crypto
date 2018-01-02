<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Transaction
 *
 * @property int $id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property int $portfolio_id
 * @property string $type
 * @property int|null $out_coin_id
 * @property int|null $in_coin_id
 * @property float|null $out_amount
 * @property float|null $in_amount
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereInAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereInCoinId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereOutAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereOutCoinId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction wherePortfolioId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \App\Models\Portfolio $portfolio
 */
class Transaction extends Model
{
    const TYPE_DEPOSIT = 'deposit', TYPE_WITHDRAWAL = 'withdrawal', TYPE_TRADE = 'trade';

    protected $fillable = [
        'type', 'out_coin_id', 'in_coin_id', 'out_amount', 'in_amount'
    ];

    public function portfolio()
    {
        return $this->belongsTo(Portfolio::class);
    }
}
