<?php

use App\Http\Enums\Roles;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(fn () => loginAs(Roles::ADMIN));

test('should return empty list when no categories exist', function () {
    $response = $this->getJson('/api/v1/categories');

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Categorias recuperadas com sucesso',
            'data' => []
        ]);
});

test('should list all categories with correct structure', function () {
    $initialCount = Category::count();
    Category::factory()->count(3)->create();

    $response = $this->getJson('/api/v1/categories');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'message',
            'data' => [
                '*' => ['id', 'name']
            ]
        ]);
    
    $response->assertJsonCount($initialCount + 3, 'data');
});
