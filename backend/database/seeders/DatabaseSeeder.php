<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            SubscriptionTypeSeeder::class,
            UserSeeder::class,
            RoleSeeder::class,
            UserRoleSeeder::class,
            BookLanguageSeeder::class,
            CoverTypeSeeder::class,
            CategorySeeder::class,
            LabelSeeder::class,
            AuthorSeeder::class,
        ]);
    }
}
