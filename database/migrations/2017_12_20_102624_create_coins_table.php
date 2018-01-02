<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCoinsTable extends Migration
{
    public function up()
    {
        Schema::create('coins', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->string('name');
            $table->string('api_name');

            $table->string('symbol');
            $table->unsignedInteger('rank');

            $table->unsignedDecimal('btc_value', 20, 10);

            $table->unsignedDecimal('usd_value', 25, 10);
            $table->unsignedDecimal('usd_24h_volume', 25, 10);
            $table->unsignedDecimal('usd_market_cap', 25, 10);

            $table->unsignedDecimal('available_supply', 25, 10);
            $table->unsignedDecimal('total_supply', 25, 10);
            $table->unsignedDecimal('max_supply', 25, 10);

            $table->decimal('percentage_change_1h', 15, 4);
            $table->decimal('percentage_change_24h', 15, 4);
            $table->decimal('percentage_change_7d', 15, 4);
        });
    }

    public function down()
    {
        Schema::dropIfExists('coins');
    }
}
