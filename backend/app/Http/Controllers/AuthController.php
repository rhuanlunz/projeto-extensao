<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    protected $authService;

    /**
     * AuthController constructor.
     *
     * @param AuthService $authService
     */
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Handle user registration.
     *
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $result = $this->authService->register($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Usuário cadastrado com sucesso!',
            'data' => [
                'access_token' => $result['token'],
                'token_type' => 'bearer',
                'expires_in' => $result['expires_in']
            ]
        ], 201);
    }

    /**
     * Handle user login.
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = [
            'email' => $request->input('email'), 
            'password' => $request->input('password')
        ];

        $result = $this->authService->login($credentials);

        if (!$result) {
            return response()->json([
                'success' => false,
                'message' => 'Credenciais inválidas. Verifique e tente novamente.',
            ], 401);
        }

        return response()->json([
            'success' => true,
            'message' => 'Usuário logado com sucesso!',
            'data' => [
                'access_token' => $result['token'],
                'token_type' => 'bearer',
                'expires_in' => $result['expires_in']
            ]
        ], 200);
    }

    /**
     * Handle user logout.
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        $this->authService->logout();

        return response()->json([
            'success' => true,
            'message' => 'Logout realizado com sucesso',
        ], 200);
    }

    /**
     * Handle password reset link request.
     *
     * @param ForgotPasswordRequest $request
     * @return JsonResponse
     */
    public function forgot(ForgotPasswordRequest $request): JsonResponse
    {
        $result = $this->authService->forgot($request->validated());

        if ($result === 'invalid_user') {
            return response()->json([
                'success' => false,
                'message' => 'O E-mail enviado é inválido.',
            ], 400);
        }

        if ($result === 'failed') {
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

    /**
     * Handle password reset using token.
     *
     * @param ResetPasswordRequest $request
     * @return JsonResponse
     */
    public function reset(ResetPasswordRequest $request): JsonResponse
    {
        $success = $this->authService->reset($request->validated());

        if (!$success) {
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
