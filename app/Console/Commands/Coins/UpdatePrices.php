<?php

namespace App\Console\Commands\Coins;

use App\Common\Coins\CoinApi;
use App\Common\History\CoinHistory;
use App\Common\History\PortfolioHistory;
use App\Jobs\UpdatePortfolioBalance;
use App\Models\Portfolio;
use Illuminate\Console\Command;

class UpdatePrices extends Command
{
    protected $signature = 'coins:update';

    protected $description = 'Updates the current price of all coin from an API.';

    public function handle(CoinApi $coinApi)
    {
        $coinApi->updateAllCoins();

        // Write results to history tables.
        CoinHistory::saveMinuteHistory();
        CoinHistory::saveHourHistory();
        CoinHistory::saveDayHistory();

        // Remove old history results
        CoinHistory::cleanupOldHistory();

        // Update balance of all portfolios
        foreach(Portfolio::all() as $portfolio) {
            UpdatePortfolioBalance::dispatch($portfolio);
        }

        PortfolioHistory::saveAllMinuteHistory();
        PortfolioHistory::saveAllHourHistory();
        PortfolioHistory::saveDayHistory();

        PortfolioHistory::cleanupOldHistory();
    }
}
