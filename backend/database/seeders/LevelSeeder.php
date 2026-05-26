<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Level;

class LevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $levels = [
            ['name' => 'Térreo'],
            ['name' => '1º Andar'],
            ['name' => '2º Andar'],
            ['name' => '3º Andar'],
        ];

        foreach ($levels as $level) {
            Level::firstOrCreate($level);
        }
    }
}
