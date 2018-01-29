<?php

namespace Tests\Feature\Models;

use App\Common\Helpers\Permissions;
use App\Models\Portfolio;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Feature\FeatureTestCase;
use Tests\TestCase;
use Illuminate\Support\Facades\Artisan;

class EdgeCaseHistoryTest extends FeatureTestCase
{
    /** @group edge */
    public function testEdgeCaseHistory()
    {
        $user = User::find(1);
        $token = $this->login($user->id);

        $portfolio = Portfolio::create([
            'name' => 'My edge case portfolio'
        ]);
        $user->portfolios()->attach($portfolio, [
            'permissions' => Permissions::OWNER,
        ]);

        $this->assertDatabaseMissing('portfolio_coins_hour_history', [
            'portfolio_id' => $portfolio->id
        ]);

        $this->setTime('2018-01-01 14:30:00');

        Artisan::call('coins:update');

        $this->assertDatabaseMissing('portfolio_coins_hour_history', [
            'portfolio_id' => $portfolio->id,
        ]);

        $response = $this->json('POST', route('api.portfolios.deposit', $portfolio), [
            'in_coin_name' => 'Bitcoin',
            'in_amount' => 2
        ], [
            'Authorization' => $token
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('portfolio_coins_minute_history', [
            'portfolio_id' => $portfolio->id,
            'btc_value' => 2
        ]);
        $this->assertDatabaseMissing('portfolio_coins_hour_history', [
            'portfolio_id' => $portfolio->id,
        ]);

        $this->setTime('2018-01-01 15:01:00');
        Artisan::call('coins:update');
    }

    /** Use the Y-m-d H:i:s format. Example: 2018-01-20 23:05:23 */
    private function setTime($timeAsString)
    {
        Carbon::setTestNow(
            Carbon::createFromFormat(
                'Y-m-d H:i:s', $timeAsString
            )
        );
    }
}
