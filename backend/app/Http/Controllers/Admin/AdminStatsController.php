<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Analytics;
use Spatie\Analytics\Period;
use Carbon\Carbon;

class AdminStatsController extends Controller
{
    public function overview()
    {
        try {
            $period = Period::days(30);
            $analyticsData = Analytics::fetchTotalVisitorsAndPageViews($period);
            
            $totalVisitors = $analyticsData->sum('visitors');
            $totalPageViews = $analyticsData->sum('pageViews');
            
            // Önceki ay ile karşılaştırma
            $previousPeriod = Period::create(Carbon::now()->subDays(60), Carbon::now()->subDays(30));
            $previousData = Analytics::fetchTotalVisitorsAndPageViews($previousPeriod);
            $previousVisitors = $previousData->sum('visitors');
            
            // Yüzde değişimi hesapla
            $visitorChange = $previousVisitors > 0 
                ? (($totalVisitors - $previousVisitors) / $previousVisitors) * 100 
                : 0;

            return response()->json([
                'total_visitors' => $totalVisitors,
                'total_pageviews' => $totalPageViews,
                'trends' => [
                    'visitors' => round($visitorChange, 2)
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error('Analytics overview error: ' . $e->getMessage());
            return response()->json(['error' => 'İstatistikler yüklenirken bir hata oluştu'], 500);
        }
    }

    public function visitors()
    {
        try {
            $period = Period::days(7);
            $analyticsData = Analytics::fetchTotalVisitorsAndPageViews($period);
            
            return response()->json([
                'labels' => $analyticsData->pluck('date')->map(fn($date) => $date->format('d.m.Y')),
                'data' => $analyticsData->pluck('visitors')
            ]);
        } catch (\Exception $e) {
            \Log::error('Analytics visitors error: ' . $e->getMessage());
            return response()->json(['error' => 'Ziyaretçi verileri yüklenirken bir hata oluştu'], 500);
        }
    }

    public function pageViews()
    {
        try {
            $period = Period::days(7);
            $analyticsData = Analytics::fetchTotalVisitorsAndPageViews($period);
            
            return response()->json([
                'labels' => $analyticsData->pluck('date')->map(fn($date) => $date->format('d.m.Y')),
                'data' => $analyticsData->pluck('pageViews')
            ]);
        } catch (\Exception $e) {
            \Log::error('Analytics pageviews error: ' . $e->getMessage());
            return response()->json(['error' => 'Sayfa görüntüleme verileri yüklenirken bir hata oluştu'], 500);
        }
    }

    public function browsers()
    {
        try {
            $period = Period::days(30);
            $analyticsData = Analytics::fetchTopBrowsers($period);
            
            return response()->json([
                'labels' => $analyticsData->pluck('browser'),
                'data' => $analyticsData->pluck('sessions')
            ]);
        } catch (\Exception $e) {
            \Log::error('Analytics browsers error: ' . $e->getMessage());
            return response()->json(['error' => 'Tarayıcı verileri yüklenirken bir hata oluştu'], 500);
        }
    }

    public function devices()
    {
        try {
            $period = Period::days(30);
            $analyticsData = Analytics::fetchTopDevices($period);
            
            return response()->json([
                'labels' => $analyticsData->pluck('deviceCategory'),
                'data' => $analyticsData->pluck('sessions')
            ]);
        } catch (\Exception $e) {
            \Log::error('Analytics devices error: ' . $e->getMessage());
            return response()->json(['error' => 'Cihaz verileri yüklenirken bir hata oluştu'], 500);
        }
    }

    public function locations()
    {
        try {
            $period = Period::days(30);
            $analyticsData = Analytics::fetchTopCountries($period);
            
            $countries = $analyticsData->map(function($item) {
                return [
                    'name' => $item['country'],
                    'percentage' => round(($item['sessions'] / $analyticsData->sum('sessions')) * 100, 2),
                    'color' => 'blue'
                ];
            });

            return response()->json([
                'countries' => $countries
            ]);
        } catch (\Exception $e) {
            \Log::error('Analytics locations error: ' . $e->getMessage());
            return response()->json(['error' => 'Konum verileri yüklenirken bir hata oluştu'], 500);
        }
    }
}
