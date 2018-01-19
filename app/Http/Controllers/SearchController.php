<?php

namespace App\Http\Controllers;

use App\Common\Helpers\JsonResponse;
use App\Models\Coin;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function searchCoin(Request $request)
    {
        $q = $request->get('q');
        if (! $q) {
            return $this->listAllCoins();
        }

        $coins = Coin::where('name', 'like', "$q%")
            ->orWhere('api_name', 'like', "$q%")
            ->orWhere('symbol', 'like', "$q%")
            ->orderBy('api_name', 'ASC')
            ->get(['name', 'api_name', 'symbol']);

        return JsonResponse::send($coins);
    }

    public function listAllCoins()
    {
        return JsonResponse::send(
            Coin::orderBy('api_name', 'ASC')->get([
                'name', 'api_name', 'symbol'
            ])
        );
    }
}
