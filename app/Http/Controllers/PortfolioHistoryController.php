<?php

namespace App\Http\Controllers;

use App\Common\History\PortfolioHistory;
use App\Http\Requests\Portfolios\Permissions\PortfolioHasReadPermissionRequest;
use App\Models\History\PortfolioCoinDayHistory;
use App\Models\History\PortfolioCoinHourHistory;
use App\Models\History\PortfolioCoinMinuteHistory;
use App\Models\Portfolio;

class PortfolioHistoryController extends Controller
{
    public function getMinuteHistory(PortfolioHasReadPermissionRequest $request, Portfolio $portfolio)
    {
        $dataPoints = PortfolioCoinMinuteHistory::wherePortfolioId($portfolio->id)
            ->orderBy('date', 'DESC')
            ->limit(PortfolioHistory::TIME_TO_KEEP_MINUTE_DATA)
            ->get([
                'date', 'btc_value', 'usd_value'
            ]);

        return response()->json([
            'count' => $dataPoints->count(),
            'data' => $dataPoints
        ]);
    }

    public function getHourHistory(PortfolioHasReadPermissionRequest $request, Portfolio $portfolio)
    {
        $dataPoints = PortfolioCoinHourHistory::wherePortfolioId($portfolio->id)
            ->orderBy('date', 'DESC')
            ->limit(PortfolioHistory::TIME_TO_KEEP_HOUR_DATA)
            ->get([
                'date', 'btc_value', 'usd_value'
            ]);

        return response()->json([
            'count' => $dataPoints->count(),
            'data' => $dataPoints
        ]);
    }

    public function getDayHistory(PortfolioHasReadPermissionRequest $request, Portfolio $portfolio)
    {
        $dataPoints = PortfolioCoinDayHistory::wherePortfolioId($portfolio->id)
            ->orderBy('date', 'DESC')
            ->limit(PortfolioHistory::TIME_TO_KEEP_DAY_DATA)
            ->get([
                'date', 'btc_value', 'usd_value'
            ]);

        return response()->json([
            'count' => $dataPoints->count(),
            'data' => $dataPoints
        ]);
    }
}
