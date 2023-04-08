<?php

namespace Database\Seeders;

use App\Models\CoverType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CoverTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CoverType::create([
            'name' => 'Keménykötésű',
        ]);

        CoverType::create([
            'name' => 'Puhakötésű',
        ]);
    }
}
