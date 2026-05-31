<?php

use App\Http\Controllers\CategoryController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware([AuthMiddleware::class])->group(function () {

    // Acesso para student, teacher e admin
    Route::middleware(['role:student,teacher,admin'])->group(function () {
        Route::get('/', [CategoryController::class, 'index']);
    });

    // Acesso exclusivo para admin
    Route::middleware(['role:admin'])->group(function () {
        Route::post('/', [CategoryController::class, 'store']);
        Route::put('/{id}', [CategoryController::class, 'update']);
        Route::delete('/{id}', [CategoryController::class, 'destroy']);
    });
});
