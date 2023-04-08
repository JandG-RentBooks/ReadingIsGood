<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookLanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Language::create([
            'name' => 'magyar',
        ]);

        Language::create([
            'name' => 'angol',
        ]);

        Language::create([
            'name' => 'német',
        ]);

        Language::create([
            'name' => 'spanyolol',
        ]);
    }
}
