<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class FeatureTestCase extends TestCase
{
    /**
     * Logs the user with the given id in and returns a JWT access token.
     *
     * @param $id
     * @return string token
     */
    public function login($id)
    {
        $user = User::find($id)->first();

        $response = $this->json('POST', route('api.login'), [
            'email' => $user->email,
            'password' => 'test'
        ]);

        return json_decode($response->getContent())->token;
    }
}
