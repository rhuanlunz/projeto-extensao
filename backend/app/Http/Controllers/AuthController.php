<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\JsonResponse;
use App\Models\User;


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

    public function logout()
    {
        auth()->logout();

        return response()->json([
            'success' => true,
            'message' => 'Logout realizado com sucesso',
        ], 200);
    }
}
