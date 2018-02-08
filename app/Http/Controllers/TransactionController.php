<?php

namespace App\Http\Controllers;

use App\Common\Helpers\JsonResponse;
use App\Http\Requests\Portfolios\Permissions\PortfolioHasReadPermissionRequest;
use App\Http\Requests\Portfolios\Permissions\PortfolioHasWritePermissionRequest;
use App\Http\Requests\Portfolios\Transactions\AddTradeToPortfolioRequest;
use App\Http\Requests\Portfolios\Transactions\CreateTransactionRequest;
use App\Http\Requests\Portfolios\Transactions\DeleteTransactionRequest;
use App\Http\Requests\Portfolios\Transactions\DepositToPortfolioRequest;
use App\Http\Requests\Portfolios\Transactions\WithdrawFromPortfolioRequest;
use App\Models\Coin;
use App\Models\Portfolio;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function createTransaction(CreateTransactionRequest $request, Portfolio $portfolio)
    {
        $transaction = new Transaction();
        $transaction->fill($request->all());

        if ($request->has('in_coin_name') && $transaction->type !== Transaction::TYPE_WITHDRAWAL) {
            $transaction->in_coin_id = Coin::whereName($request->get('in_coin_name'))->first()->id;
        }
        if ($request->has('out_coin_name') && $transaction->type !== Transaction::TYPE_DEPOSIT) {
            $transaction->out_coin_id = Coin::whereName($request->get('out_coin_name'))->first()->id;
        }

        $portfolio->transactions()->save($transaction);

        return JsonResponse::send($transaction);
    }

    public function listTransactionsOfPortfolio(PortfolioHasReadPermissionRequest $request, Portfolio $portfolio)
    {
        return JsonResponse::send(
            $portfolio->transactions()
                ->orderBy('created_at', 'DESC')
                ->get()
        );
    }

    public function getSingleTransaction(PortfolioHasReadPermissionRequest $request, Portfolio $portfolio, Transaction $transaction)
    {
        return JsonResponse::send(
            $transaction
        );
    }

    public function deleteTransaction(PortfolioHasWritePermissionRequest $request, Portfolio $portfolio, Transaction $transaction)
    {
        $transaction->softDelete();

        return JsonResponse::send([], 204);
    }

    public function updateTransaction(CreateTransactionRequest $request, Portfolio $portfolio, Transaction $transaction)
    {
        $transaction->fill($request->all());
        $transaction->processed = false;

        if ($request->has('in_coin_name') && $transaction->type !== Transaction::TYPE_WITHDRAWAL) {
            $transaction->in_coin_id = Coin::whereName($request->get('in_coin_name'))->first()->id;
        }
        if ($request->has('out_coin_name') && $transaction->type !== Transaction::TYPE_DEPOSIT) {
            $transaction->out_coin_id = Coin::whereName($request->get('out_coin_name'))->first()->id;
        }

        $transaction->save();

        return JsonResponse::send($transaction);
    }
}
