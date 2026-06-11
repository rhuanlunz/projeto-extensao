<?php

use App\Models\User;
use App\Models\Role;
use App\Http\Enums\Roles;
use Illuminate\Support\Facades\DB;

beforeEach(function () {
    // Seed roles if they don't exist (assuming SQLITE in memory for tests)
    if (Role::count() === 0) {
        Role::create(['id' => 1, 'name' => 'admin']);
        Role::create(['id' => 2, 'name' => 'teacher']);
        Role::create(['id' => 3, 'name' => 'student']);
    }
});

test('admin can list users', function () {
    $admin = User::factory()->create(['role_id' => Roles::ADMIN->value]);
    User::factory()->count(3)->create();

    $response = $this->actingAs($admin)->getJson('/api/v1/users');

    $response->assertOk()
        ->assertJsonStructure([
            'success',
            'message',
            'data' => [
                '*' => ['id', 'name', 'email', 'role_id', 'role', 'created_at']
            ]
        ]);
});

test('admin can update user role', function () {
    $admin = User::factory()->create(['role_id' => Roles::ADMIN->value]);
    $student = User::factory()->create(['role_id' => Roles::STUDENT->value]);

    $response = $this->actingAs($admin)->patchJson("/api/v1/users/{$student->id}/role", [
        'role_id' => Roles::TEACHER->value
    ]);

    $response->assertOk()
        ->assertJson([
            'success' => true,
            'message' => 'Role do usuário atualizada com sucesso',
        ]);

    $this->assertEquals(Roles::TEACHER->value, $student->fresh()->role_id);
});

test('non-admin cannot list users', function () {
    $teacher = User::factory()->create(['role_id' => Roles::TEACHER->value]);

    $response = $this->actingAs($teacher)->getJson('/api/v1/users');

    $response->assertForbidden();
});

test('non-admin cannot update user role', function () {
    $teacher = User::factory()->create(['role_id' => Roles::TEACHER->value]);
    $student = User::factory()->create(['role_id' => Roles::STUDENT->value]);

    $response = $this->actingAs($teacher)->patchJson("/api/v1/users/{$student->id}/role", [
        'role_id' => Roles::ADMIN->value
    ]);

    $response->assertForbidden();
});

test('update role validates role_id existence', function () {
    $admin = User::factory()->create(['role_id' => Roles::ADMIN->value]);
    $student = User::factory()->create(['role_id' => Roles::STUDENT->value]);

    $response = $this->actingAs($admin)->patchJson("/api/v1/users/{$student->id}/role", [
        'role_id' => 999 // Non-existent role
    ]);

    $response->assertStatus(422)
        ->assertJsonStructure(['success', 'message', 'errors' => ['role_id']]);
});
