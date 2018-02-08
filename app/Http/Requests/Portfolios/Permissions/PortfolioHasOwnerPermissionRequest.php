<?php

namespace App\Http\Requests\Portfolios\Permissions;

use App\Models\Portfolio;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PortfolioHasOwnerPermissionRequest extends FormRequest
{
    public function authorize()
    {
        $portfolio = Portfolio::find($this->route('portfolio'))->first();

        if (! Auth::user()->can('owner', $portfolio)) {
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
