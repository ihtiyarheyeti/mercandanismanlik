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
        // Gelen isteği logla
        Log::info('Login isteği alındı', [
            'email' => $request->email,
            'headers' => $request->headers->all(),
            'session_id' => $request->session()->getId(),
            'cookies' => $request->cookies->all()
        ]);

        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);

            // Kullanıcı kontrolü
            $user = User::where('email', $credentials['email'])->first();
            if (!$user) {
                Log::warning('Kullanıcı bulunamadı', ['email' => $credentials['email']]);
                return response()->json(['message' => 'Kullanıcı bulunamadı'], 401);
            }

            // Giriş denemesi
            if (!Auth::attempt($credentials)) {
                Log::warning('Şifre hatalı', ['email' => $credentials['email']]);
                return response()->json(['message' => 'Şifre hatalı'], 401);
            }

            // Token oluştur
            $token = $user->createToken('auth-token')->plainTextToken;

            Log::info('Login başarılı', [
                'user_id' => $user->id,
                'email' => $user->email,
                'token' => $token
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
            Log::error('Login hatası', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all()
            ]);

            return response()->json([
                'message' => 'Bir hata oluştu: ' . $e->getMessage()
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
