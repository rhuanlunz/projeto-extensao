<?php

use App\Http\Controllers\AuthController;
use App\Http\Middleware\AuthMiddleware;
use App\Http\Middleware\ValidateJwtAudience;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register'])
    ->middleware(['throttle:register']);

Route::post('login', [AuthController::class, 'login'])
    ->middleware(['throttle:login']);

Route::get('logout', [AuthController::class, 'logout'])
    ->middleware([AuthMiddleware::class, ValidateJwtAudience::class]);

Route::post('forgot', [AuthController::class, 'forgot']);
Route::post('reset', [AuthController::class, 'reset'])
    ->name('password.reset');