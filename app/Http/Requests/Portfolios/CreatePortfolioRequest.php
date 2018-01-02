<?php

namespace App\Http\Requests\Portfolios;

use App\Models\Portfolio;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreatePortfolioRequest extends FormRequest
{
    public function authorize()
    {
        // Every (logged in) user can create a portfolio.
        return Auth::check();
    }

    public function rules()
    {
        return [
            'name' => 'required|max:255'
        ];
    }
}
