<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\ResetPasswordRequest;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;


class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $new_user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ]);

        $token = auth()->login($new_user);

        return response()->json([
            'success' => true,
            'message' => 'Usuário cadastrado com sucesso!',
            'data' => [
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60
            ]
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = [
            'email' => $request->input('email'), 
            'password' => $request->input('password')
        ];

        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Credenciais inválidas. Verifique e tente novamente.',
            ], 401);
        }

        return response()->json([
            'success' => true,
            'message' => 'Usuário logado com sucesso!',
            'data' => [
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60
            ]
        ], 200);
    }

    public function logout(): JsonResponse
    {
        auth()->logout();

        return response()->json([
            'sucess' => true,
            'message' => 'Logout realizado com sucesso',
        ], 200);
    }

    public function forgot(ForgotPasswordRequest $request): JsonResponse
    {
        $email = $request->only('email');
        $user_exists = User::where('email', $email)->exists();
        if (!$user_exists) {
            return response()->json([
                'success' => false,
                'message' => 'O E-mail enviado é inválido.',
            ], 400);
        }

        $status = Password::sendResetLink($email);
        if ($status != Password::ResetLinkSent) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu uma falha no servidor.',
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Um link de redefinição de senha foi enviado para o seu e-mail.',
        ], 200);
    }

    public function reset(ResetPasswordRequest $request): JsonResponse
    {
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('new_password'),
            'password_confirmation' => $request->input('new_password_confirmation'),
            'token' => $request->input('token')
        ];

        $status = Password::reset($credentials, function (User $user, string $password) {
            $user->forceFill([
                'password' => Hash::make($password)
            ])->setRememberToken(Str::random(60));
            
            $user->save();

            event(new PasswordReset($user));
        });

        if ($status != Password::PasswordReset) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu uma falha no servidor.',
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'A senha foi redefinida com sucesso.',
        ], 200);
    }
}
