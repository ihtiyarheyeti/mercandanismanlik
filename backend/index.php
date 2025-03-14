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

$requestUri = $_SERVER['REQUEST_URI'];

// API istekleri için
if (strpos($requestUri, '/api') === 0 || strpos($requestUri, '/sanctum') === 0) {
    require __DIR__ . '/backend/public/index.php';
    exit;
}

// Frontend statik dosyaları için
$staticExtensions = ['js', 'css', 'png', 'jpg', 'jpeg', 'gif', 'ico', 'svg', 'woff', 'woff2'];
$extension = pathinfo($requestUri, PATHINFO_EXTENSION);

if (in_array($extension, $staticExtensions)) {
    $filePath = __DIR__ . '/frontend/mercan-frontend/dist' . $requestUri;
    if (file_exists($filePath)) {
        $mimeTypes = [
            'js' => 'application/javascript',
            'css' => 'text/css',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'gif' => 'image/gif',
            'ico' => 'image/x-icon',
            'svg' => 'image/svg+xml',
            'woff' => 'application/font-woff',
            'woff2' => 'application/font-woff2'
        ];
        
        if (isset($mimeTypes[$extension])) {
            header('Content-Type: ' . $mimeTypes[$extension]);
        }
        
        // Önbellek başlıkları
        header('Cache-Control: public, max-age=31536000');
        header('Expires: ' . gmdate('D, d M Y H:i:s \G\M\T', time() + 31536000));
        
        readfile($filePath);
        exit;
    }
}

// Frontend index.html için
$indexPath = __DIR__ . '/frontend/mercan-frontend/dist/index.html';
if (file_exists($indexPath)) {
    header('Content-Type: text/html');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');
    readfile($indexPath);
} else {
    header("HTTP/1.0 404 Not Found");
    echo "Frontend dosyası bulunamadı";
}