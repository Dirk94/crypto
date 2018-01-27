<?php

namespace App\Http\Controllers;

use App\Common\Helpers\JsonResponse;
use App\Common\Helpers\Permissions;
use App\Http\Requests\Portfolios\AddUserToPortfolioRequest;
use App\Http\Requests\Portfolios\CreatePortfolioRequest;
use App\Http\Requests\Portfolios\Permissions\PortfolioHasOwnerPermissionRequest;
use App\Http\Requests\Portfolios\Permissions\PortfolioHasReadPermissionRequest;
use App\Models\History\PortfolioCoinMinuteHistory;
use App\Models\Portfolio;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class PortfolioController extends Controller
{
    public function createPortfolioForUser(CreatePortfolioRequest $request)
    {
        $user = Auth::user();

        $portfolio = new Portfolio();
        $portfolio->name = $request->get('name');

        $user->portfolios()->save($portfolio, [
            'permissions' => Permissions::OWNER
        ]);

        return JsonResponse::send();
    }

    public function listPortfoliosOfUser()
    {
        $user = Auth::user();

        return JsonResponse::send(
            $user->portfolios
        );
    }

    public function getPortfolioOfUser(PortfolioHasReadPermissionRequest $request, Portfolio $portfolio)
    {
        $portfolioWithPivot = Auth::user()->portfolios()
            ->wherePortfolioId($portfolio->id)
            ->first();

        return JsonResponse::send(
            $portfolioWithPivot
        );
    }

    public function deletePortfolioOfUser(PortfolioHasOwnerPermissionRequest $request, Portfolio $portfolio)
    {
        $portfolio->delete();

        return JsonResponse::send();
    }

    public function addUserToPortfolio(AddUserToPortfolioRequest $request, Portfolio $portfolio, User $user)
    {
        // Remove old permission if it exists.
        $user->portfolios()->detach($portfolio);

        // Create the new permission.
        $user->portfolios()->attach($portfolio, [
            'permissions' => $request->get('permissions'),
        ]);

        return JsonResponse::send();
    }
}
