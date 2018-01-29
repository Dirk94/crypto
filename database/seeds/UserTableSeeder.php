<?php

use Illuminate\Database\Seeder;
use App\Common\Helpers\Permissions;
use App\Models\User;
use App\Models\Portfolio;

class UserTableSeeder extends Seeder
{
    public function run()
    {
        $user1 = User::create([
            'name' => 'Dirk Hoekstra',
            'email' => 'dirkhoekstra@gmail.com',
            'password' => 'test',
        ]);

        $portfolio1 = Portfolio::create([
            'name' => 'Default portfolio'
        ]);

        $user1->portfolios()->attach($portfolio1, [
            'permissions' => Permissions::OWNER,
        ]);


        $user2 = User::create([
            'name' => 'Sjaak Kampwagen',
            'email' => 'sjaakkampwagen@gmail.com',
            'password' => 'test',
        ]);

        $portfolio2 = Portfolio::create([
            'name' => 'Default portfolio'
        ]);

        $user2->portfolios()->attach($portfolio2, [
            'permissions' => Permissions::OWNER,
        ]);
    }
}
