<?php

use App\Http\Controllers\ResourceController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ResourceController::class, 'index']);
Route::post('/', [ResourceController::class, 'store']);
Route::put('/{id}', [ResourceController::class, 'update']);
Route::delete('/{id}', [ResourceController::class, 'destroy']);
