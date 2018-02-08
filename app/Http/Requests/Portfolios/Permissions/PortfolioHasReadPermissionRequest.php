<?php

namespace App\Http\Requests\Portfolios\Permissions;

use App\Models\Portfolio;
use App\Models\Transaction;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PortfolioHasReadPermissionRequest extends FormRequest
{
    public function authorize()
    {
        $portfolio = Portfolio::find($this->route('portfolio'))->first();

        if (! Auth::user()->can('read', $portfolio)) {
            return false;
        }

        $transactionId = $this->route('transaction');
        if ($transactionId) {
            $transaction = Transaction::find($transactionId)->first();
            if (! $transaction) {
                return false;
            }

            return ($transaction->portfolio->id === $portfolio->id);
        }

        return true;
    }

    public function rules()
    {
        return [];
    }
}
