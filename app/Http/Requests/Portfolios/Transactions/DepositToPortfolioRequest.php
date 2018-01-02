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
            'in_coin_name' => 'required|exists:coins,api_name',
            'in_amount' => 'required|numeric|min:0',
        ];
    }
}
