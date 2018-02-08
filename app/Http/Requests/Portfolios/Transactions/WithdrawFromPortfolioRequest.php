<?php

namespace App\Http\Requests\Portfolios\Transactions;

use App\Models\Coin;
use App\Models\Portfolio;
use App\Models\PortfolioCoin;
use Carbon\Carbon;
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
            'out_coin_name' => 'required|exists:coins,name',
            'out_amount' => 'required|numeric|min:0',
            'transaction_at' => 'date_format:Y-m-d H:i:s|before_or_equal:' . Carbon::now()->format('Y-m-d H:i:s'),
        ];
    }

    public function messages()
    {
        return [
            'out_coin_name.required' => 'Please enter a coin name',
            'out_coin_name.exists' => 'Coin name not found',

            'out_amount.required' => 'Please enter an amount',
            'out_amount.min' => 'The amount must be greater than 0',
            'out_amount.numeric' => 'Please enter a valid number',

            'transaction_at.date_format' => 'Please enter a date in the Y-m-d H:i:s format',
            'transaction_at.before_or_equal' => 'Please enter a date that is not in the future',
        ];
    }
}
