<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ForceJsonResponse
{
    public function handle(Request $request, Closure $next)
    {
        // İstek header'larını ayarla
        $request->headers->set('Accept', 'application/json');
        
        // Response'u al
        $response = $next($request);
        
        // Response'un content type'ını ayarla
        $response->headers->set('Content-Type', 'application/json');

        // CORS başlıklarını ekle
        $response->headers->set('Access-Control-Allow-Origin', 'https://mercandanismanlik.com');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');

        // Response içeriğini kontrol et
        $content = $response->getContent();
        
        // Eğer response zaten JSON ise dokunma
        if ($this->isValidJson($content)) {
            return $response;
        }

        // JSON değilse, JSON formatına çevir
        $data = [
            'status' => $response->isSuccessful() ? 'success' : 'error',
            'data' => $content,
            'message' => strip_tags($content)
        ];

        return response()->json($data, $response->getStatusCode());
    }

    private function isValidJson($string) 
    {
        if (!is_string($string)) {
            return false;
        }
        
        json_decode($string);
        return json_last_error() === JSON_ERROR_NONE;
    }
} 