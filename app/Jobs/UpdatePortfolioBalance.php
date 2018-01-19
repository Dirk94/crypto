<?php

namespace App\Jobs;

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

    private $portfolio;

    public function __construct(Portfolio $portfolio)
    {
        $this->portfolio = $portfolio;
    }

    public function handle()
    {
        // Update the balance of the portfolio.
        $this->portfolio->updateBalance();

        // Then recalculate the portfolio history.
        // This is done so that the charts are updated as well.
        $date = Carbon::now();
        $date->minute = floor($date->minute / 5 ) * 5;

        PortfolioHistory::saveSingleMinuteHistory(
            $this->portfolio,
            $date->format('Y-m-d H:i:00')
        );
    }
}
