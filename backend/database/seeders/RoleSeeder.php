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
        DB::table('roles')->updateOrInsert(['id' => 1], ['name' => 'admin']);
        DB::table('roles')->updateOrInsert(['id' => 2], ['name' => 'teacher']);
        DB::table('roles')->updateOrInsert(['id' => 3], ['name' => 'student']);
    }
}
