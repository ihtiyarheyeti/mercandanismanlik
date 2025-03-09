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
        Log::info('Login isteği alındı', [
            'email' => $request->email,
            'headers' => $request->headers->all(),
            'ip' => $request->ip()
        ]);

        try {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);

            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $token = $user->createToken('auth-token')->plainTextToken;
                
                Log::info('Giriş başarılı', [
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'token' => $token
                ]);

                return response()->json([
                    'status' => 'success',
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                    'user' => $user
                ], 200, [
                    'Content-Type' => 'application/json',
                    'Access-Control-Allow-Origin' => 'https://mercandanismanlik.com',
                    'Access-Control-Allow-Credentials' => 'true'
                ]);
            }

            Log::warning('Giriş başarısız - Kimlik bilgileri hatalı', [
                'email' => $request->email
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Geçersiz kimlik bilgileri'
            ], 401, [
                'Content-Type' => 'application/json'
            ]);

        } catch (\Exception $e) {
            Log::error('Login hatası', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Giriş işlemi sırasında bir hata oluştu',
                'error' => $e->getMessage()
            ], 500, [
                'Content-Type' => 'application/json'
            ]);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Başarıyla çıkış yapıldı']);
    }
}
