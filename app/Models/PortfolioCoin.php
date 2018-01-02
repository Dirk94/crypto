<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PortfolioCoin
 *
 * @property int $id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property int $portfolio_id
 * @property int $coin_id
 * @property float $amount
 * @property-read \App\Models\Coin $coin
 * @property-read mixed $coin_name
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PortfolioCoin whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PortfolioCoin whereCoinId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PortfolioCoin whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PortfolioCoin whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PortfolioCoin wherePortfolioId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PortfolioCoin whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PortfolioCoin extends Model
{
    protected $fillable = [
        'portfolio_id', 'coin_id', 'amount'
    ];

    protected $appends = [
        'coin_name'
    ];

    public function getCoinNameAttribute()
    {
        return Coin::whereId($this->coin_id)
            ->first()
            ->api_name;
    }

    public function coin()
    {
        return $this->belongsTo(Coin::class);
    }

    public function user()
    {
        return $this->belongsTo(Portfolio::class);
    }
}
