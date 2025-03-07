<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\AdminStatsController;
use App\Http\Controllers\Admin\SeoSettingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Auth rotaları
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Settings rotaları
Route::middleware('auth:sanctum')->group(function () {
    // Admin rotaları
    Route::prefix('admin')->group(function () {
        // Settings
        Route::get('/settings', [App\Http\Controllers\Admin\SettingsController::class, 'index']);
        Route::post('/settings', [App\Http\Controllers\Admin\SettingsController::class, 'update']);
        Route::post('/settings/logo', [App\Http\Controllers\Admin\SettingsController::class, 'updateLogo']);
        Route::post('/settings/favicon', [App\Http\Controllers\Admin\SettingsController::class, 'updateFavicon']);

        // İstatistikler
        Route::prefix('stats')->group(function () {
            Route::get('overview', [AdminStatsController::class, 'overview']);
            Route::get('visitors', [AdminStatsController::class, 'visitors']);
            Route::get('pageviews', [AdminStatsController::class, 'pageViews']);
            Route::get('browsers', [AdminStatsController::class, 'browsers']);
            Route::get('devices', [AdminStatsController::class, 'devices']);
            Route::get('locations', [AdminStatsController::class, 'locations']);
        });

        // SEO Ayarları
        Route::get('/seo-settings', [SeoSettingController::class, 'index']);
        Route::post('/seo-settings', [SeoSettingController::class, 'update']);
        Route::post('/seo-settings/generate-sitemap', [SeoSettingController::class, 'generateSitemap']);
        Route::post('/seo-settings/submit-to-search-engines', [SeoSettingController::class, 'submitToSearchEngines']);
    });
});
