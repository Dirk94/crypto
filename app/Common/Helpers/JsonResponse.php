<?php

namespace App\Common\Helpers;

use Illuminate\Support\Facades\Auth;

class JsonResponse
{
    public static function send($data = [], $statusCode = 200)
    {
        $user = Auth::user();
        $headers = [];
        if ($user) {
            $headers['X-Fresh-Token'] = Auth::guard()->userToToken($user);
        }

        return response()->json(
            $data,
            $statusCode
        )->withHeaders($headers);
    }
}
