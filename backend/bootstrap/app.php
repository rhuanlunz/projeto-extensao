<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        health: '/up',
        then: function() {
            Route::prefix('api/v1')
                ->middleware('throttle:api')
                ->group(function () {
                    Route::prefix('auth')
                        ->group(base_path('routes/auth.php'));

                    Route::prefix('resources')
                        ->group(base_path('routes/resources.php'));

                    Route::prefix('resource-requests')
                        ->group(base_path('routes/resource-requests.php'));

                    Route::prefix('categories')
                        ->group(base_path('routes/categories.php'));

                    Route::prefix('settings')
                        ->group(base_path('routes/settings.php'));

                    Route::prefix('users')
                        ->group(base_path('routes/users.php'));

                    Route::prefix('levels')
                        ->group(base_path('routes/levels.php'));
                });
        }
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'role' => \App\Http\Middleware\RoleMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (\Illuminate\Validation\ValidationException $e, Request $request) {
            if ($request->is('*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Erro de validação',
                    'errors' => $e->errors(),
                ], 422);
            }
        });

        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e, Request $request) {
            if ($request->is('*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Registro não encontrado',
                ], 404);
            }
        });

        $exceptions->render(function (TooManyRequestsHttpException $e, Request $request) {
            if (! $request->is('*')) {
                return null;
            }

            return response()->json([
                'success' => false,
                'message' => 'Muitas requisições. Tente novamente mais tarde.',
            ], 429);
        });

        $exceptions->render(function (Throwable $e, Request $request) {
            if ($request->is('*')) {
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
