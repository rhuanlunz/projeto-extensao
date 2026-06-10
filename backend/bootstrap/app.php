<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        health: '/up',
        then: function() {
            $api_prefix = '/api/v1/';

            Route::prefix($api_prefix.'auth')->group(base_path('routes/auth.php'));
            Route::prefix($api_prefix.'resources')->group(base_path('routes/resources.php'));
            Route::prefix($api_prefix.'resource-requests')->group(base_path('routes/resource-requests.php'));
            Route::prefix($api_prefix.'categories')->group(base_path('routes/categories.php'));
            Route::prefix($api_prefix.'settings')->group(base_path('routes/settings.php'));
        }
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'role' => \App\Http\Middleware\RoleMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (\Illuminate\Validation\ValidationException $e, \Illuminate\Http\Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Erro de validação',
                    'errors' => $e->errors(),
                ], 422);
            }
        });

        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e, \Illuminate\Http\Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Registro não encontrado',
                ], 404);
            }
        });

        $exceptions->render(function (\Throwable $e, \Illuminate\Http\Request $request) {
            if ($request->is('api/*')) {
                if (config('app.debug')) {
                    return null; // Let Laravel handle with debug info
                }

                return response()->json([
                    'success' => false,
                    'message' => 'Ocorreu um erro interno.',
                ], 500);
            }
        });
    })->create();
