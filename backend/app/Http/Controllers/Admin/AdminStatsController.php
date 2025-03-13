<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminStatsController extends Controller
{
    public function overview()
    {
        // Örnek veri
        return response()->json([
            'totalUsers' => 150,
            'totalOrders' => 45,
            'totalRevenue' => 25000,
            'activeProjects' => 12
        ]);
    }

    public function visitors()
    {
        // Örnek veri
        return response()->json([
            'daily' => [
                ['date' => '2024-02-21', 'count' => 120],
                ['date' => '2024-02-22', 'count' => 145],
                ['date' => '2024-02-23', 'count' => 165],
                ['date' => '2024-02-24', 'count' => 155],
                ['date' => '2024-02-25', 'count' => 190],
                ['date' => '2024-02-26', 'count' => 170],
                ['date' => '2024-02-27', 'count' => 185]
            ]
        ]);
    }

    public function pageViews()
    {
        // Örnek veri
        return response()->json([
            'daily' => [
                ['date' => '2024-02-21', 'count' => 450],
                ['date' => '2024-02-22', 'count' => 520],
                ['date' => '2024-02-23', 'count' => 580],
                ['date' => '2024-02-24', 'count' => 490],
                ['date' => '2024-02-25', 'count' => 600],
                ['date' => '2024-02-26', 'count' => 550],
                ['date' => '2024-02-27', 'count' => 580]
            ]
        ]);
    }

    public function browsers()
    {
        // Örnek veri
        return response()->json([
            'data' => [
                ['name' => 'Chrome', 'value' => 65],
                ['name' => 'Firefox', 'value' => 15],
                ['name' => 'Safari', 'value' => 12],
                ['name' => 'Edge', 'value' => 6],
                ['name' => 'Others', 'value' => 2]
            ]
        ]);
    }

    public function devices()
    {
        // Örnek veri
        return response()->json([
            'data' => [
                ['name' => 'Desktop', 'value' => 55],
                ['name' => 'Mobile', 'value' => 40],
                ['name' => 'Tablet', 'value' => 5]
            ]
        ]);
    }

    public function locations()
    {
        // Örnek veri
        return response()->json([
            'data' => [
                ['country' => 'Türkiye', 'value' => 75],
                ['country' => 'Almanya', 'value' => 8],
                ['country' => 'ABD', 'value' => 6],
                ['country' => 'İngiltere', 'value' => 4],
                ['country' => 'Diğer', 'value' => 7]
            ]
        ]);
    }
}
