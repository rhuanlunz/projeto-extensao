<?php

use App\Http\Enums\Roles;
use App\Models\User;

test('should register user', function () {
    $new_user = User::factory()->make();

    $result = $this->postJson('/api/v1/auth/register', [
        'name' => $new_user->name,
        'email' => $new_user->email,
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $result->assertCreated();
    $this->assertDatabaseHas('users', [
        'email' => $new_user->email
    ]);
});

test('should register user and ignore non-existent or hidden/private fields if are present.', function () {
    $new_user = User::factory()->make();
    $payload_with_hidden_and_non_existent_field = [
        'name' => $new_user->name,
        'email' => $new_user->email,
        'password' => 'password',
        'password_confirmation' => 'password',
        'role_id' => Roles::ADMIN->value, // private field: Admin role
        'random_blob_field' => Str::random() // non-existent
    ];

    $result = $this->postJson('/api/v1/auth/register', $payload_with_hidden_and_non_existent_field);

    $result->assertCreated();
    $this->assertDatabaseHas('users', [
        'email' => $new_user->email,
        'role_id' => Roles::STUDENT->value
    ]);
});

test('should prevent user from being registered if any fields are left blank.', function () {
    $result = $this->postJson('/api/v1/auth/register');

    $result->assertStatus(422);
});

test('should prevent user from being registered if the username contains numbers or special characters.', function () {
    $new_user = User::factory()->make();
    $invalid_chars_name = 'bigBadA$$ boy1234';

    $result = $this->postJson('/api/v1/auth/register', [
        'name' => $invalid_chars_name,
        'email' => $new_user->email,
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $result->assertStatus(422);
    $this->assertDatabaseMissing('users', [
        'email' => $new_user->email
    ]);
});

test('should prevent user from being registered if the username exceeds the maximum length.', function () {
    $new_user = User::factory()->make();
    $invalid_length_name = Str::repeat('a', 300);

    $result = $this->postJson('/api/v1/auth/register', [
        'name' => $invalid_length_name,
        'email' => $new_user->email,
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $result->assertStatus(422);
    $this->assertDatabaseMissing('users', [
        'email' => $new_user->email
    ]);
});

test('should prevent user from being registered if the email is invalid.', function () {
    $new_user = User::factory()->make();
    $invalid_email = 'invalid @_email.com';

    $result = $this->postJson('/api/v1/auth/register', [
        'name' => $new_user->name,
        'email' => $invalid_email,
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $result->assertStatus(422);
    $this->assertDatabaseMissing('users', [
        'email' => $new_user->email
    ]);
});

test('should prevent user from being registered if the email exceeds the maximum length.', function () {
    $new_user = User::factory()->make();
    $invalid_length_email = Str::repeat('a', 300);

    $result = $this->postJson('/api/v1/auth/register', [
        'name' => $new_user->name,
        'email' => $invalid_length_email,
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $result->assertStatus(422);
    $this->assertDatabaseMissing('users', [
        'email' => $new_user->email
    ]);
});

test('should prevent user from being registered if the email is already registered.', function () {
    $existing_user = User::factory()->create();

    $result = $this->postJson('/api/v1/auth/register', [
        'name' => $existing_user->name,
        'email' => $existing_user->email,
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $result->assertStatus(422);
    $this->assertDatabaseHas('users', [
        'email' => $existing_user->email
    ]);
});

test('should prevent user from being registered if the password exceeds the maximum length.', function () {
    $new_user = User::factory()->make();
    $invalid_length_password = Str::repeat('a', 301);

    $result = $this->postJson('/api/v1/auth/register', [
        'name' => $new_user->name,
        'email' => $new_user->email,
        'password' => $invalid_length_password,
        'password_confirmation' => $invalid_length_password,
    ]);

    $result->assertStatus(422);
    $this->assertDatabaseMissing('users', [
        'email' => $new_user->email
    ]);
});

test('should prevent user from being registered if the password is shorter than the minimum length.', function () {
    $new_user = User::factory()->make();
    $invalid_length_password = Str::random(4);

    $result = $this->postJson('/api/v1/auth/register', [
        'name' => $new_user->name,
        'email' => $new_user->email,
        'password' => $invalid_length_password,
        'password_confirmation' => $invalid_length_password,
    ]);

    $result->assertStatus(422);
    $this->assertDatabaseMissing('users', [
        'email' => $new_user->email
    ]);
});

test('should prevent user from being registered if the password confirmation does not match the password.', function () {
    $new_user = User::factory()->make();
    $invalid_password_confirmation = 'goddamn broo!';

    $result = $this->postJson('/api/v1/auth/register', [
        'name' => $new_user->name,
        'email' => $new_user->email,
        'password' => 'password',
        'password_confirmation' => $invalid_password_confirmation,
    ]);

    $result->assertStatus(422);
    $this->assertDatabaseMissing('users', [
        'email' => $new_user->email
    ]);
});

test('should block requests by IP for 1 minute after 10 attempts.', function () {
    $invalid_user_data_payload = [
        'name' => '!@#A@%3211',
        'email' => 'invalid',
        'password' => 'password',
        'password_confirmation' => 'password_basmd',
    ];

    for ($i = 0; $i < 11; $i++)
        $result = $this->postJson('/api/v1/auth/register', $invalid_user_data_payload);

    $result->assertTooManyRequests();
});
