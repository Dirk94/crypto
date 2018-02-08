<?php

namespace App\Console;

use App\Console\Commands\Coins\UpdatePrices;
use App\Console\Commands\TestRecalculatePortfolioHistoryCommand;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        UpdatePrices::class,

        TestRecalculatePortfolioHistoryCommand::class,
    ];

    protected function schedule(Schedule $schedule)
    {
        // Do it this way because the CoinMarketCap API updates at 0, 5, 10, 15, etc. minutes.
        $schedule->command('coins:update')->cron('1,6,11,16,21,26,31,36,41,46,51,56 * * * *');
    }

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
