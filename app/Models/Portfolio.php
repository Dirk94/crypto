<?php
namespace App\Models;

use App\Common\History\CoinHistory;
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
 * @property-read mixed $btc_value1h_ago
 * @property-read mixed $btc_value30d_ago
 * @property-read mixed $btc_value5m_ago
 * @property-read mixed $btc_value7d_ago
 * @property-read mixed $usd_value1h_ago
 * @property-read mixed $usd_value30d_ago
 * @property-read mixed $usd_value5m_ago
 * @property-read mixed $usd_value7d_ago
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

    public function updateBalance($date)
    {
        $totalUsd = 0;
        $totalBtc = 0;

        foreach(PortfolioCoin::wherePortfolioId($this->id)->get() as $coin) {
            if ($date === null) {
                $coinUsdValue = $coin->coin->usd_value;
                $coinBtcvalue = $coin->coin->btc_value;
            } else {
                $coinHistory = CoinHistory::getCoinHistoryModel($coin->coin_id, $date);

                $coinUsdValue = ($coinHistory !== null) ? $coinHistory->usd_value : $coin->coin->usd_value;
                $coinBtcvalue = ($coinHistory !== null) ? $coinHistory->btc_value : $coin->coin->btc_value;
            }

            $usdValue = $coin->amount * $coinUsdValue;
            $btcValue = $coin->amount * $coinBtcvalue;

            $totalUsd += $usdValue;
            $totalBtc += $btcValue;
        }

        $this->btc_value = $totalBtc;
        $this->usd_value = $totalUsd;
        $this->save();
    }

    /**
     * @param Carbon $date
     * @param Coin $coin
     *
     * @return double Returns the amount of the given coin the portfolio had at the given date.
     */
    public function getBalanceAt(Carbon $date, Coin $coin)
    {
        $transactions = $this->transactions()
            ->where('transaction_at', '<=', $date)
            ->where(function($query) use ($coin) {
                $query->where('in_coin_id', $coin->id);
                $query->orWhere('out_coin_id', $coin->id);
            })->orderBy('transaction_at', 'ASC')
            ->get();

        $amount = 0;
        foreach($transactions as $transaction) {
            switch($transaction->type) {
                case Transaction::TYPE_DEPOSIT:
                    $amount += $transaction->in_amount;
                    break 1;

                case Transaction::TYPE_WITHDRAWAL:
                    $amount -= $transaction->out_amount;
                    break 1;

                case Transaction::TYPE_TRADE:
                    if ($transaction->in_coin_id === $coin->id)  { $amount += $transaction->in_amount;  }
                    if ($transaction->out_coin_id === $coin->id) { $amount -= $transaction->out_amount; }
                    break 1;
            }
        }

        return $amount;
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