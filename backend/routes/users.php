<?php

use App\Http\Controllers\UserController;
use App\Http\Middleware\AuthMiddleware;
use App\Http\Middleware\ValidateJwtAudience;
use Illuminate\Support\Facades\Route;

// Acesso exclusivo para admin autenticado
Route::middleware([AuthMiddleware::class, ValidateJwtAudience::class, 'role:admin'])->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::patch('/{id}/role', [UserController::class, 'updateRole']);
});
