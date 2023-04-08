<?php

namespace Database\Seeders;

use App\Models\FrontPage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FrontPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        FrontPage::create([
            'reference' => 'about-as',
            'content' => 'Rólunk oldal tartalma',
        ]);
        FrontPage::create([
            'reference' => 'faq',
            'content' => 'Gyik tartalma',
        ]);
        FrontPage::create([
            'reference' => 'how-lending',
            'content' => 'Kölcsönzés menete tartalma',
        ]);
        FrontPage::create([
            'reference' => 'references',
            'content' => 'Referenciák moderálási figyelmeztető',
        ]);
        FrontPage::create([
            'reference' => 'subscription',
            'content' => 'Előfizetés oldal tartalma',
        ]);
    }
}
