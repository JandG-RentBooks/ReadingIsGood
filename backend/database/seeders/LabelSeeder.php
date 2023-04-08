<?php

namespace Database\Seeders;

use App\Models\Label;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LabelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Label::create([
           'name' => 'izgalmas'
        ]);
        Label::create([
           'name' => 'romantikus'
        ]);
        Label::create([
           'name' => 'kasszasiker'
        ]);
        Label::create([
           'name' => 'filmadaptáció'
        ]);
        Label::create([
           'name' => 'féfiaknak'
        ]);
        Label::create([
            'name' => 'tini'
        ]);

    }
}
