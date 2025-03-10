<?php
// Debug için hataları göster
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Debug log dosyası
$logFile = __DIR__ . '/debug.log';
file_put_contents($logFile, date('Y-m-d H:i:s') . " - Request URI: " . $_SERVER['REQUEST_URI'] . "\n", FILE_APPEND);

// API istekleri için backend'e yönlendir
if (strpos($_SERVER['REQUEST_URI'], '/api') === 0 || strpos($_SERVER['REQUEST_URI'], '/sanctum/csrf-cookie') === 0) {
    file_put_contents($logFile, date('Y-m-d H:i:s') . " - API isteği yönlendiriliyor\n", FILE_APPEND);
    require __DIR__ . '/backend/public/index.php';
    exit;
}

// Frontend dosyasını serve et
$frontendPath = __DIR__ . '/frontend/mercan-frontend/dist/index.html';
$requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$staticPath = __DIR__ . '/frontend/mercan-frontend/dist' . $requestPath;

file_put_contents($logFile, date('Y-m-d H:i:s') . " - Frontend Path: " . $frontendPath . "\n", FILE_APPEND);
file_put_contents($logFile, date('Y-m-d H:i:s') . " - Static Path: " . $staticPath . "\n", FILE_APPEND);

// Eğer assets klasöründen bir dosya isteniyorsa
if (strpos($requestPath, '/assets/') === 0) {
    $assetsPath = __DIR__ . '/frontend/mercan-frontend/dist' . $requestPath;
    file_put_contents($logFile, date('Y-m-d H:i:s') . " - Assets dosyası istendi: " . $assetsPath . "\n", FILE_APPEND);
    
    if (file_exists($assetsPath)) {
        $extension = pathinfo($assetsPath, PATHINFO_EXTENSION);
        $contentTypes = [
            'js' => 'application/javascript',
            'css' => 'text/css',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'gif' => 'image/gif',
            'svg' => 'image/svg+xml',
            'ico' => 'image/x-icon',
            'woff' => 'application/font-woff',
            'woff2' => 'application/font-woff2'
        ];
        
        if (isset($contentTypes[$extension])) {
            header('Content-Type: ' . $contentTypes[$extension]);
        }
        
        readfile($assetsPath);
        exit;
    }
}

// Frontend rotaları için index.html'i serve et
if (in_array($requestPath, ['/', '/login', '/admin', '/register'])) {
    file_put_contents($logFile, date('Y-m-d H:i:s') . " - Frontend rotası tespit edildi: " . $requestPath . "\n", FILE_APPEND);
    
    if (file_exists($frontendPath)) {
        header('Content-Type: text/html');
        readfile($frontendPath);
        exit;
    }
}

// Eğer buraya kadar geldiyse 404 döndür
header("HTTP/1.0 404 Not Found");
file_put_contents($logFile, date('Y-m-d H:i:s') . " - 404: Dosya bulunamadı\n", FILE_APPEND);
echo "Sayfa bulunamadı";