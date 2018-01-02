<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateCoinHistoryTable extends Migration
{
    public function up()
    {
        DB::transaction(function() {
            Schema::create('coin_day_history', function (Blueprint $table) {
                $table->increments('id');

                $table->unsignedInteger('coin_id');
                $table->date('date');
                $table->unsignedDecimal('usd_market_cap', 25, 10);
                $table->unsignedDecimal('btc_value', 20, 10);
                $table->unsignedDecimal('usd_value', 25, 10);

                $table->foreign('coin_id')->references('id')->on('coins')->onDelete('cascade');
                $table->unique(['coin_id', 'date']);
            });

            Schema::create('coin_hour_history', function (Blueprint $table) {
                $table->increments('id');

                $table->unsignedInteger('coin_id');
                $table->dateTime('date');
                $table->unsignedDecimal('usd_market_cap', 25, 10);
                $table->unsignedDecimal('btc_value', 20, 10);
                $table->unsignedDecimal('usd_value', 25, 10);

                $table->foreign('coin_id')->references('id')->on('coins')->onDelete('cascade');
                $table->unique(['coin_id', 'date']);
            });

            Schema::create('coin_minute_history', function (Blueprint $table) {
                $table->increments('id');

                $table->unsignedInteger('coin_id');
                $table->dateTime('date');
                $table->unsignedDecimal('usd_market_cap', 25, 10);
                $table->unsignedDecimal('btc_value', 20, 10);
                $table->unsignedDecimal('usd_value', 25, 10);

                $table->foreign('coin_id')->references('id')->on('coins')->onDelete('cascade');
                $table->unique(['coin_id', 'date']);
            });
        });
    }

    public function down()
    {
        DB::transaction(function() {
            Schema::dropIfExists('coin_day_history');
            Schema::dropIfExists('coin_hour_history');
            Schema::dropIfExists('coin_minute_history');
        });
    }
}
