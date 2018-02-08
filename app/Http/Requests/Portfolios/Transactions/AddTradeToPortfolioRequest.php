<?php

namespace App\Http\Requests\Portfolios\Transactions;

use App\Models\Coin;
use App\Models\Portfolio;
use App\Models\PortfolioCoin;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class AddTradeToPortfolioRequest extends FormRequest
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
        if (! $coin) {
            return;
        }

        $transactionAt = $this->request->has('transaction_at') ?
            Carbon::createFromFormat('Y-m-d H:i:s', $this->request->get('transaction_at')) :
            Carbon::now();

        $amount = $this->request->get('out_amount');
        $amountInPortfolio = $portfolio->getBalanceAt($transactionAt, $coin);

        $validator->after(function($validator) use ($amount, $amountInPortfolio) {
            if ($amountInPortfolio < $amount) {
                $validator->errors()->add('out_amount', 'Insufficient balance at the given date.');
            }
        });
    }

    public function rules()
    {
        return [
            'in_coin_name' => 'required|exists:coins,name',
            'out_coin_name' => 'required|exists:coins,name',
            'in_amount' => 'required|numeric|min:0',
            'out_amount' => 'required|numeric|min:0',
            'transaction_at' => 'date_format:Y-m-d H:i:s|before_or_equal:' . Carbon::now()->format('Y-m-d H:i:s'),
        ];
    }
}
