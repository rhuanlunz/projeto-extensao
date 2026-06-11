<?php

use App\Http\Controllers\UserController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

// Acesso exclusivo para admin autenticado
Route::middleware([AuthMiddleware::class, 'role:admin'])->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::patch('/{id}/role', [UserController::class, 'updateRole']);
});
