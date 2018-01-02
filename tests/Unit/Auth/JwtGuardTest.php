<?php

namespace Tests\Unit\Auth;

use App\Common\Auth\InvalidTokenException;
use App\Common\Auth\JwtGuard;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class JwtGuardTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @expectedException \App\Common\Auth\InvalidTokenException
     */
    public function testAuthenticateWithNoToken()
    {
        $this->createUser();
        $jwtGuard = $this->createJwtGuard();

        $this->assertEquals(false, $jwtGuard->authenticate());
        $this->assertEquals(false, $jwtGuard->check());
        $this->assertEquals(false, $jwtGuard->guest());
        $this->assertEquals(null, $jwtGuard->id());
        $this->assertEquals(null, $jwtGuard->user());
    }

    private function createUser()
    {
        User::create([
            'name' => 'Test User Name',
            'email' => 'testuser@email.com',
            'password' => 'testpassword123'
        ]);
    }

    /**
     * @return JwtGuard
     */
    private function createJwtGuard()
    {
        return new JwtGuard(
            new DummyUserProvider(),
            'test-secret',
            10
        );
    }
}
