<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Level;
use App\Models\Resource;
use App\Models\User;
use App\Http\Enums\Roles;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DevelopmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Trava determinística: Verifica entidade âncora (professor de teste)
        $anchorEmail = 'professor@teste.com';
        
        if (User::where('email', $anchorEmail)->exists()) {
            $this->command->info('Massa de dados de desenvolvimento já populada (âncora encontrada). Pulando execução.');
            return;
        }

        // 1. Cria usuários fakes com senhas explícitas para facilitar DX
        User::factory()->create([
            'name' => 'Admin Teste',
            'email' => 'admin@teste.com',
            'password' => Hash::make('password'),
            'role_id' => Roles::ADMIN->value,
        ]);

        User::factory()->create([
            'name' => 'Professor Teste',
            'email' => $anchorEmail,
            'password' => Hash::make('password'),
            'role_id' => Roles::TEACHER->value,
        ]);

        User::factory()->create([
            'name' => 'Aluno Teste',
            'email' => 'aluno@teste.com',
            'password' => Hash::make('password'),
            'role_id' => Roles::STUDENT->value,
        ]);

        // 2. Cria recursos fakes para cada combinação de andar/categoria
        $categories = Category::all();
        $levels = Level::all();

        if ($categories->isEmpty() || $levels->isEmpty()) {
            $this->command->warn('Categorias ou Níveis não encontrados. Certifique-se de rodar os seeds estruturais primeiro.');
            return;
        }

        foreach ($categories as $category) {
            foreach ($levels as $level) {
                // Create 1-3 resources for each combination
                $count = rand(1, 3);
                Resource::factory()->count($count)->create([
                    'category_id' => $category->id,
                    'level_id' => $level->id,
                ]);
            }
        }

        $this->command->info('Dados de desenvolvimento processados com sucesso!');
    }
}
