<?php

use App\Common\Helpers\Permissions;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreatePortfolios extends Migration
{
    public function up()
    {
        DB::transaction(function() {
            Schema::create('portfolios', function(Blueprint $table) {
                $table->increments('id');
                $table->timestamps();

                $table->string('name');
                $table->decimal('btc_value', 25, 10)->default(0);
                $table->decimal('usd_value', 25, 10)->default(0);
            });

            Schema::create('portfolio_user', function(Blueprint $table) {
                $table->increments('id');

                $table->unsignedInteger('portfolio_id');
                $table->unsignedInteger('user_id');

                $table->enum('permissions', [
                    Permissions::READ ,
                    Permissions::WRITE,
                    Permissions::OWNER,
                ])->default(Permissions::READ);

                $table->foreign('portfolio_id')
                    ->references('id')
                    ->on('portfolios')
                    ->onDelete('cascade');

                $table->foreign('user_id')
                    ->references('id')
                    ->on('users')
                    ->onDelete('cascade');

                $table->unique(['user_id', 'portfolio_id']);
            });
        });
    }

    public function down()
    {
        Schema::dropIfExists('portfolio_user');
        Schema::dropIfExists('portfolios');
    }
}
