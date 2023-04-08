<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            'name'        => 'Admin',
            'description'       => 'Teljes hozzáférés',
            'reference'    => 'admin',
        ]);

        Role::create([
            'name'        => 'Felhasználó',
            'description'       => 'Admin felület nem engedélyezett',
            'reference'    => 'user',
        ]);

        Role::create([
            'name'        => 'Employee',
            'description'       => 'Admin felület kölcsönzéssel kapcsolatos része',
            'reference'    => 'employee',
        ]);

    }
}
