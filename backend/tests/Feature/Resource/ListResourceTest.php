<?php

use App\Models\Resource;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('should return empty grouped list when no resources exist', function () {
    $levels = \App\Models\Level::factory()->count(3)->create();
    
    $response = $this->getJson('/api/v1/resources');

    $expectedData = [];
    foreach ($levels as $level) {
        $expectedData[$level->name] = [];
    }

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Resources retrieved successfully',
            'data' => $expectedData
        ]);
});

test('should return list of resources grouped by level name when they exist', function () {
    $levels = \App\Models\Level::factory()->count(2)->create();
    $resources = Resource::factory()->count(3)->create([
        'level_id' => $levels[0]->id
    ]);

    $response = $this->getJson('/api/v1/resources');

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Resources retrieved successfully'
        ])
        ->assertJsonCount(3, "data.{$levels[0]->name}")
        ->assertJsonCount(0, "data.{$levels[1]->name}")
        ->assertJsonStructure([
            'success',
            'message',
            'data' => [
                $levels[0]->name => [
                    '*' => [
                        'id',
                        'name',
                        'unesc_id',
                        'status',
                        'category_id',
                        'level_id',
                        'created_at',
                        'updated_at',
                        'deleted_at',
                        'level' => ['id', 'name'],
                        'category' => ['id', 'name']
                    ]
                ],
                $levels[1]->name => []
            ]
        ]);
});
