<?php
$request = $_SERVER['REQUEST_URI'];

// API istekleri için
if (strpos($request, '/api') === 0) {
    require __DIR__ . '/backend/public/index.php';
    exit;
}

// Frontend için
$frontendPath = __DIR__ . '/frontend/mercan-frontend/dist/index.html';
readfile($frontendPath); 