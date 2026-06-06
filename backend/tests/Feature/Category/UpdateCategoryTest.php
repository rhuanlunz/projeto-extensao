<?php

use App\Http\Enums\Roles;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(fn () => loginAs(Roles::ADMIN));

test('should update category with success', function () {
    $category = Category::factory()->create(['name' => 'Nome Original']);
    $payload = ['name' => 'Nome Atualizado'];

    $response = $this->putJson("/api/v1/categories/{$category->id}", $payload);

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Categoria atualizada com sucesso',
            'data' => [
                'id' => $category->id,
                'name' => 'Nome Atualizado'
            ]
        ]);

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => 'Nome Atualizado'
    ]);
});

test('should return 404 when updating non-existent category', function () {
    $response = $this->putJson('/api/v1/categories/999', ['name' => 'Teste']);

    $response->assertStatus(404)
        ->assertJson([
            'success' => false,
            'message' => 'Registro não encontrado'
        ]);
});

test('should fail update when name is missing', function () {
    $category = Category::factory()->create();

    $response = $this->putJson("/api/v1/categories/{$category->id}", []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['name']);
});
