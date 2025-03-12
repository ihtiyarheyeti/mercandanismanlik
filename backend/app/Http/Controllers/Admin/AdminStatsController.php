<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Google\Analytics\Data\V1beta\BetaAnalyticsDataClient;
use Google\Analytics\Data\V1beta\DateRange;
use Google\Analytics\Data\V1beta\Dimension;
use Google\Analytics\Data\V1beta\Metric;
use Google\Analytics\Data\V1beta\RunReportRequest;

class AdminStatsController extends Controller
{
    private $propertyId;
    private $client;

    public function __construct()
    {
        $measurementId = env('ANALYTICS_PROPERTY_ID'); // G-X1XZMW4M37
        $this->propertyId = str_replace('G-', '', $measurementId);
        $this->client = new BetaAnalyticsDataClient([
            'credentials' => storage_path('app/analytics/service-account-credentials.json')
        ]);
    }

    public function overview()
    {
        try {
            $request = new RunReportRequest([
                'property' => 'properties/' . $this->propertyId,
                'date_ranges' => [
                    new DateRange([
                        'start_date' => '7daysAgo',
                        'end_date' => 'today',
                    ]),
                ],
                'metrics' => [
                    new Metric(['name' => 'totalUsers']),
                    new Metric(['name' => 'activeUsers']),
                    new Metric(['name' => 'screenPageViews']),
                    new Metric(['name' => 'averageSessionDuration']),
                ],
            ]);

            $response = $this->client->runReport($request);
            $row = $response->getRows()[0];

            return response()->json([
                'total_visitors' => (int)$row->getMetricValues()[0]->getValue(),
                'active_users' => (int)$row->getMetricValues()[1]->getValue(),
                'page_views' => (int)$row->getMetricValues()[2]->getValue(),
                'avg_session_duration' => gmdate("H:i:s", (int)$row->getMetricValues()[3]->getValue()),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function visitors()
    {
        try {
            $request = new RunReportRequest([
                'property' => 'properties/' . $this->propertyId,
                'date_ranges' => [
                    new DateRange([
                        'start_date' => '7daysAgo',
                        'end_date' => 'today',
                    ]),
                ],
                'dimensions' => [
                    new Dimension(['name' => 'date']),
                ],
                'metrics' => [
                    new Metric(['name' => 'totalUsers']),
                ],
            ]);

            $response = $this->client->runReport($request);
            
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
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function pageViews()
    {
        try {
            $request = new RunReportRequest([
                'property' => 'properties/' . $this->propertyId,
                'date_ranges' => [
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
            ]);

            $response = $this->client->runReport($request);
            
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
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function browsers()
    {
        try {
            $request = new RunReportRequest([
                'property' => 'properties/' . $this->propertyId,
                'date_ranges' => [
                    new DateRange([
                        'start_date' => '30daysAgo',
                        'end_date' => 'today',
                    ]),
                ],
                'dimensions' => [
                    new Dimension(['name' => 'browser']),
                ],
                'metrics' => [
                    new Metric(['name' => 'totalUsers']),
                ],
            ]);

            $response = $this->client->runReport($request);
            
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
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function devices()
    {
        try {
            $request = new RunReportRequest([
                'property' => 'properties/' . $this->propertyId,
                'date_ranges' => [
                    new DateRange([
                        'start_date' => '30daysAgo',
                        'end_date' => 'today',
                    ]),
                ],
                'dimensions' => [
                    new Dimension(['name' => 'deviceCategory']),
                ],
                'metrics' => [
                    new Metric(['name' => 'totalUsers']),
                ],
            ]);

            $response = $this->client->runReport($request);
            
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
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function locations()
    {
        try {
            $request = new RunReportRequest([
                'property' => 'properties/' . $this->propertyId,
                'date_ranges' => [
                    new DateRange([
                        'start_date' => '30daysAgo',
                        'end_date' => 'today',
                    ]),
                ],
                'dimensions' => [
                    new Dimension(['name' => 'country']),
                ],
                'metrics' => [
                    new Metric(['name' => 'totalUsers']),
                ],
            ]);

            $response = $this->client->runReport($request);
            
            $countries = [];
            $colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
            $i = 0;
            
            foreach ($response->getRows() as $row) {
                $countries[] = [
                    'name' => $row->getDimensionValues()[0]->getValue(),
                    'percentage' => (int)$row->getMetricValues()[0]->getValue(),
                    'color' => $colors[$i % count($colors)]
                ];
                $i++;
            }

            return response()->json([
                'countries' => $countries
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
