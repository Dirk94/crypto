<?php
namespace App\Models;


use App\Jobs\UpdatePortfolioBalance;
use App\Models\History\PortfolioCoinDayHistory;
use App\Models\History\PortfolioCoinHourHistory;
use App\Models\History\PortfolioCoinMinuteHistory;
use Carbon\Carbon;
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
 * @property-read mixed $btc_value1d_ago
 * @property-read mixed $usd_value1d_ago
 */
class Portfolio extends Model
{
    protected $fillable = [
        'name'
    ];

    protected $appends = [
        'usd_value_30d_ago', 'btc_value_30d_ago',
        'usd_value_7d_ago',  'btc_value_7d_ago',
        'usd_value_1d_ago',  'btc_value_1d_ago',
        'usd_value_1h_ago',  'btc_value_1h_ago',
        'usd_value_5m_ago',  'btc_value_5m_ago',
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


    public function getUsdValue30dAgoAttribute()
    {
        $model = $this->getDaysAgoHistoryModel(30);

        if (! $model) {
            return 0;
        }

        return $model->usd_value;
    }

    public function getBtcValue30dAgoAttribute()
    {
        $model = $this->getDaysAgoHistoryModel(30);

        if (! $model) {
            return 0;
        }

        return $model->btc_value;
    }

    public function getUsdValue7dAgoAttribute()
    {
        $model = $this->getDaysAgoHistoryModel(7);

        if (! $model) {
            return 0;
        }

        return $model->usd_value;
    }

    public function getBtcValue7dAgoAttribute()
    {
        $model = $this->getDaysAgoHistoryModel(7);

        if (! $model) {
            return 0;
        }

        return $model->btc_value;
    }

    public function getUsdValue1dAgoAttribute()
    {
        $model = $this->getYesterdayHistoryModel();

        if (! $model) {
            return 0;
        }

        return $model->usd_value;
    }

    public function getBtcValue1dAgoAttribute()
    {
        $model = $this->getYesterdayHistoryModel();

        if (! $model) {
            return 0;
        }

        return $model->btc_value;
    }

    public function getUsdValue1hAgoAttribute()
    {
        $model = $this->getOneHourAgoHistoryModel();

        if (! $model) {
            return 0;
        }

        return $model->usd_value;
    }

    public function getBtcValue1hAgoAttribute()
    {
        $model = $this->getOneHourAgoHistoryModel();

        if (! $model) {
            return 0;
        }

        return $model->btc_value;
    }

    public function getUsdValue5mAgoAttribute()
    {
        $model = $this->getFiveMinuteAgoHistoryModel();

        if (! $model) {
            return 0;
        }

        return $model->usd_value;
    }

    public function getBtcValue5mAgoAttribute()
    {
        $model = $this->getFiveMinuteAgoHistoryModel();

        if (! $model) {
            return 0;
        }

        return $model->btc_value;
    }

    /** @return PortfolioCoinDayHistory */
    public function getYesterdayHistoryModel()
    {
        $yesterday = Carbon::now()->format('Y-m-d');

        $model = PortfolioCoinDayHistory::wherePortfolioId($this->id)
            ->where('date', '<', $yesterday)
            ->orderBy('date', 'DESC')
            ->first();

        return $model;
    }

    /** @return PortfolioCoinHourHistory */
    public function getOneHourAgoHistoryModel()
    {
        $oneHourAgo = Carbon::now()->format('Y-m-d H:00:00');

        $model = PortfolioCoinHourHistory::wherePortfolioId($this->id)
            ->where('date', '<', $oneHourAgo)
            ->orderBy('date', 'DESC')
            ->first();

        return $model;
    }

    /** @return PortfolioCoinMinuteHistory */
    public function getFiveMinuteAgoHistoryModel()
    {
        $fiveMinutesAgo = Carbon::now()->subMinutes(5)->format('Y-m-d H:i:00');

        $model = PortfolioCoinMinuteHistory::wherePortfolioId($this->id)
            ->where('date', '<=', $fiveMinutesAgo)
            ->orderBy('date', 'DESC')
            ->first();

        return $model;
    }

    public function getDaysAgoHistoryModel($days)
    {
        // Yesterday is actually today so subtract 1.
        $days--;
        $yesterday = Carbon::now()->subDays($days)->format('Y-m-d');

        $model = PortfolioCoinDayHistory::wherePortfolioId($this->id)
            ->where('date', '<=', $yesterday)
            ->orderBy('date', 'DESC')
            ->first();

        return $model;
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