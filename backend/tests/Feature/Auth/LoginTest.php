<?php

use App\Models\User;

test('should login user', function() {
    $user = User::factory()->create();

    $result = $this->postJson('/api/v1/auth/login', [
        'email' => $user->email,        
        'password' => 'password',
    ]);

    $result->assertOk()->assertValid();
    $this->assertAuthenticatedAs($user);
});

test('should ignore unexistent or hidden/private fields', function() {
    $user = User::factory()->create();

    $result = $this->postJson('/api/v1/auth/login', [
        'email' => $user->email,        
        'password' => 'password',
        'random' => 234,
        'other' => Str::random()
    ]);

    $result->assertOk()->assertValid();
    $this->assertAuthenticatedAs($user);
});

test('should prevent user request other routes if not logged', function() {
    $result = $this->get('/api/v1/auth/logout');

    $result->assertUnauthorized();
});

test('should prevent user login if any field is empty or null', function() {
    $result = $this->postJson('/api/v1/auth/login', [
        'email' => null,
        'password' => null
    ]);

    $result->assertStatus(422)->assertInvalid([
        'email' => 'O campo e-mail é obrigatório.',
        'password' => 'O campo senha é obrigatório.',
    ]);
});

test('should prevent user login if email field is not string', function() {
    $result = $this->postJson('/api/v1/auth/login', [
        'email' => 1
    ]);

    $result->assertStatus(422)->assertInvalid([
        'email' => 'O e-mail deve ser uma string válida.'
    ]);
});

test('should prevent user login if email field is invalid', function() {
    $result = $this->postJson('/api/v1/auth/login', [
        'email' => '-1invalid@!a$321'
    ]);

    $result->assertStatus(422)->assertInvalid([
        'email' => 'Informe um endereço de e-mail válido.'
    ]);
});

test('should prevent user login if email exceeds limit', function() {
    $result = $this->postJson('/api/v1/auth/login', [
        'email' => Str::repeat('a', 255).'@email.com'
    ]);

    $result->assertStatus(422)->assertInvalid([
        'email' => 'O e-mail não pode ultrapassar 255 caracteres.'
    ]);
});

test('should prevent user login if password field is not string', function() {
    $result = $this->postJson('/api/v1/auth/login', [
        'password' => 1
    ]);

    $result->assertStatus(422)->assertInvalid([
        'password' => 'A senha deve ser uma string válida.'
    ]);
});

test('should prevent user login if password exceeds limit', function() {
    $result = $this->postJson('/api/v1/auth/login', [
        'password' => Str::repeat('a', 301)
    ]);

    $result->assertStatus(422)->assertInvalid([
        'password' => 'A senha não pode ultrapassar 300 caracteres.'
    ]);
});

test('should block requests by IP for 1 minute after 5 attempts.', function() {
    for ($i = 0; $i < 6; $i++)
        $result = $this->postJson('/api/v1/auth/login', [
            'email' => fake()->safeEmail(),        
            'password' => Str::random(),
        ]);

    $result->assertTooManyRequests();
});