<?php

namespace App\Common\Auth;

use Carbon\Carbon;
use Firebase\JWT\JWT;
use Firebase\JWT\SignatureInvalidException;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class JwtGuard implements Guard
{
    /** @var UserProvider */
    private $userProvider;

    /** @var string The secret used to encode and decode the JWT tokens. */
    private $secret;

    /** @var int The time a token is valid in minutes. */
    private $expiresAfter;

    public function __construct(UserProvider $userProvider, $secret, $expiresAfter)
    {
        $this->userProvider = $userProvider;
        $this->secret = $secret;
        $this->expiresAfter = $expiresAfter;
    }

    /**
     * Called by the middleware to see if the user is authenticated.
     *
     * @return bool
     * @throws InvalidTokenException
     */
    public function authenticate()
    {
        $jwt = $this->getJwtTokenFromRequest();
        if (! $jwt) {
            throw new InvalidTokenException('token_not_found');
        }

        return $this->tokenToUser($jwt);
    }

    /**
     * Determine if the current user is authenticated.
     *
     * @return bool
     */
    public function check()
    {
        return ($this->user() !== null);
    }

    /**
     * Determine if the current user is a guest.
     *
     * @return bool
     */
    public function guest()
    {
        return ($this->user() === null);
    }

    /**
     * Get the currently authenticated user.
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function user()
    {
        $jwt = $this->getJwtTokenFromRequest();
        if (! $jwt) {
            return null;
        }

        try {
            return $this->tokenToUser($jwt);
        } catch(InvalidTokenException $e) {
            return null;
        }
    }

    /**
     * Get the ID for the currently authenticated user.
     *
     * @return int|null
     */
    public function id()
    {
        try {
            $user = $this->user();
            if (!$user) {
                return null;
            }
        } catch(InvalidTokenException $e) {
            return null;
        }

        return $user->getAuthIdentifier();
    }

    /**
     * Validate a user's credentials.
     *
     * @param  array $credentials
     * @return bool
     */
    public function validate(array $credentials = [])
    {

        $user = $this->userProvider->retrieveByCredentials($credentials);

        if (! $user) {
            return null;
        }

        if (! $this->userProvider->validateCredentials($user, $credentials)) {
            return null;
        }

        return $this->userToToken($user);
    }

    /**
     * Set the current user.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable $user
     * @return void
     */
    public function setUser(Authenticatable $user)
    {
        return $this->userToToken($user);
    }

    public function userToToken(Authenticatable $user)
    {
        $token = [
            'identifier' => $user->getAuthIdentifier(),
            'carbon_exp' => Carbon::now()->addMinutes($this->expiresAfter)->toIso8601String()
        ];

        return JWT::encode($token, $this->secret, 'HS256');
    }

    private function tokenToUser(string $jwt)
    {
        try {
            $token = JWT::decode($jwt, $this->secret, ['HS256']);
        } catch(SignatureInvalidException $e) {
            // Invalid token!
            throw new InvalidTokenException('token_invalid');
        }

        if (Carbon::now()->greaterThan(Carbon::parse($token->carbon_exp))) {
            // Token is expired.
            Throw new InvalidTokenException('token_expired');
        }

        return $this->userProvider->retrieveById($token->identifier);
    }

    private function getJwtTokenFromRequest()
    {
        return Request::header('authorization');
    }
}
