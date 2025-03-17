<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class MailTestController extends Controller
{
    public function testMail()
    {
        try {
            Mail::raw('Test mail içeriği', function($message) {
                $message->to(env('MAIL_FROM_ADDRESS'))
                        ->subject('Mail Test');
            });

            Log::info('Test mail gönderildi');
            
            return response()->json([
                'status' => 'success',
                'message' => 'Test mail başarıyla gönderildi'
            ]);
        } catch (\Exception $e) {
            Log::error('Mail test hatası: ' . $e->getMessage());
            
            return response()->json([
                'status' => 'error',
                'message' => 'Mail gönderilirken hata: ' . $e->getMessage()
            ], 500);
        }
    }
} 