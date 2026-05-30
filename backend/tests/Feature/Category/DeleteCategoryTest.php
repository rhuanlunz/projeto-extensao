<?php

use App\Http\Enums\Roles;
use App\Models\Category;
use App\Models\Level;
use App\Models\Resource;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(fn () => loginAs(Roles::ADMIN));

test('should delete category with success', function () {
    $category = Category::factory()->create();

    $response = $this->deleteJson("/api/v1/categories/{$category->id}");

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Categoria excluída com sucesso'
        ]);

    $this->assertDatabaseMissing('categories', [
        'id' => $category->id
    ]);
});

test('should return 404 when deleting non-existent category', function () {
    $response = $this->deleteJson('/api/v1/categories/999');

    $response->assertStatus(404)
        ->assertJson([
            'success' => false,
            'message' => 'Registro não encontrado'
        ]);
});

test('should fail to delete category with linked resources (RN06)', function () {
    $category = Category::factory()->create();
    $level = Level::factory()->create();
    Resource::factory()->create([
        'category_id' => $category->id,
        'level_id' => $level->id
    ]);

    $response = $this->deleteJson("/api/v1/categories/{$category->id}");

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Erro de validação',
            'errors' => [
                'category' => ['Não é possível excluir uma categoria que possui recursos vinculados.']
            ]
        ]);

    $this->assertDatabaseHas('categories', [
        'id' => $category->id
    ]);
});
