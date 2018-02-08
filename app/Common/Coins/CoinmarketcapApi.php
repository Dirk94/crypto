<?php

namespace App\Common\Coins;

use App\Models\Coin;
use GuzzleHttp\Client;

class CoinmarketcapApi implements CoinApi
{
    const BASE_URL = 'https://api.coinmarketcap.com/v1/ticker/';

    private $client;

    public function __construct()
    {
        $this->client = new Client(['base_uri' => self::BASE_URL]);
    }

    public function updateAllCoins()
    {
        $response = $this->client->get('?limit=0');
        $coinsResponse = json_decode((string) $response->getBody());

        foreach($coinsResponse as $jsonObject) {
            $coin = Coin::whereApiName($jsonObject->id)->first();
            if (! $coin) {
                $coin = new Coin();
            }
            $this->updateCoinAttributes($coin, $jsonObject);

            try {
                $coin->save();
            } catch(\Exception $e) {
                throw $e;
            }

        }
    }

    private function updateCoinAttributes(Coin $coin, \stdClass $json)
    {
        $coin->fill([
            'api_name'              => $json->id,
            'name'                  => $json->name,
            'symbol'                => $json->symbol,
            'rank'                  => intval($json->rank),
            'usd_value'             => floatval($json->price_usd),
            'btc_value'             => floatval($json->price_btc),
            'usd_24h_volume'        => floatval($json->{'24h_volume_usd'}),
            'usd_market_cap'        => floatval($json->market_cap_usd),
            'available_supply'      => floatval($json->available_supply),
            'total_supply'          => floatval($json->total_supply),
            'max_supply'            => floatval($json->max_supply),
            'percentage_change_1h'  => floatval($json->percent_change_1h),
            'percentage_change_24h' => floatval($json->percent_change_24h),
            'percentage_change_7d'  => floatval($json->percent_change_7d)
        ]);
    }
}
