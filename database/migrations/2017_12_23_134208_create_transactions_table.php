<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateTransactionsTable extends Migration
{
    public function up()
    {
        DB::transaction(function() {
            Schema::create('transactions', function (Blueprint $table) {
                $table->increments('id');
                $table->timestamps();

                $table->unsignedInteger('portfolio_id');

                // We'll use this to specify the transaction type. E.g. deposit, trade, withdrawal etc.
                // TODO: maybe make this an enum someday?
                $table->string('type');

                $table->unsignedInteger('out_coin_id')->nullable();
                $table->unsignedInteger('in_coin_id')->nullable();

                $table->decimal('out_amount', 25, 10)->nullable();
                $table->decimal('in_amount', 25, 10)->nullable();

                $table->foreign('out_coin_id')->references('id')->on('coins')->onDelete('cascade');
                $table->foreign('in_coin_id')->references('id')->on('coins')->onDelete('cascade');
                $table->foreign('portfolio_id')->references('id')->on('portfolios')->onDelete('cascade');

            });
        });
    }

    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
