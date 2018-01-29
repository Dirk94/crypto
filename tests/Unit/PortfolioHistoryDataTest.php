<?php

namespace Tests\Unit\Auth;

use App\Common\Auth\InvalidTokenException;
use App\Common\Auth\JwtGuard;
use App\Models\History\PortfolioCoinDayHistory;
use App\Models\History\PortfolioCoinMinuteHistory;
use App\Models\Portfolio;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;
use Eloquent;

class PortfolioHistoryDataTest extends TestCase
{
    use RefreshDatabase;

    public function testGetYesterdayHistoryModel()
    {
        $portfolio = $this->createPortfolio();

        Eloquent::unguard();
        PortfolioCoinDayHistory::create([
            'portfolio_id' => $portfolio->id,
            'date' => Carbon::now()->subDays(100)->format('Y-m-d'),
            'btc_value' => 0.1,
            'usd_value' => 500,
            'btc_value_low' => 0,
            'btc_value_high' => 1,
            'usd_value_low' => 0,
            'usd_value_high' => 1,
        ]);

        $model = $portfolio->getYesterdayHistoryModel();

        $this->assertNotNull($model);
        $this->assertEquals(0.1, $model->btc_value);
        $this->assertEquals(500, $model->usd_value);

        PortfolioCoinDayHistory::create([
            'portfolio_id' => $portfolio->id,
            'date' => Carbon::now()->subDay(1)->format('Y-m-d'),
            'btc_value' => 10,
            'usd_value' => 5000,
            'btc_value_low' => 0,
            'btc_value_high' => 1,
            'usd_value_low' => 0,
            'usd_value_high' => 1,
        ]);

        $model = $portfolio->getYesterdayHistoryModel();

        $this->assertNotNull($model);
        $this->assertEquals(10, $model->btc_value);
        $this->assertEquals(5000, $model->usd_value);

        Eloquent::reguard();
    }

    /**
     * @return Portfolio
     */
    private function createPortfolio()
    {
        $portfolio = new Portfolio();
        $portfolio->name = 'test portfolio';
        $portfolio->btc_value = 0.2;
        $portfolio->usd_value = 1000;
        $portfolio->save();

        return $portfolio;
    }
}