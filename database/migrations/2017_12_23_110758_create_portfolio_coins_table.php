<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePortfolioCoinsTable extends Migration
{
    public function up()
    {
        Schema::create('portfolio_coins', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->unsignedInteger('portfolio_id');
            $table->unsignedInteger('coin_id');
            $table->decimal('amount', 20, 10)->default(0);

            $table->foreign('portfolio_id')->references('id')->on('portfolios')->onDelete('cascade');
            $table->foreign('coin_id')->references('id')->on('coins')->onDelete('cascade');

            $table->unique(['portfolio_id', 'coin_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('portfolio_coins');
    }
}
