<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\AdminStatsController;
use App\Http\Controllers\Admin\SeoSettingController;
use App\Http\Controllers\Content\ContentController;
use App\Http\Controllers\Admin\GeneralSettingsController;
use App\Http\Controllers\Admin\ReferenceController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\ReadySiteController;
use App\Http\Controllers\Admin\BlogController;

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
        // Genel ayarlar
        Route::get('general-settings', [GeneralSettingsController::class, 'index']);
        Route::post('general-settings', [GeneralSettingsController::class, 'update']);

        // İstatistikler
        Route::prefix('stats')->group(function () {
            Route::get('overview', [AdminStatsController::class, 'overview']);
            Route::get('visitors', [AdminStatsController::class, 'visitors']);
            Route::get('pageviews', [AdminStatsController::class, 'pageViews']);
            Route::get('browsers', [AdminStatsController::class, 'browsers']);
            Route::get('devices', [AdminStatsController::class, 'devices']);
            Route::get('locations', [AdminStatsController::class, 'locations']);
        });

        // SEO ayarları
        Route::get('seo-settings', [SeoSettingController::class, 'index']);
        Route::post('seo-settings', [SeoSettingController::class, 'update']);
        Route::post('seo-settings/generate-sitemap', [SeoSettingController::class, 'generateSitemap']);
        Route::post('seo-settings/submit-to-search-engines', [SeoSettingController::class, 'submitToSearchEngines']);

        // Referanslar
        Route::get('references', [ReferenceController::class, 'index']);
        Route::post('references', [ReferenceController::class, 'store']);
        Route::put('references/{id}', [ReferenceController::class, 'update']);
        Route::delete('references/{id}', [ReferenceController::class, 'destroy']);

        // SSS
        Route::get('faqs', [FaqController::class, 'index']);
        Route::post('faqs', [FaqController::class, 'store']);
        Route::put('faqs/{id}', [FaqController::class, 'update']);
        Route::delete('faqs/{id}', [FaqController::class, 'destroy']);
        Route::post('faqs/reorder', [FaqController::class, 'reorder']);

        // Hazır Siteler
        Route::get('ready-sites', [ReadySiteController::class, 'index']);
        Route::post('ready-sites', [ReadySiteController::class, 'store']);
        Route::put('ready-sites/{id}', [ReadySiteController::class, 'update']);
        Route::delete('ready-sites/{id}', [ReadySiteController::class, 'destroy']);
        Route::post('ready-sites/reorder', [ReadySiteController::class, 'reorder']);

        // Blog
        Route::get('blogs', [BlogController::class, 'index']);
        Route::post('blogs', [BlogController::class, 'store']);
        Route::put('blogs/{id}', [BlogController::class, 'update']);
        Route::delete('blogs/{id}', [BlogController::class, 'destroy']);
    });

    // Content routes
    Route::get('/content', [ContentController::class, 'index']);
    Route::post('/content', [ContentController::class, 'update']);
});
