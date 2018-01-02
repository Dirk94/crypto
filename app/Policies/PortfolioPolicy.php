<?php

namespace App\Policies;

use App\Common\Helpers\Permissions;
use App\Models\Portfolio;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PortfolioPolicy
{
    use HandlesAuthorization;

    /**
     * Returns if the given user has read permissions to the Portfolio.
     */
    public function read(User $user, Portfolio $portfolio)
    {
        $pivot = $user->portfolios()
            ->wherePortfolioId($portfolio->id)
            ->first();

        // If a pivot exists the user has read access to this portfolio.
        return ($pivot !== null);
    }

    /**
     * Returns if the given user has write permissions to the Portfolio.
     * If a user has write permissions he also has read permissions.
     */
    public function write(User $user, Portfolio $portfolio)
    {
        $pivot = $user->portfolios()
            ->wherePortfolioId($portfolio->id)
            ->wherePermissions(Permissions::WRITE)
            ->orWhere('permissions', '=', Permissions::OWNER)
            ->first();

        return ($pivot !== null);
    }

    /**
     * Returns if the given user is the owner of the Portfolio.
     */
    public function owner(User $user, Portfolio $portfolio)
    {
        $pivot = $user->portfolios()
            ->wherePortfolioId($portfolio->id)
            ->wherePermissions(Permissions::OWNER)
            ->first();

        return ($pivot !== null);
    }
}
