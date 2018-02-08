<?php

namespace App\Jobs;

use App\Common\Helpers\DateUtils;
use App\Common\History\PortfolioHistory;
use App\Models\Portfolio;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class UpdatePortfolioBalance implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /** @var Portfolio The portfolio to update. */
    private $portfolio;

    /** @var Carbon The date of coin rates this update job should use. Defaults to now. */
    private $date;

    public function __construct(Portfolio $portfolio, Carbon $date = null)
    {
        $this->portfolio = $portfolio;

        if ($date === null) {
            $date = Carbon::now();
        }
        $this->date = $date;
    }

    public function handle()
    {
        // Update the balance of the portfolio.
        $this->portfolio->updateBalance($this->date);

        // Then recalculate the portfolio history.
        // This is done so that the charts are updated as well.
        $date = DateUtils::toNearestFiveMinutes($this->date);

        PortfolioHistory::saveSingleMinuteHistory(
            $this->portfolio,
            $date->format('Y-m-d H:i:00'),
            true // Set override to true, because we want to update the newest history value with the new deposit value.
        );
    }
}
