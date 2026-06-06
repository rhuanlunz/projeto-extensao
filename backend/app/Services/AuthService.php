<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class AuthService
{
    /**
     * Register a new user and login.
     *
     * @param array $data
     * @return array
     */
    public function register(array $data): array
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password']
        ]);

        $token = auth()->login($user);

        return [
            'token' => $token,
            'expires_in' => auth()->factory()->getTTL() * 60
        ];
    }

    /**
     * Authenticate user and return token.
     *
     * @param array $credentials
     * @return array|null
     */
    public function login(array $credentials): ?array
    {
        if (!$token = auth()->attempt($credentials)) {
            return null;
        }

        return [
            'token' => $token,
            'expires_in' => auth()->factory()->getTTL() * 60
        ];
    }

    /**
     * Log the user out of the application.
     *
     * @return void
     */
    public function logout(): void
    {
        auth()->logout();
    }

    /**
     * Send password reset link to user.
     *
     * @param array $data
     * @return string
     */
    public function forgot(array $data): string
    {
        $email = ['email' => $data['email']];
        $user_exists = User::where('email', $email)->exists();
        if (!$user_exists) {
            return 'invalid_user';
        }

        $status = Password::sendResetLink($email);
        if ($status != Password::ResetLinkSent) {
            return 'failed';
        }

        return 'success';
    }

    /**
     * Reset password using token.
     *
     * @param array $data
     * @return bool
     */
    public function reset(array $data): bool
    {
        $credentials = [
            'email' => $data['email'],
            'password' => $data['new_password'],
            'password_confirmation' => $data['new_password_confirmation'],
            'token' => $data['token']
        ];

        $status = Password::reset($credentials, function (User $user, string $password) {
            $user->forceFill([
                'password' => Hash::make($password)
            ])->setRememberToken(Str::random(60));
            
            $user->save();

            event(new PasswordReset($user));
        });

        return $status === Password::PasswordReset;
    }
}
