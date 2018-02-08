<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTransactionAtField extends Migration
{
    public function up()
    {
        Schema::table('transactions', function(Blueprint $table) {
            $table->timestamp('transaction_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->boolean('processed')->default(false);
            $table->boolean('deleted')->default(false);
        });
    }

    public function down()
    {
        Schema::table('transactions', function(Blueprint $table) {
            $table->dropColumn('transaction_at');
            $table->dropColumn('processed');
            $table->dropColumn('deleted');
        });
    }
}
