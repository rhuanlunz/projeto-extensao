<?php

use App\Http\Controllers\ResourceRequestController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware([AuthMiddleware::class, 'role:student,teacher'])->group(function () {
    Route::post('/', [ResourceRequestController::class, 'store']);
});
