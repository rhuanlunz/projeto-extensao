<?php

use App\Http\Controllers\ResourceRequestController;
use App\Http\Middleware\AuthMiddleware;
use App\Http\Middleware\ValidateJwtAudience;
use Illuminate\Support\Facades\Route;

Route::middleware([AuthMiddleware::class, ValidateJwtAudience::class, 'role:student,teacher'])->group(function () {
    Route::post('/', [ResourceRequestController::class, 'store']);
});
