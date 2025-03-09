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

// Frontend dosyasını serve et
$frontendPath = __DIR__ . '/frontend/mercan-frontend/dist/index.html';
if (file_exists($frontendPath)) {
    readfile($frontendPath);
    exit;
} else {
    header("HTTP/1.0 404 Not Found");
    echo "Frontend dosyası bulunamadı: " . $frontendPath;
}