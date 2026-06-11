<?php

use App\Http\Controllers\LevelController;
use App\Http\Middleware\AuthMiddleware;
use App\Http\Middleware\ValidateJwtAudience;
use Illuminate\Support\Facades\Route;

// Acesso para todos os usuários autenticados (student, teacher, admin)
Route::middleware([AuthMiddleware::class, ValidateJwtAudience::class])->group(function () {
    Route::get('/', [LevelController::class, 'index']);
});
