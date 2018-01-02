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

        return Auth::user()->can('owner', $portfolio);
    }

    public function rules()
    {
        return [];
    }
}
