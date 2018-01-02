<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PortfolioUser
 *
 * @mixin \Eloquent
 */
class PortfolioUser extends Model
{
    protected $fillable = [
        'user_id', 'portfolio_id', 'permissions'
    ];

}
