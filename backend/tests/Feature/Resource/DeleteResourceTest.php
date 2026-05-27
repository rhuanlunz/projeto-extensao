<?php

use App\Models\Resource;
use App\Http\Enums\Roles;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(fn () => loginAs(Roles::ADMIN));

test('should delete resource with success (soft delete)', function () {
    $resource = Resource::factory()->create();

    $response = $this->deleteJson("/api/v1/resources/{$resource->id}");

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Recurso excluído com sucesso'
        ]);

    $this->assertSoftDeleted('resources', [
        'id' => $resource->id
    ]);
});

test('should fail delete when resource does not exist', function () {
    $response = $this->deleteJson("/api/v1/resources/999");

    $response->assertStatus(404)
        ->assertJson([
            'success' => false,
            'message' => 'Registro não encontrado'
        ]);
});
