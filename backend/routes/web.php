<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// API durumunu kontrol et
Route::get('/', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'API is running',
        'version' => '1.0.0',
        'timestamp' => now()->toIso8601String()
    ]);
});

// Auth rotaları
Route::post('/login', [AuthController::class, 'login']);
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Login sayfası için GET route
Route::get('/login', function () {
    return view('login');
});
