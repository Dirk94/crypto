<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreatePortfolioCoinsHistoryTables extends Migration
{
    public function up()
    {
        DB::transaction(function() {
            Schema::create('portfolio_coins_minute_history', function(Blueprint $table) {
                $table->increments('id');

                $table->unsignedInteger('portfolio_id');
                $table->dateTime('date');

                $table->decimal('btc_value', 25, 10);
                $table->decimal('usd_value', 25, 10);

                $table->foreign('portfolio_id')->references('id')->on('portfolios')->onDelete('cascade');
                $table->unique(['portfolio_id', 'date']);
            });

            Schema::create('portfolio_coins_hour_history', function(Blueprint $table) {
                $table->increments('id');

                $table->unsignedInteger('portfolio_id');
                $table->dateTime('date');

                $table->decimal('btc_value', 25, 10);
                $table->decimal('usd_value', 25, 10);

                $table->foreign('portfolio_id')->references('id')->on('portfolios')->onDelete('cascade');
                $table->unique(['portfolio_id', 'date']);
            });

            Schema::create('portfolio_coins_day_history', function(Blueprint $table) {
                $table->increments('id');

                $table->unsignedInteger('portfolio_id');
                $table->date('date');

                $table->decimal('btc_value', 25, 10);
                $table->decimal('usd_value', 25, 10);

                $table->foreign('portfolio_id')->references('id')->on('portfolios')->onDelete('cascade');
                $table->unique(['portfolio_id', 'date']);
            });
        });
    }

    public function down()
    {
        DB::transaction(function() {
            Schema::dropIfExists('portfolio_coins_minute_history');
            Schema::dropIfExists('portfolio_coins_hour_history');
            Schema::dropIfExists('portfolio_coins_day_history');
        });
    }
}
