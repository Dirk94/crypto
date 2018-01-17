<?php

namespace App\Http\Controllers;

use App\Common\Helpers\Permissions;
use App\Http\Requests\Coins\RegisterFormRequest;
use App\Models\Portfolio;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterFormRequest $request)
    {
        $user = new User($request->all());
        $user->save();

        $portfolio = new Portfolio();
        $portfolio->name = 'Default Portfolio';

        $user->portfolios()->save($portfolio, [
            'permissions' => Permissions::OWNER
        ]);

        return response()->json(['user' => $user]);
    }

    public function login(Request $request)
    {
        $token = Auth::validate($request->only(['email', 'password']));
        if (! $token) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        $user = User::whereEmail($request->input('email'))->first();
        $defaultPortfolio = $user->portfolios()->first();

        return response()->json([
            'token' => $token,
            'default_portfolio_id' => $defaultPortfolio->id
        ], 200);
    }

    public function me()
    {
        $user = Auth::user();
        return response()->json(['user' => $user]);
    }
}
