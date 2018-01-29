<?php

namespace App\Http\Controllers;

use App\Common\Helpers\JsonResponse;
use App\Http\Requests\Portfolios\Permissions\PortfolioHasReadPermissionRequest;
use App\Models\History\PortfolioCoinDayHistory;
use App\Models\History\PortfolioCoinHourHistory;
use App\Models\History\PortfolioCoinMinuteHistory;
use App\Models\Portfolio;
use Carbon\Carbon;

class PortfolioHistoryController extends Controller
{
    const MINUTE_POINTS_TO_RETURN = 50,
        HOUR_POINTS_TO_RETURN = 50,
        DAY_POINTS_TO_RETURN = 50;

    public function getMinuteHistory(PortfolioHasReadPermissionRequest $request, Portfolio $portfolio)
    {
        $date = Carbon::now();
        $date->minute = floor($date->minute / 5 ) * 5;

        $firstDateExists = PortfolioCoinMinuteHistory::wherePortfolioId($portfolio->id)
            ->where('date', '=', $date->format('Y-m-d H:i:00'))
            ->first();
        if (! $firstDateExists) {
            $date = $date->subMinutes(5);
        }

        $dates = [];
        for ($i=0; $i<self::MINUTE_POINTS_TO_RETURN; $i++) {
            $dates[] = $date->format('Y-m-d H:i:00');
            $date = $date->subMinutes(5);
        }

        $dataPoints = PortfolioCoinMinuteHistory::wherePortfolioId($portfolio->id)
            ->whereIn('date', $dates)
            ->orderBy('date', 'DESC')
            ->get([
                'date', 'btc_value', 'usd_value'
            ]);

        return JsonResponse::send([
            'count' => $dataPoints->count(),
            'data' => $dataPoints
        ]);
    }

    public function getHourHistory(PortfolioHasReadPermissionRequest $request, Portfolio $portfolio)
    {
        $date = Carbon::now();

        $dates = [];
        for ($i=0; $i<self::HOUR_POINTS_TO_RETURN; $i++) {
            $dates[] = $date->subHour()->format('Y-m-d H:00:00');
        }

        $dataPoints = PortfolioCoinHourHistory::wherePortfolioId($portfolio->id)
            ->whereIn('date', $dates)
            ->orderBy('date', 'DESC')
            ->get([
                'date', 'btc_value', 'usd_value'
            ]);

        return JsonResponse::send([
            'count' => $dataPoints->count(),
            'data' => $dataPoints
        ]);
    }

    public function getDayHistory(PortfolioHasReadPermissionRequest $request, Portfolio $portfolio)
    {
        $date = Carbon::now();

        $dates = [];
        for ($i=0; $i<self::DAY_POINTS_TO_RETURN; $i++) {
            $dates[] = $date->subDay()->format('Y-m-d');
        }

        $dataPoints = PortfolioCoinDayHistory::wherePortfolioId($portfolio->id)
            ->whereIn('date', $dates)
            ->orderBy('date', 'DESC')
            ->get([
                'date', 'btc_value', 'usd_value'
            ]);

        return JsonResponse::send([
            'count' => $dataPoints->count(),
            'data' => $dataPoints
        ]);
    }
}
