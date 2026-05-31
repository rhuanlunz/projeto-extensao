<?php

use App\Http\Enums\Roles;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(fn () => loginAs(Roles::ADMIN));

test('should create category with success', function () {
    $payload = ['name' => 'Nova Categoria'];

    $response = $this->postJson('/api/v1/categories', $payload);

    $response->assertStatus(201)
        ->assertJson([
            'success' => true,
            'message' => 'Categoria criada com sucesso'
        ])
        ->assertJsonStructure([
            'success',
            'message',
            'data' => ['id', 'name']
        ]);

    $this->assertDatabaseHas('categories', [
        'name' => 'Nova Categoria'
    ]);
});

test('should sanitize name using trim', function () {
    $payload = ['name' => '  Categoria Com Espaço  '];

    $response = $this->postJson('/api/v1/categories', $payload);

    $response->assertStatus(201);
    
    $this->assertDatabaseHas('categories', [
        'name' => 'Categoria Com Espaço'
    ]);
});

test('should fail when name is missing', function () {
    $response = $this->postJson('/api/v1/categories', []);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Erro de validação'
        ])
        ->assertJsonValidationErrors(['name']);
});

test('should fail when name is too long', function () {
    $payload = ['name' => str_repeat('a', 256)];

    $response = $this->postJson('/api/v1/categories', $payload);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['name']);
});
