<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Sala de Aula'],
            ['name' => 'Laboratório'],
            ['name' => 'Auditório'],
            ['name' => 'Gabinete'],
            ['name' => 'Sala de Reunião'],
            ['name' => 'Espaço Comum'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate($category);
        }
    }
}
