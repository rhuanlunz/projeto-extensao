<?php

use App\Http\Enums\Roles;
use App\Models\Setting;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

// ─── GET /api/v1/settings/request-email ────────────────────────────────────

test('should return 401 when accessing settings without authentication', function () {
    $response = $this->getJson('/api/v1/settings/request-email');

    $response->assertStatus(401)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Usuário não autorizado.'
        ]);
});

test('should return 403 when student tries to GET settings', function () {
    loginAs(Roles::STUDENT);

    $response = $this->getJson('/api/v1/settings/request-email');

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.'
        ]);
});

test('should return 403 when teacher tries to GET settings', function () {
    loginAs(Roles::TEACHER);

    $response = $this->getJson('/api/v1/settings/request-email');

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.'
        ]);
});

// ─── POST /api/v1/settings/request-email ───────────────────────────────────

test('should return 401 when posting settings without authentication', function () {
    $response = $this->postJson('/api/v1/settings/request-email', ['email' => 'test@test.com']);

    $response->assertStatus(401)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Usuário não autorizado.'
        ]);
});

test('should return 403 when student tries to POST settings', function () {
    loginAs(Roles::STUDENT);

    $response = $this->postJson('/api/v1/settings/request-email', ['email' => 'test@test.com']);

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.'
        ]);
});

test('should return 403 when teacher tries to POST settings', function () {
    loginAs(Roles::TEACHER);

    $response = $this->postJson('/api/v1/settings/request-email', ['email' => 'test@test.com']);

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.'
        ]);
});

// ─── PUT /api/v1/settings/request-email ────────────────────────────────────

test('should return 401 when putting settings without authentication', function () {
    $response = $this->putJson('/api/v1/settings/request-email', ['email' => 'test@test.com']);

    $response->assertStatus(401)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Usuário não autorizado.'
        ]);
});

test('should return 403 when student tries to PUT settings', function () {
    loginAs(Roles::STUDENT);

    $response = $this->putJson('/api/v1/settings/request-email', ['email' => 'test@test.com']);

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.'
        ]);
});

test('should return 403 when teacher tries to PUT settings', function () {
    loginAs(Roles::TEACHER);

    $response = $this->putJson('/api/v1/settings/request-email', ['email' => 'test@test.com']);

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.'
        ]);
});
