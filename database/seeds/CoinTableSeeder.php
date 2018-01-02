<?php

use Illuminate\Database\Seeder;
use App\Models\Coin;

class CoinTableSeeder extends Seeder
{
    public function run()
    {
        Coin::create([
            'name' => 'Bitcoin',
            'api_name' => 'bitcoin',
            'symbol' => 'BTC',
            'rank' => 1,
            'btc_value' => 1.0,
            'usd_value' => 16116.7,
            'usd_24h_volume' => 1263010000.0,
            'usd_market_cap' => 270207950590.0,
            'available_supply' => 16765712.0,
            'total_supply' => 16765712.0,
            'max_supply' => 21000000.0,
            'percentage_change_1h' => -0.53,
            'percentage_change_24h' => 4.69,
            'percentage_change_7d' => -5.87
        ]);
    }
}
