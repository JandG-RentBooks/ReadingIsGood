<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'payment_id' => 'Qwre5Tre',
            'name' => 'Petőcz József',
            'email' => 'petocz.jozsef@gmail.com',
            'password' => bcrypt('secret'),
            'address' => '9012 Győr, Hármashatár út 20.',
            'is_active' => 1,
        ]);

        User::create([
            'payment_id' => 'Dwre5Tre',
            'name' => 'Teszt Felhasználó 1',
            'email' => 'teszt1@gmail.com',
            'password' => bcrypt('secret'),
            'address' => '9012 Győr, Kispipacs út 13.',
            'is_active' => 1,
        ]);

        User::create([
            'payment_id' => 'gwre5Tre',
            'name' => 'Teszt Felhasználó 2',
            'email' => 'teszt2@gmail.com',
            'password' => bcrypt('secret'),
            'address' => '9012 Győr, Petőfi utca 13.',
            'is_active' => 0,
        ]);

        User::create([
            'payment_id' => 'Drre5Tre',
            'name' => 'Dolgozó 1',
            'email' => 'dolgozo1.@gmail.com',
            'password' => bcrypt('secret'),
            'is_active' => 1,
        ]);


    }
}
