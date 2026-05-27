<?php

use App\Models\Category;
use App\Models\Level;
use App\Models\Resource;
use App\Http\Enums\Roles;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(fn () => loginAs(Roles::ADMIN));

test('should update resource with success', function () {
    $resource = Resource::factory()->create();
    $new_category = Category::factory()->create();
    $new_level = Level::factory()->create();

    $payload = [
        'name' => 'Updated Name',
        'unesc_id' => $resource->unesc_id, // Keeping same ID
        'status' => 'indisponivel',
        'category_id' => $new_category->id,
        'level_id' => $new_level->id,
    ];

    $response = $this->putJson("/api/v1/resources/{$resource->id}", $payload);

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Recurso atualizado com sucesso'
        ]);

    $this->assertDatabaseHas('resources', [
        'id' => $resource->id,
        'name' => 'Updated Name',
        'status' => 'indisponivel'
    ]);
});

test('should fail update when resource does not exist', function () {
    $payload = [
        'name' => 'Updated Name',
        'unesc_id' => 'NEW-ID',
        'status' => 'indisponivel',
        'category_id' => Category::factory()->create()->id,
        'level_id' => Level::factory()->create()->id,
    ];

    $response = $this->putJson("/api/v1/resources/999", $payload);

    $response->assertStatus(404)
        ->assertJson([
            'success' => false,
            'message' => 'Registro não encontrado'
        ]);
});

test('should fail update with invalid status', function () {
    $resource = Resource::factory()->create();

    $payload = [
        'name' => 'Updated Name',
        'unesc_id' => $resource->unesc_id,
        'status' => 'invalid_status',
        'category_id' => $resource->category_id,
        'level_id' => $resource->level_id,
    ];

    $response = $this->putJson("/api/v1/resources/{$resource->id}", $payload);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Erro de validação'
        ])
        ->assertJsonValidationErrors(['status']);
});

test('should fail update with duplicate unesc_id belonging to another resource', function () {
    $resource1 = Resource::factory()->create(['unesc_id' => 'ID-1']);
    $resource2 = Resource::factory()->create(['unesc_id' => 'ID-2']);

    $payload = [
        'name' => 'Updated Name',
        'unesc_id' => 'ID-2', // Trying to use ID-2 which belongs to resource2
        'status' => 'disponivel',
        'category_id' => $resource1->category_id,
        'level_id' => $resource1->level_id,
    ];

    $response = $this->putJson("/api/v1/resources/{$resource1->id}", $payload);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Erro de validação'
        ])
        ->assertJsonValidationErrors(['unesc_id']);
});

