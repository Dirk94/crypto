<?php

namespace App\Models;

use App\Jobs\UpdatePortfolioBalance;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Transaction
 *
 * @property int $id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property int $portfolio_id
 * @property string $type
 * @property int|null $out_coin_id
 * @property int|null $in_coin_id
 * @property float|null $out_amount
 * @property float|null $in_amount
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereInAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereInCoinId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereOutAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereOutCoinId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction wherePortfolioId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \App\Models\Portfolio $portfolio
 * @property \Carbon\Carbon $transaction_at
 * @property-read mixed $in_coin_name
 * @property-read mixed $in_coin_symbol
 * @property-read mixed $out_coin_name
 * @property-read mixed $out_coin_symbol
 * @property-read mixed $transaction_at_utc
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereTransactionAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereTransactionProcessed($value)
 * @property int $processed
 * @property int $deleted
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereDeleted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereProcessed($value)
 */
class Transaction extends Model
{
    const TYPE_DEPOSIT = 'deposit', TYPE_WITHDRAWAL = 'withdrawal', TYPE_TRADE = 'trade';

    protected $fillable = [
        'type', 'out_coin_id', 'in_coin_id', 'out_amount', 'in_amount', 'transaction_at'
    ];

    protected $dates = [
        'transaction_at'
    ];

    protected $appends = [
        'transaction_at_utc',
        'out_coin_name', 'in_coin_name',
        'out_coin_symbol', 'in_coin_symbol',
    ];

    /**
     * 'Processes' the transaction, meaning that the portfolio will be updated.
     */
    public function process()
    {
        $this->processed = true;
        $this->save();

        if ($this->deleted) { return; }

        switch ($this->type) {
            case self::TYPE_DEPOSIT:
                return $this->processDeposit();

            case self::TYPE_WITHDRAWAL:
                return $this->processWithdrawal();

            case self::TYPE_TRADE:
                return $this->processTrade();

            default:
                break;
        }
    }

    private function processDeposit()
    {
        $coin = $this->portfolio->coins()
            ->whereCoinId($this->in_coin_id)
            ->first();

        if (! $coin) {
            $coin = new PortfolioCoin([
                'portfolio_id' => $this->portfolio->id,
                'coin_id' => $this->in_coin_id,
            ]);
        }

        $coin->amount += $this->in_amount;
        $coin->save();

        UpdatePortfolioBalance::dispatch($this->portfolio, $this->transaction_at);

        return true;
    }

    private function processWithdrawal()
    {
        $coin = $this->portfolio->coins()
            ->whereCoinId($this->out_coin_id)
            ->first();

        // Sanity checks.
        if (! $coin) {
            return false;
        }
        if ($coin->amount < $this->out_amount) {
            return false;
        }

        $coin->amount -= $this->out_amount;
        $coin->save();

        // Do this as a job since it may take some time.
        UpdatePortfolioBalance::dispatch($this->portfolio, $this->transaction_at);

        return true;
    }

    private function processTrade()
    {
        if (! $this->processWithdrawal()) {
            return false;
        }
        if (! $this->processDeposit()) {
            return false;
        }

        return true;
    }

    public function softDelete()
    {
        $this->processed = false;
        $this->deleted = true;
        $this->save();
    }


    public function getTransactionAtUtcAttribute()
    {
        $transactionAt = ($this->transaction_at !== null) ?
            $this->transaction_at->copy() :
            Carbon::now();

        return $transactionAt->setTimezone('UTC')->format('Y-m-d H:i:s');
    }

    public function getOutCoinNameAttribute()
    {
        if ($this->out_coin_id === null) {
            return null;
        }

        $coin = Coin::whereId($this->out_coin_id)->first();
        if (! $coin) {
            return null;
        }

        return $coin->name;
    }

    public function getInCoinNameAttribute()
    {
        if ($this->in_coin_id === null) {
            return null;
        }

        $coin = Coin::whereId($this->in_coin_id)->first();
        if (! $coin) {
            return null;
        }

        return $coin->name;
    }

    public function getOutCoinSymbolAttribute()
    {
        if ($this->out_coin_id === null) {
            return null;
        }

        $coin = Coin::whereId($this->out_coin_id)->first();
        if (! $coin) {
            return null;
        }

        return $coin->symbol;
    }

    public function getInCoinSymbolAttribute()
    {
        if ($this->in_coin_id === null) {
            return null;
        }

        $coin = Coin::whereId($this->in_coin_id)->first();
        if (! $coin) {
            return null;
        }

        return $coin->symbol;
    }

    public function portfolio()
    {
        return $this->belongsTo(Portfolio::class);
    }
}
