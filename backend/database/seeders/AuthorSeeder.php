<?php

namespace Database\Seeders;

use App\Models\Author;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AuthorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Author::create([
            'name' => 'J. K. Rowling',
            'birthday' => '1965',
        ]);

        Author::create([
            'name' => 'Andrzej Sapkowski',
            'birthday' => '1948',
        ]);

        Author::create([
            'name' => 'J. R. R. Tolkien',
            'birthday' => '1892',
        ]);

        Author::create([
            'name' => 'Isaac Asimov',
            'birthday' => '1920',
        ]);
    }
}
