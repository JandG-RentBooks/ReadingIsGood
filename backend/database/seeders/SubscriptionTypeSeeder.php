<?php

namespace Database\Seeders;

use App\Models\SubscriptionType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubscriptionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SubscriptionType::create([
            'book_number'        => 2,
            'description'       => 'Két könyv kölcsönzése egyszerre',
            'price'   => 2000,
        ]);

        SubscriptionType::create([
            'book_number'        => 4,
            'description'       => 'Négy könyv kölcsönzése egyszerre',
            'price'   => 4000,
        ]);

        SubscriptionType::create([
            'book_number'        => 6,
            'description'       => 'Hat könyv kölcsönzése egyszerre',
            'price'   => 6000,
        ]);


    }
}
