<?php

use App\Http\Controllers\ResourceController;
use App\Http\Middleware\AuthMiddleware;
use App\Http\Middleware\ValidateJwtAudience;
use Illuminate\Support\Facades\Route;

Route::middleware([AuthMiddleware::class, ValidateJwtAudience::class])->group(function () {

    // Acesso para student, teacher e admin
    Route::middleware(['role:student,teacher,admin'])->group(function () {
        Route::get('/', [ResourceController::class, 'index']);
    });

    // Acesso para teacher e admin
    Route::middleware(['role:teacher,admin'])->group(function () {
        Route::patch('/{id}/status', [ResourceController::class, 'updateStatus']);
    });

    // Acesso exclusivo para admin
    Route::middleware(['role:admin'])->group(function () {
        Route::post('/', [ResourceController::class, 'store']);
        Route::put('/{id}', [ResourceController::class, 'update']);
        Route::delete('/{id}', [ResourceController::class, 'destroy']);
    });
});
