<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    use WithoutModelEvents;
    
    public function run(): void
    {
        DB::table('roles')->insert([
            'id' => 1,
            'name' => 'admin'
        ]);

        DB::table('roles')->insert([
            'id' => 2,
            'name' => 'teacher'
        ]);

        DB::table('roles')->insert([
            'id' => 3,
            'name' => 'student'
        ]);
    }
}
