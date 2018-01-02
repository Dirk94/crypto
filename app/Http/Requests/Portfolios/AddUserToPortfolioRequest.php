<?php

namespace App\Http\Requests\Portfolios;

use App\Common\Helpers\Permissions;
use App\Models\Portfolio;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AddUserToPortfolioRequest extends FormRequest
{
    public function authorize()
    {
        $portfolio = Portfolio::find($this->route('portfolio'))->first();

        return Auth::user()->can('owner', $portfolio);
    }

    public function rules()
    {
        return [
            'permissions' => [
                'required',
                Rule::in([Permissions::OWNER, Permissions::WRITE, Permissions::READ])
            ]
        ];
    }
}
