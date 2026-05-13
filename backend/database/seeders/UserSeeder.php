<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        DB::table('users')->insert([
            'id' => Str::uuid(),
            'name' => 'bigboyadmin',
            'email' => 'bigbadass@root.rules',
            'password' => Hash::make('rootrules1234'),
            'role_id' => 1,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
