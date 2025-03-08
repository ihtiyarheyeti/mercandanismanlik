<?php
// Debug için hataları göster
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// API istekleri için backend'e yönlendir
if (strpos($_SERVER['REQUEST_URI'], '/api') === 0) {
    require __DIR__ . '/backend/public/index.php';
    exit;
}

// Frontend dosyasını kontrol et
$requestUri = $_SERVER['REQUEST_URI'];
$frontendPath = __DIR__ . '/frontend/mercan-frontend/dist' . $requestUri;

// Debug için
error_log("Requested URI: " . $requestUri);
error_log("Looking for file: " . $frontendPath);

// Eğer istenen dosya varsa direkt serve et
if (is_file($frontendPath)) {
    $extension = pathinfo($frontendPath, PATHINFO_EXTENSION);
    
    // Content-Type header'ını ayarla
    switch($extension) {
        case 'css':
            header('Content-Type: text/css');
            break;
        case 'js':
            header('Content-Type: application/javascript');
            break;
        case 'png':
            header('Content-Type: image/png');
            break;
        case 'jpg':
        case 'jpeg':
            header('Content-Type: image/jpeg');
            break;
        case 'svg':
            header('Content-Type: image/svg+xml');
            break;
        case 'woff':
            header('Content-Type: application/font-woff');
            break;
        case 'woff2':
            header('Content-Type: application/font-woff2');
            break;
        case 'json':
            header('Content-Type: application/json');
            break;
    }
    
    // Cache headers
    header('Cache-Control: public, max-age=31536000');
    header('Expires: ' . gmdate('D, d M Y H:i:s', time() + 31536000) . ' GMT');
    
    readfile($frontendPath);
    exit;
}

// Debug için
error_log("File not found, serving index.html");

// Dosya bulunamazsa index.html'i serve et
header('Content-Type: text/html');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');
readfile(__DIR__ . '/frontend/mercan-frontend/dist/index.html'); 