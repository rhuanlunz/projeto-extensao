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
        }
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
