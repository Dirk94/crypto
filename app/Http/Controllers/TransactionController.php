<?php

namespace App\Http\Controllers;

use App\Common\Helpers\JsonResponse;
use App\Http\Requests\Portfolios\Permissions\PortfolioHasReadPermissionRequest;
use App\Http\Requests\Portfolios\Transactions\AddTradeToPortfolioRequest;
use App\Http\Requests\Portfolios\Transactions\DepositToPortfolioRequest;
use App\Http\Requests\Portfolios\Transactions\WithdrawFromPortfolioRequest;
use App\Models\Coin;
use App\Models\Portfolio;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function depositToPortfolio(DepositToPortfolioRequest $request, Portfolio $portfolio)
    {
        $transaction = new Transaction();
        $transaction->fill($request->all());

        $transaction->in_coin_id = Coin::whereName($request->get('in_coin_name'))->first()->id;
        $transaction->type = Transaction::TYPE_DEPOSIT;

        if (! $portfolio->depositTransaction($transaction)) {
            return response()->json(['error' => 'Something went wrong'], 422);
        }

        return JsonResponse::send();
    }

    public function withdrawFromPortfolio(WithdrawFromPortfolioRequest $request, Portfolio $portfolio)
    {
        $transaction = new Transaction();
        $transaction->fill($request->all());

        $transaction->out_coin_id = Coin::whereName($request->get('out_coin_name'))->first()->id;
        $transaction->type = Transaction::TYPE_WITHDRAWAL;

        if (! $portfolio->withdrawTransaction($transaction)) {
            return response()->json(['error' => 'Something went wrong'], 422);
        }

        return JsonResponse::send();
    }

    public function addTradeToPortfolio(AddTradeToPortfolioRequest $request, Portfolio $portfolio)
    {
        $transaction = new Transaction();
        $transaction->fill($request->all());

        $transaction->out_coin_id = Coin::whereName($request->get('out_coin_name'))->first()->id;
        $transaction->in_coin_id = Coin::whereName($request->get('in_coin_name'))->first()->id;
        $transaction->type = Transaction::TYPE_TRADE;

        if (! $portfolio->addTradeTransaction($transaction)) {
            return response()->json(['error' => 'Something went wrong'], 422);
        }

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
}
