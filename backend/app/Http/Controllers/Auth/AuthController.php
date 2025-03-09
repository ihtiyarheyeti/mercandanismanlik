<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    public function login(Request $request)
    {
        Log::debug('Login isteği detayları', [
            'tüm_request' => $request->all(),
            'headers' => $request->headers->all(),
            'session' => $request->session()->all(),
            'cookies' => $request->cookies->all()
        ]);

        Log::info('Giriş isteği başladı', [
            'email' => $request->email,
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'headers' => $request->headers->all()
        ]);

        try {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);

            Log::debug('Kimlik doğrulama başlıyor', [
                'email' => $request->email,
                'auth_check' => Auth::check(),
                'session_id' => session()->getId()
            ]);

            if (!Auth::attempt($credentials)) {
                Log::warning('Giriş başarısız - Kimlik bilgileri hatalı', [
                    'email' => $request->email,
                    'ip' => $request->ip(),
                    'timestamp' => now()->toDateTimeString()
                ]);

                return response()->json([
                    'message' => 'E-posta veya şifre hatalı'
                ], 401);
            }

            $user = Auth::user();
            Log::debug('Token oluşturuluyor', [
                'user_id' => $user->id,
                'auth_check' => Auth::check()
            ]);

            $token = $user->createToken('auth-token')->plainTextToken;

            Log::debug('Token oluşturuldu', [
                'token_length' => strlen($token),
                'user_id' => $user->id
            ]);

            Log::info('Giriş başarılı', [
                'user_id' => $user->id,
                'email' => $user->email,
                'ip' => $request->ip(),
                'timestamp' => now()->toDateTimeString(),
                'token_type' => 'Sanctum'
            ]);

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Giriş hatası', [
                'hata_mesaji' => $e->getMessage(),
                'sinif' => get_class($e),
                'dosya' => $e->getFile(),
                'satir' => $e->getLine(),
                'iz' => $e->getTraceAsString(),
                'request' => [
                    'email' => $request->email,
                    'ip' => $request->ip(),
                    'timestamp' => now()->toDateTimeString()
                ]
            ]);

            return response()->json([
                'message' => 'Bir hata oluştu',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            
            return response()->json([
                'status' => 'success',
                'message' => 'Çıkış başarılı'
            ]);
        } catch (\Exception $e) {
            Log::error('Logout hatası', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Çıkış yapılırken bir hata oluştu'
            ], 500);
        }
    }
}
