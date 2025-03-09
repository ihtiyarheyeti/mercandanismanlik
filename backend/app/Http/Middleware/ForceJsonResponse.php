<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ForceJsonResponse
{
    public function handle(Request $request, Closure $next)
    {
        $request->headers->set('Accept', 'application/json');
        
        $response = $next($request);
        
        // Response'un content type'ını kontrol et
        if (!$response->headers->has('Content-Type')) {
            $response->headers->set('Content-Type', 'application/json');
        }

        // CORS başlıklarını ekle
        $response->headers->set('Access-Control-Allow-Origin', 'https://mercandanismanlik.com');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');

        // Response içeriğini kontrol et
        $content = $response->getContent();
        if (is_string($content) && !json_decode($content)) {
            // Eğer JSON değilse, JSON formatına çevir
            $response->setContent(json_encode([
                'status' => 'error',
                'message' => strip_tags($content)
            ]));
        }
        
        return $response;
    }
} 