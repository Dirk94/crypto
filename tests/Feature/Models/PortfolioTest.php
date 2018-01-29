<?php

namespace Tests\Feature\Models;

use App\Common\Helpers\Permissions;
use App\Models\Portfolio;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Feature\FeatureTestCase;
use Tests\TestCase;

class PortfolioTest extends FeatureTestCase
{
    public function testCreatePortfolio()
    {
        $user = User::find(1);
        $token = $this->login($user->id);

        $response = $this->withHeaders([
            'Authorization' => $token
        ])->json('POST', route('api.portfolios.create'), [
            'name' => 'my portfolio name'
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('portfolios', [
            'name' => 'my portfolio name'
        ]);

        $portfolios = $user->portfolios;
        $this->assertEquals($portfolios->count(), 2); // The default portfolio plus the one we just created.
        $this->assertEquals($portfolios->first()->pivot->permissions, 'owner');
    }

    public function testAddUserToPortfolio()
    {
        $user = User::find(1);
        $portfolio = $user->portfolios()->first();

        $user2 = User::find(2);
        $token = $this->login($user->id);

        $response = $this->withHeaders([
            'Authorization' => $token
        ])->json('POST', route('api.portfolios.users.add', [
            'portfolio' => $portfolio,
            'user' => $user2,
        ]), [
            'permissions' => 'read'
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('portfolio_user', [
            'portfolio_id' => $portfolio->id,
            'user_id' => $user->id,
            'permissions' => 'owner'
        ]);
        $this->assertDatabaseHas('portfolio_user', [
            'portfolio_id' => $portfolio->id,
            'user_id' => $user2->id,
            'permissions' => 'read'
        ]);
    }
}
