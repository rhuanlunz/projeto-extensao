<?php

use App\Http\Enums\Roles;
use App\Models\Setting;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(closure: fn () => loginAs(Roles::ADMIN));

// ─── GET /api/v1/settings/request-email ────────────────────────────────────

test('GET - should return null email when no setting is configured yet', function () {
    $response = $this->getJson('/api/v1/settings/request-email');

    $response->assertOk()
        ->assertJson([
            'success' => true,
            'message' => 'E-mail de recebimento recuperado com sucesso.',
            'data' => ['email' => null]
        ]);
});

test('GET - should return configured email when setting exists', function () {
    Setting::create(['key' => 'request_email', 'value' => 'admin@escola.com']);

    $response = $this->getJson('/api/v1/settings/request-email');

    $response->assertOk()
        ->assertJson([
            'success' => true,
            'message' => 'E-mail de recebimento recuperado com sucesso.',
            'data' => ['email' => 'admin@escola.com']
        ]);
});

// ─── POST /api/v1/settings/request-email ───────────────────────────────────

test('POST - should set request email with success', function () {
    $response = $this->postJson('/api/v1/settings/request-email', [
        'email' => 'solicitacoes@escola.com'
    ]);

    $response->assertStatus(201)
        ->assertJson([
            'success' => true,
            'message' => 'E-mail de recebimento configurado com sucesso.',
            'data' => ['email' => 'solicitacoes@escola.com']
        ]);

    $this->assertDatabaseHas('settings', [
        'key' => 'request_email',
        'value' => 'solicitacoes@escola.com'
    ]);
});

test('POST - email is required', function () {
    $response = $this->postJson('/api/v1/settings/request-email', []);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Erro de validação'
        ])
        ->assertInvalid(['email' => 'O campo e-mail é obrigatório.']);
});

test('POST - email must be valid', function () {
    $response = $this->postJson('/api/v1/settings/request-email', [
        'email' => 'not-a-valid-email'
    ]);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Erro de validação'
        ])
        ->assertInvalid(['email' => 'Informe um endereço de e-mail válido.']);
});

test('POST - should fail when trying to set email when one already exists', function () {
    Setting::create(['key' => 'request_email', 'value' => 'already@set.com']);

    $response = $this->postJson('/api/v1/settings/request-email', [
        'email' => 'novo@email.com'
    ]);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Erro de validação'
        ]);

    // Ensure original value is preserved
    $this->assertDatabaseHas('settings', [
        'key' => 'request_email',
        'value' => 'already@set.com'
    ]);
});

// ─── PUT /api/v1/settings/request-email ────────────────────────────────────

test('PUT - should update request email with success', function () {
    Setting::create(['key' => 'request_email', 'value' => 'antigo@escola.com']);

    $response = $this->putJson('/api/v1/settings/request-email', [
        'email' => 'novo@escola.com'
    ]);

    $response->assertOk()
        ->assertJson([
            'success' => true,
            'message' => 'E-mail de recebimento atualizado com sucesso.',
            'data' => ['email' => 'novo@escola.com']
        ]);

    $this->assertDatabaseHas('settings', [
        'key' => 'request_email',
        'value' => 'novo@escola.com'
    ]);

    $this->assertDatabaseMissing('settings', [
        'key' => 'request_email',
        'value' => 'antigo@escola.com'
    ]);
});

test('PUT - email is required', function () {
    Setting::create(['key' => 'request_email', 'value' => 'antigo@escola.com']);

    $response = $this->putJson('/api/v1/settings/request-email', []);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Erro de validação'
        ])
        ->assertInvalid(['email' => 'O campo e-mail é obrigatório.']);
});

test('PUT - email must be valid', function () {
    Setting::create(['key' => 'request_email', 'value' => 'antigo@escola.com']);

    $response = $this->putJson('/api/v1/settings/request-email', [
        'email' => 'invalid-format'
    ]);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Erro de validação'
        ])
        ->assertInvalid(['email' => 'Informe um endereço de e-mail válido.']);
});

test('PUT - should fail when no email is configured yet', function () {
    $response = $this->putJson('/api/v1/settings/request-email', [
        'email' => 'novo@escola.com'
    ]);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Erro de validação'
        ]);

    $this->assertDatabaseMissing('settings', [
        'key' => 'request_email'
    ]);
});

test('should only have one request_email entry in the database after POST and PUT', function () {
    // POST to create
    $this->postJson('/api/v1/settings/request-email', ['email' => 'primeiro@escola.com'])
        ->assertStatus(201);

    // PUT to update
    $this->putJson('/api/v1/settings/request-email', ['email' => 'segundo@escola.com'])
        ->assertOk();

    // Assert only one record with this key exists
    $count = Setting::where('key', 'request_email')->count();
    expect($count)->toBe(1);

    $this->assertDatabaseHas('settings', [
        'key' => 'request_email',
        'value' => 'segundo@escola.com'
    ]);
});
