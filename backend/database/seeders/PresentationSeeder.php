<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Level;
use App\Models\Resource;
use App\Models\Setting;
use App\Models\User;
use App\Http\Enums\Roles;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PresentationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Structural Data
        $this->call([
            RoleSeeder::class,
            LevelSeeder::class,
        ]);

        // 2. Presentation Users
        User::updateOrCreate(['email' => 'admin@projeto.com'], [
            'name' => 'Administrador',
            'password' => Hash::make('password'),
            'role_id' => Roles::ADMIN->value,
        ]);

        User::updateOrCreate(['email' => 'professor@projeto.com'], [
            'name' => 'Professor de Teste',
            'password' => Hash::make('password'),
            'role_id' => Roles::TEACHER->value,
        ]);

        User::updateOrCreate(['email' => 'aluno@projeto.com'], [
            'name' => 'Aluno de Teste',
            'password' => Hash::make('password'),
            'role_id' => Roles::STUDENT->value,
        ]);

        // 3. Settings
        Setting::updateOrCreate(['key' => 'request_email'], ['value' => 'admin@projeto.com']);

        // 4. Categories
        $catRacks = Category::updateOrCreate(['name' => 'Racks']);
        $catSalas = Category::updateOrCreate(['name' => 'Salas']);
        $catExtintores = Category::updateOrCreate(['name' => 'Extintores']);
        $catCameras = Category::updateOrCreate(['name' => 'Câmeras']);

        // Levels (Floors)
        $level1 = Level::where('name', '1º Andar')->first()->id;
        $level2 = Level::where('name', '2º Andar')->first()->id;
        $level3 = Level::where('name', '3º Andar')->first()->id;

        // 5. Resources: RACKS (Total 10)
        $this->seedRacks($catRacks->id, $level1, $level2, $level3);

        // 6. Resources: SALAS (Total 24 - 8 por andar)
        $this->seedSalas($catSalas->id, $level1, $level2, $level3);

        // 7. Resources: EXTINTORES (Total 15 - Heterogêneo: 6, 5, 4)
        $this->seedExtintores($catExtintores->id, $level1, $level2, $level3);

        // 8. Resources: CÂMERAS (Total 12 - Heterogêneo: 5, 4, 3)
        $this->seedCameras($catCameras->id, $level1, $level2, $level3);
    }

    private function seedRacks($catId, $l1, $l2, $l3)
    {
        // 1º Andar: 2 racks
        for ($i = 1; $i <= 2; $i++) {
            Resource::updateOrCreate(['name' => "Rack $i"], [
                'unesc_id' => 'RCK-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'description' => "Corredor " . ($i % 2 == 0 ? "2" : "1"),
                'status' => 'disponivel',
                'category_id' => $catId,
                'level_id' => $l1,
            ]);
        }
        // 2º Andar: 6 racks (Rack 3 a 8)
        for ($i = 3; $i <= 8; $i++) {
            Resource::updateOrCreate(['name' => "Rack $i"], [
                'unesc_id' => 'RCK-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'description' => "Corredor " . ($i % 2 == 0 ? "2" : "1"),
                'status' => ($i == 7) ? 'indisponivel' : 'disponivel',
                'category_id' => $catId,
                'level_id' => $l2,
            ]);
        }
        // 3º Andar: 2 racks (Rack 9 e 10)
        for ($i = 9; $i <= 10; $i++) {
            Resource::updateOrCreate(['name' => "Rack $i"], [
                'unesc_id' => 'RCK-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'description' => "Corredor " . ($i % 2 == 0 ? "2" : "1"),
                'status' => 'disponivel',
                'category_id' => $catId,
                'level_id' => $l3,
            ]);
        }
    }

    private function seedSalas($catId, $l1, $l2, $l3)
    {
        $floors = [
            $l1 => '1',
            $l2 => '2',
            $l3 => '3'
        ];

        foreach ($floors as $levelId => $prefix) {
            // Corredor 1 (Pares)
            foreach ([2, 4, 6, 8] as $num) {
                $name = "B{$prefix}0{$num}";
                Resource::updateOrCreate(['name' => $name], [
                    'unesc_id' => "SLA-{$name}",
                    'description' => "Corredor 1 (Pares)",
                    'status' => ($name === 'B205') ? 'indisponivel' : 'disponivel',
                    'category_id' => $catId,
                    'level_id' => $levelId,
                ]);
            }
            // Corredor 2 (Ímpares)
            foreach ([1, 3, 5, 7] as $num) {
                $name = "B{$prefix}0{$num}";
                Resource::updateOrCreate(['name' => $name], [
                    'unesc_id' => "SLA-{$name}",
                    'description' => "Corredor 2 (Ímpares)",
                    'status' => ($name === 'B205') ? 'indisponivel' : 'disponivel',
                    'category_id' => $catId,
                    'level_id' => $levelId,
                ]);
            }
        }
    }

    private function seedExtintores($catId, $l1, $l2, $l3)
    {
        $types = ['Água Pressurizada', 'Pó Químico (BC)', 'CO2'];
        
        // Distribuição Heterogênea: 6 no 1º andar, 5 no 2º andar, 4 no 3º andar.
        $distribution = [
            $l1 => [1, 2, 3, 4, 5, 6],
            $l2 => [7, 8, 9, 10, 11],
            $l3 => [12, 13, 14, 15]
        ];

        foreach ($distribution as $levelId => $ids) {
            foreach ($ids as $i) {
                Resource::updateOrCreate(['name' => "Extintor $i"], [
                    'unesc_id' => 'EXT-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                    'description' => $types[($i - 1) % 3],
                    'status' => ($i == 4 || $i == 13) ? 'indisponivel' : 'disponivel',
                    'category_id' => $catId,
                    'level_id' => $levelId,
                ]);
            }
        }
    }

    private function seedCameras($catId, $l1, $l2, $l3)
    {
        // Distribuição Heterogênea: 5 no 1º andar, 4 no 2º andar, 3 no 3º andar.
        $distribution = [
            $l1 => [1, 2, 3, 4, 5],
            $l2 => [6, 7, 8, 9],
            $l3 => [10, 11, 12]
        ];

        foreach ($distribution as $levelId => $ids) {
            foreach ($ids as $i) {
                Resource::updateOrCreate(['name' => "Câmera $i"], [
                    'unesc_id' => 'CAM-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                    'description' => "Corredor principal",
                    'status' => ($i == 2 || $i == 8) ? 'indisponivel' : 'disponivel',
                    'category_id' => $catId,
                    'level_id' => $levelId,
                ]);
            }
        }
    }
}
