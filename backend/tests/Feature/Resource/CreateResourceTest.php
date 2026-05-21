<?php

use App\Models\Category;
use App\Models\Level;
use App\Models\Resource;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('should create resource with success', function () {
    $category = Category::factory()->create();
    $level = Level::factory()->create();

    $payload = [
        'name' => 'Rack A1',
        'unesc_id' => 'UNESC-0001',
        'status' => 'disponivel',
        'category_id' => $category->id,
        'level_id' => $level->id,
    ];

    $response = $this->postJson('/api/v1/resources', $payload);

    $response->assertStatus(201)
        ->assertJson([
            'success' => true,
            'message' => 'Resource created successfully'
        ])
        ->assertJsonStructure([
            'success',
            'message',
            'data' => [
                'id',
                'name',
                'unesc_id',
                'status',
                'level' => ['id', 'name'],
                'category' => ['id', 'name']
            ]
        ]);

    $this->assertDatabaseHas('resources', [
        'unesc_id' => 'UNESC-0001'
    ]);
});

test('should fail when level_id is missing', function () {
    $response = $this->postJson('/api/v1/resources', [
        'name' => 'Rack A1',
        'unesc_id' => 'UNESC-0001',
        'status' => 'disponivel',
        'category_id' => Category::factory()->create()->id,
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['level_id']);
});

test('should fail when level_id does not exist', function () {
    $response = $this->postJson('/api/v1/resources', [
        'name' => 'Rack A1',
        'unesc_id' => 'UNESC-0001',
        'status' => 'disponivel',
        'category_id' => Category::factory()->create()->id,
        'level_id' => 999
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['level_id']);
});

test('should fail when status is missing', function () {
    $response = $this->postJson('/api/v1/resources', [
        'name' => 'Rack A1',
        'unesc_id' => 'UNESC-0001',
        'category_id' => Category::factory()->create()->id,
        'level_id' => Level::factory()->create()->id,
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['status']);
});

test('should fail when status is invalid', function () {
    $response = $this->postJson('/api/v1/resources', [
        'name' => 'Rack A1',
        'unesc_id' => 'UNESC-0001',
        'status' => 'invalid_status',
        'category_id' => Category::factory()->create()->id,
        'level_id' => Level::factory()->create()->id,
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['status']);
});

test('should allow multiple resources in the same level', function () {
    $category = Category::factory()->create();
    $level = Level::factory()->create();

    $payload1 = [
        'name' => 'Rack A1',
        'unesc_id' => 'UNESC-0001',
        'status' => 'disponivel',
        'category_id' => $category->id,
        'level_id' => $level->id,
    ];

    $payload2 = [
        'name' => 'Rack A2',
        'unesc_id' => 'UNESC-0002',
        'status' => 'disponivel',
        'category_id' => $category->id,
        'level_id' => $level->id,
    ];

    $this->postJson('/api/v1/resources', $payload1)->assertStatus(201);
    $this->postJson('/api/v1/resources', $payload2)->assertStatus(201);

    $this->assertEquals(2, Resource::where('level_id', $level->id)->count());
});

test('should fail when required fields are missing', function () {
    $response = $this->postJson('/api/v1/resources', []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['name', 'unesc_id', 'status', 'category_id', 'level_id']);
});

test('should fail when unesc_id is not unique', function () {
    $resource = Resource::factory()->create(['unesc_id' => 'DUPLICATE']);

    $response = $this->postJson('/api/v1/resources', [
        'name' => 'Rack A1',
        'unesc_id' => 'DUPLICATE',
        'status' => 'disponivel',
        'category_id' => Category::factory()->create()->id,
        'level_id' => Level::factory()->create()->id,
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['unesc_id']);
});
