<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            \Log::error('Uygulama Hatası', [
                'hata_mesaji' => $e->getMessage(),
                'sinif' => get_class($e),
                'dosya' => $e->getFile(),
                'satir' => $e->getLine(),
                'iz' => $e->getTraceAsString(),
                'request' => [
                    'url' => request()->fullUrl(),
                    'method' => request()->method(),
                    'ip' => request()->ip(),
                    'user_agent' => request()->userAgent(),
                    'headers' => request()->headers->all(),
                    'input' => request()->except(['password', 'password_confirmation'])
                ]
            ]);
        });
    }
}
