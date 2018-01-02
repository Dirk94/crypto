<?php

namespace Tests\Feature\Models;

use App\Models\User;
use Tests\Feature\FeatureTestCase;

class TransactionTest extends FeatureTestCase
{
    public function testDeposit()
    {
        $user = User::find(1);
        $token = $this->login($user->id);

        $portfolio = $user->portfolios->first();

        $response = $this->withHeaders([
            'Authorization' => $token
        ])->json('POST', route('api.portfolios.deposit', $portfolio), [
            'in_coin_name' => 'bitcoin',
            'in_amount' => '100'
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('portfolio_coins', [
            'id' => 1,
            'portfolio_id' => 1,
            'coin_id' => 1,
            'amount' => 100.0
        ]);
        $this->assertDatabaseHas('transactions', [
            'id' => 1,
            'portfolio_id' => 1,
            'type' => 'deposit',
            'out_coin_id' => null,
            'in_coin_id' => 1,
            'out_amount' => null,
            'in_amount' => 100.0
        ]);
    }

    public function testWithdraw()
    {
        $user = User::find(1);
        $token = $this->login($user->id);

        $portfolio = $user->portfolios->first();

        $response = $this->withHeaders([
            'Authorization' => $token
        ])->json('POST', route('api.portfolios.withdraw', $portfolio), [
            'out_coin_name' => 'bitcoin',
            'out_amount' => '101'
        ]);

        $response->assertStatus(422);

        $response = $this->withHeaders([
            'Authorization' => $token
        ])->json('POST', route('api.portfolios.withdraw', $portfolio), [
            'out_coin_name' => 'bitcoin',
            'out_amount' => '0.00000000005'
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('portfolio_coins', [
            'portfolio_id' => 1,
            'coin_id' => 1,
            'amount' => 100.0
        ]);

        $response = $this->withHeaders([
            'Authorization' => $token
        ])->json('POST', route('api.portfolios.withdraw', $portfolio), [
            'out_coin_name' => 'bitcoin',
            'out_amount' => '0.28191927381'
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('portfolio_coins', [
            'portfolio_id' => 1,
            'coin_id' => 1,
            'amount' => 99.7180807262
        ]);
    }
}
