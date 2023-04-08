<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create([
            'parent_id' => null,
            'name' => 'Szépirodalom'
        ]);
        Category::create([
            'parent_id' => 1,
            'name' => 'Felnőttirodalom'
        ]);
        Category::create([
            'parent_id' => 1,
            'name' => 'Gyerekirodalom'
        ]);
        Category::create([
            'parent_id' => 1,
            'name' => 'Ifjúsági irodalom'
        ]);
        Category::create([
            'parent_id' => 1,
            'name' => 'Idegen nyelvű'
        ]);
        Category::create([
            'parent_id' => 1,
            'name' => 'Sci-fi'
        ]);
        Category::create([
            'parent_id' => 1,
            'name' => 'Fantasy'
        ]);
        Category::create([
            'parent_id' => 1,
            'name' => 'Krimi'
        ]);


        Category::create([
            'parent_id' => null,
            'name' => 'Ismeretterjesztő'
        ]);
        Category::create([
            'parent_id' => 9,
            'name' => 'Természettudomány'
        ]);
        Category::create([
            'parent_id' => 9,
            'name' => 'Társadalomtudomány'
        ]);
        Category::create([
            'parent_id' => 9,
            'name' => 'Szakácskönyvek'
        ]);
        Category::create([
            'parent_id' => 9,
            'name' => 'Sport'
        ]);
        Category::create([
            'parent_id' => 9,
            'name' => 'Ezotéria'
        ]);
        Category::create([
            'parent_id' => 9,
            'name' => 'Történelem, politika'
        ]);
        Category::create([
            'parent_id' => 9,
            'name' => 'Mitológia, vallás'
        ]);
        Category::create([
            'parent_id' => 9,
            'name' => 'Lexikonok'
        ]);
        Category::create([
            'parent_id' => 9,
            'name' => 'Térképek, útikönyvek'
        ]);

    }
}
