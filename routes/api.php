<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ContactController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('projects')->group(function () {
    Route::get('/', [ProjectController::class, 'index']);
    Route::get('/{id}', [ProjectController::class, 'show']);
    Route::post('/update/{id}', [ProjectController::class, 'update']);
    Route::post('/create', [ProjectController::class, 'create']);
    Route::delete('/{id}', [ProjectController::class, 'destroy']);
});

Route::prefix('contacts')->group(function () {
    Route::post('/', [ContactController::class, 'create']);
    Route::post('/{id}', [ContactController::class, 'update']);
    Route::delete('/{id}', [ContactController::class, 'destroy']);
    Route::get('/assign/{contactId}/{projectId}', [ContactController::class, 'assign']);
});
