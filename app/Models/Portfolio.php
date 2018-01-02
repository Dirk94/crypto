<?php
namespace App\Models;


use App\Jobs\UpdatePortfolioBalance;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Portfolio
 *
 * @property int $id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string $name
 * @property int $user_id
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Portfolio whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Portfolio whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Portfolio whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Portfolio whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Portfolio whereUserId($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PortfolioCoin[] $coins
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Transaction[] $transactions
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $users
 * @property float $btc_value
 * @property float $usd_value
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Portfolio whereBtcValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Portfolio whereUsdValue($value)
 */
class Portfolio extends Model
{
    protected $fillable = [
        'name'
    ];

    public function depositTransaction(Transaction $transaction)
    {
        $coin = $this->coins()
            ->whereCoinId($transaction->in_coin_id)
            ->first();

        if (! $coin) {
            $coin = new PortfolioCoin([
                'portfolio_id' => $this->id,
                'coin_id' => $transaction->in_coin_id,
            ]);
        }

        $coin->amount += $transaction->in_amount;
        $coin->save();

        $this->transactions()->save($transaction);

        // Do this as a job since it may take some time.
        UpdatePortfolioBalance::dispatch($this);

        return true;
    }

    public function withdrawTransaction(Transaction $transaction)
    {
        $coin = $this->coins()
            ->whereCoinId($transaction->out_coin_id)
            ->first();

        if (! $coin) {
            return false;
        }

        if ($coin->amount < $transaction->out_amount) {
            return false;
        }

        $coin->amount -= $transaction->out_amount;
        $coin->save();

        $transaction->portfolio()->associate($this);
        $transaction->save();

        // Do this as a job since it may take some time.
        UpdatePortfolioBalance::dispatch($this);

        return true;
    }

    public function addTradeTransaction(Transaction $transaction)
    {
        if (! $this->withdrawTransaction($transaction)) {
            return false;
        }
        if (! $this->depositTransaction($transaction)) {
            return false;
        }

        return true;
    }

    public function updateBalance()
    {
        $totalUsd = 0;
        $totalBtc = 0;

        foreach($this->coins as $coin) {
            $usdValue = $coin->amount * $coin->coin->usd_value;
            $btcValue = $coin->amount * $coin->coin->btc_value;

            $totalUsd += $usdValue;
            $totalBtc += $btcValue;
        }

        $this->btc_value = $totalBtc;
        $this->usd_value = $totalUsd;
        $this->save();
    }


    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class)
            ->withPivot('permissions');
    }

    public function coins()
    {
        return $this->hasMany(PortfolioCoin::class);
    }
}