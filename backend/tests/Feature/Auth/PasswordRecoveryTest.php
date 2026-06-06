<?php

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use App\Notifications\CustomResetPasswordNotification;

// --- Forgot Password Endpoint Tests ---

test('forgot password - should send email to existing user', function () {
    Notification::fake();
    $user = User::factory()->create();

    $response = $this->postJson('/api/v1/auth/forgot', [
        'email' => $user->email,
    ]);

    $response->assertOk()
        ->assertJson([
            'success' => true,
            'message' => 'Um link de redefinição de senha foi enviado para o seu e-mail.',
        ]);

    Notification::assertSentTo($user, CustomResetPasswordNotification::class);
});

test('forgot password - email is required', function () {
    $response = $this->postJson('/api/v1/auth/forgot', [
        'email' => '',
    ]);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Erro de validação',
        ])
        ->assertInvalid([
            'email' => 'O campo e-mail é obrigatório.',
        ]);
});

test('forgot password - email must be valid format', function () {
    $response = $this->postJson('/api/v1/auth/forgot', [
        'email' => 'invalid-email-format',
    ]);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Erro de validação',
        ])
        ->assertInvalid([
            'email' => 'Informe um endereço de e-mail válido.',
        ]);
});

test('forgot password - should return 400 for non-existent user', function () {
    $response = $this->postJson('/api/v1/auth/forgot', [
        'email' => 'nonexistent@example.com',
    ]);

    $response->assertStatus(400)
        ->assertJson([
            'success' => false,
            'message' => 'O E-mail enviado é inválido.',
        ]);
});

// --- Reset Password Endpoint Tests ---

test('reset password - should reset with valid token', function () {
    $user = User::factory()->create([
        'password' => Hash::make('old_password'),
    ]);

    $token = Password::broker()->createToken($user);

    $response = $this->postJson('/api/v1/auth/reset', [
        'token' => $token,
        'email' => $user->email,
        'new_password' => 'new_password_123',
        'new_password_confirmation' => 'new_password_123',
    ]);

    $response->assertOk()
        ->assertJson([
            'success' => true,
            'message' => 'A senha foi redefinida com sucesso.',
        ]);
});

test('reset password - token is required', function () {
    $user = User::factory()->create();

    $response = $this->postJson('/api/v1/auth/reset', [
        'token' => '',
        'email' => $user->email,
        'new_password' => 'new_password_123',
        'new_password_confirmation' => 'new_password_123',
    ]);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Erro de validação',
        ])
        ->assertInvalid([
            'token' => 'O token é obrigatório.',
        ]);
});

test('reset password - email is required', function () {
    $user = User::factory()->create();
    $token = Password::broker()->createToken($user);

    $response = $this->postJson('/api/v1/auth/reset', [
        'token' => $token,
        'email' => '',
        'new_password' => 'new_password_123',
        'new_password_confirmation' => 'new_password_123',
    ]);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Erro de validação',
        ])
        ->assertInvalid([
            'email' => 'O campo e-mail é obrigatório.',
        ]);
});

test('reset password - password is required', function () {
    $user = User::factory()->create();
    $token = Password::broker()->createToken($user);

    $response = $this->postJson('/api/v1/auth/reset', [
        'token' => $token,
        'email' => $user->email,
        'new_password' => '',
        'new_password_confirmation' => '',
    ]);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Erro de validação',
        ])
        ->assertInvalid([
            'new_password' => 'O campo senha é obrigatório.',
        ]);
});

test('reset password - password confirmation is invalid', function () {
    $user = User::factory()->create();
    $token = Password::broker()->createToken($user);

    $response = $this->postJson('/api/v1/auth/reset', [
        'token' => $token,
        'email' => $user->email,
        'new_password' => 'new_password_123',
        'new_password_confirmation' => 'mismatched_password',
    ]);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Erro de validação',
        ])
        ->assertInvalid([
            'new_password' => 'As senhas não coincidem.',
        ]);
});

test('reset password - should fail with invalid token', function () {
    $user = User::factory()->create();

    $response = $this->postJson('/api/v1/auth/reset', [
        'token' => 'invalid-token-12345',
        'email' => $user->email,
        'new_password' => 'new_password_123',
        'new_password_confirmation' => 'new_password_123',
    ]);

    $response->assertStatus(500)
        ->assertJson([
            'success' => false,
            'message' => 'Ocorreu uma falha no servidor.',
        ]);
});

test('reset password - should fail with token from another user', function () {
    $userA = User::factory()->create();
    $userB = User::factory()->create();

    $tokenA = Password::broker()->createToken($userA);

    $response = $this->postJson('/api/v1/auth/reset', [
        'token' => $tokenA,
        'email' => $userB->email,
        'new_password' => 'new_password_123',
        'new_password_confirmation' => 'new_password_123',
    ]);

    $response->assertStatus(500)
        ->assertJson([
            'success' => false,
            'message' => 'Ocorreu uma falha no servidor.',
        ]);
});

test('reset password - should fail with expired token', function () {
    $user = User::factory()->create();
    $token = Password::broker()->createToken($user);

    // Expire the token by modifying the creation timestamp in the database to be older than the default 60 minutes.
    DB::table('password_reset_tokens')
        ->where('email', $user->email)
        ->update(['created_at' => now()->subMinutes(61)]);

    $response = $this->postJson('/api/v1/auth/reset', [
        'token' => $token,
        'email' => $user->email,
        'new_password' => 'new_password_123',
        'new_password_confirmation' => 'new_password_123',
    ]);

    $response->assertStatus(500)
        ->assertJson([
            'success' => false,
            'message' => 'Ocorreu uma falha no servidor.',
        ]);
});

test('reset password - password must be successfully persisted in the database', function () {
    $user = User::factory()->create([
        'password' => Hash::make('old_password'),
    ]);

    $token = Password::broker()->createToken($user);

    $response = $this->postJson('/api/v1/auth/reset', [
        'token' => $token,
        'email' => $user->email,
        'new_password' => 'new_secure_password_123',
        'new_password_confirmation' => 'new_secure_password_123',
    ]);

    $response->assertOk();

    // Re-retrieve the user and assert password is correct
    $user->refresh();
    expect(Hash::check('new_secure_password_123', $user->password))->toBeTrue();
});
