<?php

namespace App\Http\Requests\Portfolios\Transactions;

use App\Models\Portfolio;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class DepositToPortfolioRequest extends FormRequest
{
    public function authorize()
    {
        $portfolio = Portfolio::find($this->route('portfolio'))->first();
        return Auth::user()->can('write', $portfolio);
    }

    public function rules()
    {
        return [
            'in_coin_name' => 'required|exists:coins,name',
            'in_amount' => 'required|numeric|min:0.0000000001',
        ];
    }

    public function messages()
    {
        return [
            'in_coin_name.required' => 'Please enter a coin name',
            'in_coin_name.exists' => 'Coin name not found',

            'in_amount.required' => 'Please enter an amount',
            'in_amount.min' => 'The amount must be greater than 0',
            'in_amount.numeric' => 'Please enter a valid number',
        ];
    }
}
