<?php

use App\Http\Controllers\SettingController;
use App\Http\Middleware\AuthMiddleware;
use App\Http\Middleware\ValidateJwtAudience;
use Illuminate\Support\Facades\Route;

// Acesso exclusivo para admin autenticado
Route::middleware([AuthMiddleware::class, ValidateJwtAudience::class, 'role:admin'])->group(function () {
    Route::get('/request-email', [SettingController::class, 'getRequestEmail']);
    Route::post('/request-email', [SettingController::class, 'storeRequestEmail']);
    Route::put('/request-email', [SettingController::class, 'updateRequestEmail']);
});
