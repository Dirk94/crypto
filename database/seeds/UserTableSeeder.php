<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class UserTableSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Dirk Hoekstra',
            'email' => 'dirkhoekstra@gmail.com',
            'password' => 'test',
        ]);
        User::create([
            'name' => 'Sjaak Kampwagen',
            'email' => 'sjaakkampwagen@gmail.com',
            'password' => 'test',
        ]);
    }
}
