<?php
// Debug için hataları göster
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Hata loglarını ayarla
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_errors.log');

// Debug mesajlarını error_log'a yaz
error_log("Request URI: " . $_SERVER['REQUEST_URI']);

// API istekleri için backend'e yönlendir
if (strpos($_SERVER['REQUEST_URI'], '/api') === 0 || strpos($_SERVER['REQUEST_URI'], '/sanctum/csrf-cookie') === 0) {
    error_log("API isteği yönlendiriliyor");
    require __DIR__ . '/backend/public/index.php';
    exit;
}

// Frontend dosyasını serve et
$frontendPath = __DIR__ . '/frontend/mercan-frontend/dist/index.html';
$requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$staticPath = __DIR__ . '/frontend/mercan-frontend/dist' . $requestPath;

// Assets için kontrol
if (strpos($requestPath, '/assets/') === 0) {
    if (file_exists($staticPath)) {
        $extension = pathinfo($staticPath, PATHINFO_EXTENSION);
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
        
        readfile($staticPath);
        exit;
    }
}

// Frontend rotaları için index.html'i serve et
if (file_exists($frontendPath)) {
    header('Content-Type: text/html');
    readfile($frontendPath);
    exit;
} else {
    error_log("Frontend dosyası bulunamadı: " . $frontendPath);
    header("HTTP/1.0 404 Not Found");
    echo "Frontend dosyası bulunamadı";
}