<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminStatsController extends Controller
{
    public function overview()
    {
        return response()->json([
            'total_visitors' => 100,
            'active_users' => 50,
            'page_views' => 500,
            'avg_session_duration' => '2m 30s',
            'trends' => [
                'visitors' => 25,
                'users' => 15,
                'views' => 30,
                'duration' => 10
            ]
        ]);
    }

    public function visitors()
    {
        return response()->json([
            'labels' => ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
            'data' => [30, 45, 25, 60, 35, 20, 40]
        ]);
    }

    public function pageViews()
    {
        return response()->json([
            'labels' => ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
            'data' => [100, 150, 120, 200, 180, 90, 160]
        ]);
    }

    public function browsers()
    {
        return response()->json([
            'labels' => ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'],
            'data' => [60, 20, 10, 8, 2]
        ]);
    }

    public function devices()
    {
        return response()->json([
            'labels' => ['Masaüstü', 'Mobil', 'Tablet'],
            'data' => [50, 40, 10]
        ]);
    }

    public function locations()
    {
        return response()->json([
            'countries' => [
                ['name' => 'Türkiye', 'percentage' => 80, 'color' => '#FF6B6B'],
                ['name' => 'Almanya', 'percentage' => 10, 'color' => '#4ECDC4'],
                ['name' => 'Diğer', 'percentage' => 10, 'color' => '#45B7D1']
            ]
        ]);
    }
}
