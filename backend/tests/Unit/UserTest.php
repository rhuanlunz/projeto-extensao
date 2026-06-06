<?php

use App\Models\User;
use App\Http\Enums\Roles;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(Tests\TestCase::class, RefreshDatabase::class);

test('user should have correct role check using Enum', function () {
    $user = User::factory()->create([
        'role_id' => Roles::ADMIN->value,
    ]);

    expect($user->hasRole(Roles::ADMIN))->toBeTrue();
    expect($user->hasRole(Roles::TEACHER))->toBeFalse();
    expect($user->hasRole(Roles::STUDENT))->toBeFalse();
});

test('user should have correct role check using string', function () {
    $user = User::factory()->create([
        'role_id' => Roles::TEACHER->value,
    ]);

    expect($user->hasRole('teacher'))->toBeTrue();
    expect($user->hasRole('TEACHER'))->toBeTrue();
    expect($user->hasRole('admin'))->toBeFalse();
    expect($user->hasRole('invalid'))->toBeFalse();
});

test('user should check multiple roles using hasAnyRole', function () {
    $user = User::factory()->create([
        'role_id' => Roles::STUDENT->value,
    ]);

    expect($user->hasAnyRole([Roles::ADMIN, Roles::STUDENT]))->toBeTrue();
    expect($user->hasAnyRole(['admin', 'student']))->toBeTrue();
    expect($user->hasAnyRole([Roles::ADMIN, Roles::TEACHER]))->toBeFalse();
    expect($user->hasAnyRole(['admin', 'teacher']))->toBeFalse();
});
