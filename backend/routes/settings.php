<?php

use App\Http\Controllers\SettingController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

// Acesso exclusivo para admin autenticado
Route::middleware([AuthMiddleware::class, 'role:admin'])->group(function () {
    Route::get('/request-email', [SettingController::class, 'getRequestEmail']);
    Route::post('/request-email', [SettingController::class, 'storeRequestEmail']);
    Route::put('/request-email', [SettingController::class, 'updateRequestEmail']);
});
