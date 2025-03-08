<?php
// API istekleri için
if (strpos($_SERVER['REQUEST_URI'], '/api') === 0) {
    require __DIR__ . '/backend/public/index.php';
    exit;
}

// Frontend için
readfile(__DIR__ . '/frontend/mercan-frontend/dist/index.html'); 