<?php

namespace App\Common\Helpers;

use Illuminate\Support\Facades\Auth;

class JsonResponse
{
    public static function send($data = [], $statusCode = 200)
    {
        $user = Auth::user();
        if ($user) {
            $data['new_token'] = Auth::guard()->userToToken($user);
        }

        return response()->json(
            $data,
            $statusCode
        );
    }
}
