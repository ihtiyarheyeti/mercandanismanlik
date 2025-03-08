<?php
// Frontend'e yönlendir
$path = $_SERVER['REQUEST_URI'];

// Eğer API isteği ise backend'e yönlendir
if (strpos($path, '/api') === 0) {
    require __DIR__ . '/backend/public/index.php';
    exit;
}

// Frontend dosyasına yönlendir
$frontendPath = __DIR__ . '/frontend/mercan-frontend/dist/index.html';
if (file_exists($frontendPath)) {
    readfile($frontendPath);
    exit;
} else {
    header("HTTP/1.0 404 Not Found");
    echo "Frontend dosyası bulunamadı: " . $frontendPath;
} 