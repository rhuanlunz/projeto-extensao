<?php

use App\Models\User;

test('should logout user', function() {
    $user = User::factory()->create();
    $user_credentials_payload = [
        'email' => $user->email,
        'password' => 'password'
    ];

    $response = $this->postJson('/api/v1/auth/login', $user_credentials_payload);
    $result = $this->get('/api/v1/auth/logout', [
        'Bearer' => $response->json()['data']['access_token']
    ]);

    $result->assertOk();
    $this->assertGuest();
});

test('should prevent not logged user to logout', function() {
    $result = $this->get('/api/v1/auth/logout');

    $result->assertUnauthorized();
    $this->assertGuest();
});