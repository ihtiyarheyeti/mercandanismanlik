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

error_log("Frontend Path: " . $frontendPath);
error_log("Static Path: " . $staticPath);
error_log("Request Path: " . $requestPath);

// Dosya varlığını kontrol et
error_log("Frontend dosyası var mı: " . (file_exists($frontendPath) ? 'Evet' : 'Hayır'));
error_log("Static dosya var mı: " . (file_exists($staticPath) ? 'Evet' : 'Hayır'));

// Eğer assets klasöründen bir dosya isteniyorsa
if (strpos($requestPath, '/assets/') === 0) {
    $assetsPath = __DIR__ . '/frontend/mercan-frontend/dist' . $requestPath;
    error_log("Assets dosyası istendi: " . $assetsPath);
    error_log("Assets dosyası var mı: " . (file_exists($assetsPath) ? 'Evet' : 'Hayır'));
    
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
    error_log("Frontend rotası tespit edildi: " . $requestPath);
    
    if (file_exists($frontendPath)) {
        error_log("index.html serve ediliyor");
        header('Content-Type: text/html');
        readfile($frontendPath);
        exit;
    } else {
        error_log("index.html bulunamadı: " . $frontendPath);
    }
}

// Eğer buraya kadar geldiyse 404 döndür
error_log("404: Dosya bulunamadı - " . $requestPath);
header("HTTP/1.0 404 Not Found");
echo "Sayfa bulunamadı";