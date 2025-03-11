<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Google\Analytics\Data\V1beta\BetaAnalyticsDataClient;
use Google\Analytics\Data\V1beta\DateRange;
use Google\Analytics\Data\V1beta\Dimension;
use Google\Analytics\Data\V1beta\Metric;
use Carbon\Carbon;

class AdminStatsController extends Controller
{
    private $propertyId;
    private $client;

    public function __construct()
    {
        try {
            $this->propertyId = env('ANALYTICS_PROPERTY_ID');
            \Log::info('Analytics Property ID: ' . $this->propertyId);
            
            $credentialsPath = storage_path('app/analytics/service-account-credentials.json');
            if (!file_exists($credentialsPath)) {
                \Log::error('Analytics credentials file not found at: ' . $credentialsPath);
                throw new \Exception('Analytics credentials file not found');
            }
            
            \Log::info('Loading Analytics client with credentials from: ' . $credentialsPath);
            $this->client = new BetaAnalyticsDataClient([
                'credentials' => $credentialsPath
            ]);
            \Log::info('Analytics client loaded successfully');
        } catch (\Exception $e) {
            \Log::error('Error initializing Analytics client: ' . $e->getMessage());
            \Log::error($e->getTraceAsString());
            throw $e;
        }
    }

    public function overview()
    {
        try {
            \Log::info('Fetching analytics overview data');
            \Log::info('Using property ID: properties/' . $this->propertyId);
            
            // Son 30 günün verilerini al
            $response = $this->client->runReport([
                'property' => 'properties/' . $this->propertyId,
                'dateRanges' => [
                    new DateRange([
                        'start_date' => '30daysAgo',
                        'end_date' => 'today',
                    ]),
                ],
                'metrics' => [
                    new Metric(['name' => 'activeUsers']),
                    new Metric(['name' => 'screenPageViews']),
                ],
            ]);

            \Log::info('Successfully received analytics data', [
                'response' => json_encode($response->serializeToJsonString())
            ]);

            // Önceki 30 günün verilerini al
            $previousResponse = $this->client->runReport([
                'property' => 'properties/' . $this->propertyId,
                'dateRanges' => [
                    new DateRange([
                        'start_date' => '60daysAgo',
                        'end_date' => '31daysAgo',
                    ]),
                ],
                'metrics' => [
                    new Metric(['name' => 'activeUsers']),
                ],
            ]);

            $currentVisitors = $response->getRows()[0]->getMetricValues()[0]->getValue();
            $previousVisitors = $previousResponse->getRows()[0]->getMetricValues()[0]->getValue();
            $totalPageViews = $response->getRows()[0]->getMetricValues()[1]->getValue();

            $visitorChange = $previousVisitors > 0 
                ? (($currentVisitors - $previousVisitors) / $previousVisitors) * 100 
                : 0;

            return response()->json([
                'total_visitors' => (int)$currentVisitors,
                'total_pageviews' => (int)$totalPageViews,
                'trends' => [
                    'visitors' => round($visitorChange, 2)
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error('Analytics overview error: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'error' => 'İstatistikler yüklenirken bir hata oluştu',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function visitors()
    {
        try {
            $response = $this->client->runReport([
                'property' => 'properties/' . $this->propertyId,
                'dateRanges' => [
                    new DateRange([
                        'start_date' => '7daysAgo',
                        'end_date' => 'today',
                    ]),
                ],
                'dimensions' => [
                    new Dimension(['name' => 'date']),
                ],
                'metrics' => [
                    new Metric(['name' => 'activeUsers']),
                ],
                'orderBys' => [
                    ['dimension' => ['orderType' => 'ALPHANUMERIC', 'dimensionName' => 'date']],
                ],
            ]);

            $labels = [];
            $data = [];

            foreach ($response->getRows() as $row) {
                $date = Carbon::createFromFormat('Ymd', $row->getDimensionValues()[0]->getValue());
                $labels[] = $date->format('d.m.Y');
                $data[] = (int)$row->getMetricValues()[0]->getValue();
            }

            return response()->json([
                'labels' => $labels,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            \Log::error('Analytics visitors error: ' . $e->getMessage());
            return response()->json(['error' => 'Ziyaretçi verileri yüklenirken bir hata oluştu'], 500);
        }
    }

    public function pageViews()
    {
        try {
            $response = $this->client->runReport([
                'property' => 'properties/' . $this->propertyId,
                'dateRanges' => [
                    new DateRange([
                        'start_date' => '7daysAgo',
                        'end_date' => 'today',
                    ]),
                ],
                'dimensions' => [
                    new Dimension(['name' => 'date']),
                ],
                'metrics' => [
                    new Metric(['name' => 'screenPageViews']),
                ],
                'orderBys' => [
                    ['dimension' => ['orderType' => 'ALPHANUMERIC', 'dimensionName' => 'date']],
                ],
            ]);

            $labels = [];
            $data = [];

            foreach ($response->getRows() as $row) {
                $date = Carbon::createFromFormat('Ymd', $row->getDimensionValues()[0]->getValue());
                $labels[] = $date->format('d.m.Y');
                $data[] = (int)$row->getMetricValues()[0]->getValue();
            }

            return response()->json([
                'labels' => $labels,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            \Log::error('Analytics pageviews error: ' . $e->getMessage());
            return response()->json(['error' => 'Sayfa görüntüleme verileri yüklenirken bir hata oluştu'], 500);
        }
    }

    public function browsers()
    {
        try {
            $response = $this->client->runReport([
                'property' => 'properties/' . $this->propertyId,
                'dateRanges' => [
                    new DateRange([
                        'start_date' => '30daysAgo',
                        'end_date' => 'today',
                    ]),
                ],
                'dimensions' => [
                    new Dimension(['name' => 'browser']),
                ],
                'metrics' => [
                    new Metric(['name' => 'activeUsers']),
                ],
            ]);

            $labels = [];
            $data = [];

            foreach ($response->getRows() as $row) {
                $labels[] = $row->getDimensionValues()[0]->getValue();
                $data[] = (int)$row->getMetricValues()[0]->getValue();
            }

            return response()->json([
                'labels' => $labels,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            \Log::error('Analytics browsers error: ' . $e->getMessage());
            return response()->json(['error' => 'Tarayıcı verileri yüklenirken bir hata oluştu'], 500);
        }
    }

    public function devices()
    {
        try {
            $response = $this->client->runReport([
                'property' => 'properties/' . $this->propertyId,
                'dateRanges' => [
                    new DateRange([
                        'start_date' => '30daysAgo',
                        'end_date' => 'today',
                    ]),
                ],
                'dimensions' => [
                    new Dimension(['name' => 'deviceCategory']),
                ],
                'metrics' => [
                    new Metric(['name' => 'activeUsers']),
                ],
            ]);

            $labels = [];
            $data = [];

            foreach ($response->getRows() as $row) {
                $labels[] = $row->getDimensionValues()[0]->getValue();
                $data[] = (int)$row->getMetricValues()[0]->getValue();
            }

            return response()->json([
                'labels' => $labels,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            \Log::error('Analytics devices error: ' . $e->getMessage());
            return response()->json(['error' => 'Cihaz verileri yüklenirken bir hata oluştu'], 500);
        }
    }

    public function locations()
    {
        try {
            $response = $this->client->runReport([
                'property' => 'properties/' . $this->propertyId,
                'dateRanges' => [
                    new DateRange([
                        'start_date' => '30daysAgo',
                        'end_date' => 'today',
                    ]),
                ],
                'dimensions' => [
                    new Dimension(['name' => 'country']),
                ],
                'metrics' => [
                    new Metric(['name' => 'activeUsers']),
                ],
            ]);

            $totalUsers = 0;
            foreach ($response->getRows() as $row) {
                $totalUsers += (int)$row->getMetricValues()[0]->getValue();
            }

            $countries = [];
            foreach ($response->getRows() as $row) {
                $users = (int)$row->getMetricValues()[0]->getValue();
                $countries[] = [
                    'name' => $row->getDimensionValues()[0]->getValue(),
                    'percentage' => round(($users / $totalUsers) * 100, 2),
                    'color' => 'blue'
                ];
            }

            return response()->json([
                'countries' => $countries
            ]);
        } catch (\Exception $e) {
            \Log::error('Analytics locations error: ' . $e->getMessage());
            return response()->json(['error' => 'Konum verileri yüklenirken bir hata oluştu'], 500);
        }
    }
}
