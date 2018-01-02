<?php

namespace App\Providers;

use App\Common\Auth\JwtGuard;
use App\Http\Gates\UserCoinPolicy;
use App\Models\Portfolio;
use App\Policies\PortfolioPolicy;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
        Portfolio::class => PortfolioPolicy::class,
    ];

    public function boot()
    {
        $this->registerPolicies();

        // Create a custom Auth guard.
        Auth::extend('jwt', function($app, $name, array $config) {
            return new JwtGuard(
                Auth::createUserProvider($config['provider']),
                env('JWT_SECRET'),
                env('JWT_EXPIRES_AFTER')
            );
        });

    }
}
