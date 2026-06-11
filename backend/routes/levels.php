<?php

use App\Http\Controllers\LevelController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

// Acesso para todos os usuários autenticados (student, teacher, admin)
Route::middleware([AuthMiddleware::class])->group(function () {
    Route::get('/', [LevelController::class, 'index']);
});
