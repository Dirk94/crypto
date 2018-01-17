<?php

namespace App\Http\Controllers;

use App\Common\History\CoinHistory;
use App\Models\History\CoinDayHistory;
use App\Models\History\CoinHourHistory;
use App\Models\History\CoinMinuteHistory;
use Carbon\Carbon;

class HistoryStatusController extends Controller
{
    public function showMinuteHistoryStatus()
    {
        $history = CoinMinuteHistory::distinct()
            ->orderBy('date', 'desc')
            ->limit(CoinHistory::TIME_TO_KEEP_MINUTE_DATA)
            ->get(['date'])
            ->toArray();

        $history = array_flatten($history);

        $expectedHistory = [];
        $date = Carbon::now();

        for ($i=0; $i<CoinHistory::TIME_TO_KEEP_MINUTE_DATA; $i++) {
            $expectedHistory[] = $date->format('Y-m-d H:i:00');
            $date = $date->subMinute();
        }

        $missingValues = array_diff($expectedHistory, $history);

        return view('status.coins', [
            'date' => 'Minute',
            'missingValues' => $missingValues
        ]);
    }

    public function showHourHistoryStatus()
    {
        $history = CoinHourHistory::distinct()
            ->orderBy('date', 'desc')
            ->limit(CoinHistory::TIME_TO_KEEP_HOUR_DATA)
            ->get(['date'])
            ->toArray();

        $history = array_flatten($history);

        $expectedHistory = [];
        $date = Carbon::now();

        for ($i=0; $i<count($history); $i++) {
            $expectedHistory[] = $date->format('Y-m-d H:00:00');
            $date = $date->subHour();
        }

        $missingValues = array_diff($expectedHistory, $history);

        return view('status.coins', [
            'date' => 'Hour',
            'missingValues' => $missingValues
        ]);
    }

    public function showDayHistoryStatus()
    {
        $history = CoinDayHistory::distinct()
            ->orderBy('date', 'desc')
            ->limit(CoinHistory::TIME_TO_KEEP_DAY_DATA)
            ->get(['date'])
            ->toArray();

        $history = array_flatten($history);

        $expectedHistory = [];
        $date = Carbon::now();

        for ($i=0; $i<count($history); $i++) {
            $expectedHistory[] = $date->format('Y-m-d');
            $date = $date->subHour();
        }

        $missingValues = array_diff($expectedHistory, $history);

        return view('status.coins', [
            'date' => 'Day',
            'missingValues' => $missingValues
        ]);
    }
}
