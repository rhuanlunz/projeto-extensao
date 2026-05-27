<?php

use App\Http\Enums\Roles;
use App\Models\Category;
use App\Models\Level;
use App\Models\Resource;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('should return 401 when accessing resources without authentication', function () {
    $response = $this->getJson('/api/v1/resources');

    $response->assertStatus(401)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Usuário não autorizado.'
        ]);
});

test('should return 403 when student tries to create a resource', function () {
    loginAs(Roles::STUDENT);

    $payload = [
        'name' => 'Rack A1',
        'unesc_id' => 'UNESC-0001',
        'status' => 'disponivel',
        'category_id' => Category::factory()->create()->id,
        'level_id' => Level::factory()->create()->id,
    ];

    $response = $this->postJson('/api/v1/resources', $payload);

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.'
        ]);
});

test('should return 403 when student tries to update a resource', function () {
    loginAs(Roles::STUDENT);
    $resource = Resource::factory()->create();

    $payload = [
        'name' => 'Updated Name',
        'unesc_id' => $resource->unesc_id,
        'status' => 'indisponivel',
        'category_id' => $resource->category_id,
        'level_id' => $resource->level_id,
    ];

    $response = $this->putJson("/api/v1/resources/{$resource->id}", $payload);

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.'
        ]);
});

test('should return 403 when teacher tries to delete a resource', function () {
    loginAs(Roles::TEACHER);
    $resource = Resource::factory()->create();

    $response = $this->deleteJson("/api/v1/resources/{$resource->id}");

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.'
        ]);
});

test('should return 403 when teacher tries to create a resource', function () {
    loginAs(Roles::TEACHER);

    $payload = [
        'name' => 'Rack A1',
        'unesc_id' => 'UNESC-0001',
        'status' => 'disponivel',
        'category_id' => Category::factory()->create()->id,
        'level_id' => Level::factory()->create()->id,
    ];

    $response = $this->postJson('/api/v1/resources', $payload);

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.'
        ]);
});

test('should return 403 when teacher tries to update a resource', function () {
    loginAs(Roles::TEACHER);
    $resource = Resource::factory()->create(['name' => 'Original Name']);

    $payload = [
        'name' => 'Updated Name',
        'unesc_id' => $resource->unesc_id,
        'status' => 'indisponivel',
        'category_id' => $resource->category_id,
        'level_id' => $resource->level_id,
    ];

    $response = $this->putJson("/api/v1/resources/{$resource->id}", $payload);

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.'
        ]);

    $this->assertDatabaseHas('resources', [
        'id' => $resource->id,
        'name' => 'Original Name'
    ]);
});
