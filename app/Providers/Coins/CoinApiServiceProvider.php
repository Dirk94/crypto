<?php

namespace App\Providers\Coins;

use App\Common\Coins\CoinmarketcapApi;
use App\Common\Coins\CoinApi;
use Illuminate\Support\ServiceProvider;

class CoinApiServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(CoinApi::class, function() {
            return new CoinmarketcapApi();
        });
    }
}
