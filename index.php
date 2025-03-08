<?php
// API istekleri için backend'e yönlendir
if (strpos($_SERVER['REQUEST_URI'], '/api') === 0) {
    require __DIR__ . '/backend/public/index.php';
    exit;
}

// Frontend dosyasını kontrol et
$requestUri = $_SERVER['REQUEST_URI'];
$frontendPath = __DIR__ . '/frontend/mercan-frontend/dist' . $requestUri;

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
    }
    
    readfile($frontendPath);
    exit;
}

// Dosya bulunamazsa index.html'i serve et
readfile(__DIR__ . '/frontend/mercan-frontend/dist/index.html'); 