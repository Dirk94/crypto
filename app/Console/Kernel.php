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
        $schedule->command('coins:update')->everyFiveMinutes();
    }

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
