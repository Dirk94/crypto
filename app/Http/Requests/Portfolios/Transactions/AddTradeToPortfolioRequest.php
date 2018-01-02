<?php

namespace App\Http\Requests\Portfolios\Transactions;

use App\Models\Coin;
use App\Models\Portfolio;
use App\Models\PortfolioCoin;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class AddTradeToPortfolioRequest extends FormRequest
{
    public function authorize()
    {
        $portfolio = Portfolio::find($this->route('portfolio'))->first();

        return Auth::user()->can('modifyTransaction', $portfolio);
    }

    /** @param $validator Validator */
    public function withValidator($validator)
    {
        $portfolio = Portfolio::find($this->route('portfolio'))->first();
        $coin = Coin::whereApiName($this->request->get('out_coin_name'))->first();
        $amount = $this->request->get('out_amount');

        $portfolioCoin = PortfolioCoin::wherePortfolioId($portfolio->id)
            ->whereCoinId($coin->id)
            ->first();

        $validator->after(function($validator) use ($portfolioCoin, $amount) {
            if (! $portfolioCoin) {
                $validator->errors()->add('out_coin_name', 'The out_coin does not exists in the portfolio.');
            }

            if ($portfolioCoin->amount < $amount) {
                $validator->errors()->add('out_amount', 'Insufficient balance.');
            }
        });
    }

    public function rules()
    {
        return [
            'in_coin_name' => 'required|exists:coins,api_name',
            'out_coin_name' => 'required|exists:coins,api_name',
            'in_amount' => 'required|numeric|min:0',
            'out_amount' => 'required|numeric|min:0',
        ];
    }
}
