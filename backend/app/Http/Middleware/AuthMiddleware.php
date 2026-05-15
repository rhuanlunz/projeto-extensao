<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Exceptions\UserNotDefinedException;

class AuthMiddleware
{
    public function handle(Request $request, Closure $next): JsonResponse | Response
    {
        try {
            auth()->userOrFail();
        } catch (UserNotDefinedException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Acesso negado. Usuário não autorizado.'
            ], 401);
        }

        return $next($request);
    }
}
