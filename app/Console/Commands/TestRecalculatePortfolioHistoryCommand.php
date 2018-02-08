<?php

namespace App\Console\Commands;

use App\Common\Coins\CoinApi;
use App\Common\Helpers\Permissions;
use App\Common\History\CoinHistory;
use App\Common\History\PortfolioHistory;
use App\Common\History\RecalculatePortfolioHistory;
use App\Jobs\UpdatePortfolioBalance;
use App\Models\Coin;
use App\Models\Portfolio;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;

class TestRecalculatePortfolioHistoryCommand extends Command
{
    protected $signature = 'test:recalculate-portfolio-history';

    protected $description = 'Tests the recalculation of all history.';

    public function handle()
    {
        $user = User::whereEmail('dirkhoekstra@gmail.com')->first();

        $portfolio = Portfolio::whereName('konijntje')->first();
        if (! $portfolio) {
            $portfolio = new Portfolio();
            $portfolio->name = 'konijntje';
            $portfolio->save();

            $user->portfolios()->attach($portfolio, [
                'permissions' => Permissions::OWNER,
            ]);
        }

        $oneWeekAgo = Carbon::now()->subWeek();

        /*$transaction = new Transaction();
        $transaction->in_amount = 1;
        $transaction->in_coin_id = Coin::whereName('Bitcoin')->first()->id;
        $transaction->type = Transaction::TYPE_DEPOSIT;
        $transaction->portfolio_id = $portfolio->id;
        $transaction->transaction_at = $oneWeekAgo;
        $transaction->save();

        $twoWeeksAgo = Carbon::now()->subWeeks(2);

        $transaction = new Transaction();
        $transaction->in_amount = 1;
        $transaction->in_coin_id = Coin::whereName('Bitcoin')->first()->id;
        $transaction->type = Transaction::TYPE_DEPOSIT;
        $transaction->portfolio_id = $portfolio->id;
        $transaction->transaction_at = $twoWeeksAgo;
        $transaction->save();*/

        RecalculatePortfolioHistory::recalculateHistory($portfolio);

    }
}
