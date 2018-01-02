<?php

namespace App\Http\Requests\Portfolios\Permissions;

use App\Models\Portfolio;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PortfolioHasWritePermissionRequest extends FormRequest
{
    public function authorize()
    {
        $portfolio = Portfolio::find($this->route('portfolio'))->first();

        return Auth::user()->can('write', $portfolio);
    }

    public function rules()
    {
        return [];
    }
}
