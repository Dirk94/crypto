<?php

namespace App\Http\Requests\Portfolios\Transactions;

use App\Models\Coin;
use App\Models\Portfolio;
use App\Models\PortfolioCoin;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Validator;

class WithdrawFromPortfolioRequest extends FormRequest
{
    public function authorize()
    {
        $portfolio = Portfolio::find($this->route('portfolio'))->first();

        return Auth::user()->can('write', $portfolio);
    }

    /** @param $validator Validator */
    public function withValidator($validator)
    {
        $portfolio = Portfolio::find($this->route('portfolio'))->first();
        $coin = Coin::whereName($this->request->get('out_coin_name'))->first();
        $amount = $this->request->get('out_amount');

        $portfolioCoin = PortfolioCoin::wherePortfolioId($portfolio->id)
            ->whereCoinId($coin->id)
            ->first();

        $validator->after(function($validator) use ($portfolioCoin, $amount) {
            if (! $portfolioCoin) {
                $validator->errors()->add('out_coin_name', 'The coin does not exists in the portfolio.');
            } else {
                if ($portfolioCoin->amount < $amount) {
                    $validator->errors()->add('out_amount', 'Insufficient balance.');
                }
            }
        });
    }

    public function rules()
    {
        return [
            'out_coin_name' => 'required|exists:coins,name',
            'out_amount' => 'required|numeric|min:0',
        ];
    }
}
