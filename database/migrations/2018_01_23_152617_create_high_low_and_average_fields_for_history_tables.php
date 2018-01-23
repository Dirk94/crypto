<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateHighLowAndAverageFieldsForHistoryTables extends Migration
{
    public function up()
    {
        DB::transaction(function() {
            Schema::table('coin_day_history', function(Blueprint $table) {
                $table->decimal('btc_value_high', 20, 10);
                $table->decimal('btc_value_low', 20, 10);

                $table->decimal('usd_value_high', 25, 10);
                $table->decimal('usd_value_low', 25, 10);
            });

            Schema::table('coin_hour_history', function(Blueprint $table) {
                $table->decimal('btc_value_high', 20, 10);
                $table->decimal('btc_value_low', 20, 10);

                $table->decimal('usd_value_high', 25, 10);
                $table->decimal('usd_value_low', 25, 10);
            });

            Schema::table('portfolio_coins_day_history', function(Blueprint $table) {
                $table->decimal('btc_value_high', 20, 10);
                $table->decimal('btc_value_low', 20, 10);

                $table->decimal('usd_value_high', 25, 10);
                $table->decimal('usd_value_low', 25, 10);
            });

            Schema::table('portfolio_coins_hour_history', function(Blueprint $table) {
                $table->decimal('btc_value_high', 20, 10);
                $table->decimal('btc_value_low', 20, 10);

                $table->decimal('usd_value_high', 25, 10);
                $table->decimal('usd_value_low', 25, 10);
            });
        });
    }

    public function down()
    {
        DB::transaction(function() {
            Schema::table('coin_day_history', function(Blueprint $table) {
                $table->dropColumn('btc_value_high');
                $table->dropColumn('btc_value_low');

                $table->dropColumn('usd_value_high');
                $table->dropColumn('usd_value_low');
            });

            Schema::table('coin_hour_history', function(Blueprint $table) {
                $table->dropColumn('btc_value_high');
                $table->dropColumn('btc_value_low');

                $table->dropColumn('usd_value_high');
                $table->dropColumn('usd_value_low');
            });

            Schema::table('portfolio_coins_day_history', function(Blueprint $table) {
                $table->dropColumn('btc_value_high');
                $table->dropColumn('btc_value_low');

                $table->dropColumn('usd_value_high');
                $table->dropColumn('usd_value_low');
            });

            Schema::table('portfolio_coins_hour_history', function(Blueprint $table) {
                $table->dropColumn('btc_value_high');
                $table->dropColumn('btc_value_low');

                $table->dropColumn('usd_value_high');
                $table->dropColumn('usd_value_low');
            });
        });
    }
}
