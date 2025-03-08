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
        try {
            Log::info('Login isteği başladı', [
                'email' => $request->email,
                'headers' => $request->headers->all(),
                'cookies' => $request->cookies->all()
            ]);

            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);

            if (!Auth::attempt($credentials)) {
                Log::warning('Giriş başarısız - kimlik doğrulama hatası', [
                    'email' => $request->email,
                    'ip' => $request->ip()
                ]);

                return response()->json([
                    'message' => 'E-posta veya şifre hatalı'
                ], 401);
            }

            $user = Auth::user();
            $token = $user->createToken('auth-token');

            Log::info('Token oluşturuldu', [
                'user_id' => $user->id,
                'token' => $token->plainTextToken,
                'abilities' => $token->accessToken->abilities ?? []
            ]);

            return response()->json([
                'access_token' => $token->plainTextToken,
                'token_type' => 'Bearer',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Login hatası', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'request' => [
                    'all' => $request->all(),
                    'headers' => $request->headers->all(),
                    'cookies' => $request->cookies->all()
                ]
            ]);

            return response()->json([
                'message' => 'Giriş yapılırken bir hata oluştu: ' . $e->getMessage()
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
