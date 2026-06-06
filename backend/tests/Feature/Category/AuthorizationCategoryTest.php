<?php

use App\Http\Enums\Roles;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('should return 401 when accessing categories without authentication', function () {
    $response = $this->getJson('/api/v1/categories');

    $response->assertStatus(401)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Usuário não autorizado.'
        ]);
});

test('should return 403 when student tries to create a category', function () {
    loginAs(Roles::STUDENT);

    $response = $this->postJson('/api/v1/categories', ['name' => 'Nova Categoria']);

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.'
        ]);
});

test('should return 403 when student tries to update a category', function () {
    loginAs(Roles::STUDENT);
    $category = Category::factory()->create();

    $response = $this->putJson("/api/v1/categories/{$category->id}", ['name' => 'Nome Atualizado']);

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.'
        ]);
});

test('should return 403 when student tries to delete a category', function () {
    loginAs(Roles::STUDENT);
    $category = Category::factory()->create();

    $response = $this->deleteJson("/api/v1/categories/{$category->id}");

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.'
        ]);
});

test('should return 403 when teacher tries to create a category', function () {
    loginAs(Roles::TEACHER);

    $response = $this->postJson('/api/v1/categories', ['name' => 'Nova Categoria']);

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.'
        ]);
});

test('should return 403 when teacher tries to update a category', function () {
    loginAs(Roles::TEACHER);
    $category = Category::factory()->create();

    $response = $this->putJson("/api/v1/categories/{$category->id}", ['name' => 'Nome Atualizado']);

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.'
        ]);
});

test('should return 403 when teacher tries to delete a category', function () {
    loginAs(Roles::TEACHER);
    $category = Category::factory()->create();

    $response = $this->deleteJson("/api/v1/categories/{$category->id}");

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.'
        ]);
});

test('should allow student and teacher to access list categories', function () {
    loginAs(Roles::STUDENT);
    $this->getJson('/api/v1/categories')->assertStatus(200);

    loginAs(Roles::TEACHER);
    $this->getJson('/api/v1/categories')->assertStatus(200);
});
