<?php

use App\Models\User;
use App\Models\Level;
use App\Http\Enums\Roles;

test('authenticated user can list levels', function () {
    $user = User::factory()->create(['role_id' => Roles::STUDENT->value]);
    Level::factory()->count(3)->create();

    $response = $this->actingAs($user)->getJson('/api/v1/levels');

    $response->assertOk()
        ->assertJsonStructure([
            'success',
            'message',
            'data' => [
                '*' => ['id', 'name']
            ]
        ]);
});

test('unauthenticated user cannot list levels', function () {
    $response = $this->getJson('/api/v1/levels');

    $response->assertUnauthorized();
});
