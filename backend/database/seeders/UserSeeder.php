<?php

namespace Database\Seeders;

use App\Http\Enums\Roles;
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
        $email = 'yedej85479@marineso.com';
        
        if (!DB::table('users')->where('email', $email)->exists()) {
            DB::table('users')->insert([
                'id' => Str::uuid(),
                'name' => 'bigboyadmin',
                'email' => $email,
                'password' => Hash::make('rootrules1234'),
                'role_id' => Roles::ADMIN->value,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
