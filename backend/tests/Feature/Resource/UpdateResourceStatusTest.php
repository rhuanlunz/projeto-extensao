<?php

use App\Models\Resource;
use App\Http\Enums\Roles;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('teacher should update resource status with success', function () {
    loginAs(Roles::TEACHER);
    $resource = Resource::factory()->create(['status' => 'disponivel']);

    $payload = [
        'status' => 'indisponivel',
    ];

    $response = $this->patchJson("/api/v1/resources/{$resource->id}/status", $payload);

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Status do recurso atualizado com sucesso'
        ]);

    $this->assertDatabaseHas('resources', [
        'id' => $resource->id,
        'status' => 'indisponivel'
    ]);
});

test('admin should update resource status with success', function () {
    loginAs(Roles::ADMIN);
    $resource = Resource::factory()->create(['status' => 'disponivel']);

    $payload = [
        'status' => 'indisponivel',
    ];

    $response = $this->patchJson("/api/v1/resources/{$resource->id}/status", $payload);

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Status do recurso atualizado com sucesso'
        ]);
});

test('student should NOT be able to update resource status (403)', function () {
    loginAs(Roles::STUDENT);
    $resource = Resource::factory()->create();

    $response = $this->patchJson("/api/v1/resources/{$resource->id}/status", ['status' => 'indisponivel']);

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.'
        ]);
});

test('unauthenticated user should NOT be able to update resource status (401)', function () {
    $resource = Resource::factory()->create();

    $response = $this->patchJson("/api/v1/resources/{$resource->id}/status", ['status' => 'indisponivel']);

    $response->assertStatus(401)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Usuário não autorizado.'
        ]);
});

test('should fail update status with invalid value', function () {
    loginAs(Roles::TEACHER);
    $resource = Resource::factory()->create();

    $response = $this->patchJson("/api/v1/resources/{$resource->id}/status", ['status' => 'invalid_status']);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Erro de validação'
        ])
        ->assertJsonValidationErrors(['status']);
});

test('should fail update status when resource does not exist (404)', function () {
    loginAs(Roles::TEACHER);

    $response = $this->patchJson("/api/v1/resources/999/status", ['status' => 'indisponivel']);

    $response->assertStatus(404)
        ->assertJson([
            'success' => false,
            'message' => 'Registro não encontrado'
        ]);
});

test('patch status should NOT allow updating other fields', function () {
    loginAs(Roles::TEACHER);
    $resource = Resource::factory()->create(['name' => 'Original Name']);

    $payload = [
        'status' => 'indisponivel',
        'name' => 'Injected Name'
    ];

    $response = $this->patchJson("/api/v1/resources/{$resource->id}/status", $payload);

    $response->assertStatus(200);
    
    $this->assertDatabaseHas('resources', [
        'id' => $resource->id,
        'name' => 'Original Name',
        'status' => 'indisponivel'
    ]);
});
