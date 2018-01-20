<?php

namespace App\Console;

use App\Console\Commands\Coins\UpdatePrices;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        UpdatePrices::class,
    ];

    protected function schedule(Schedule $schedule)
    {
        $schedule->command('coins:update')->cron('3,8,13,18,23,28,33,38,43,48,53,58 * * * *');
    }

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
