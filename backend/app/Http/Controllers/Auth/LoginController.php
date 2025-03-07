namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ], [
                'email.required' => 'E-posta adresi gereklidir.',
                'email.email' => 'Geçerli bir e-posta adresi giriniz.',
                'password.required' => 'Şifre gereklidir.'
            ]);

            if (!Auth::attempt($credentials)) {
                throw ValidationException::withMessages([
                    'email' => ['Verilen kimlik bilgileri kayıtlarımızla eşleşmiyor.']
                ]);
            }

            $user = Auth::user();
            $token = $user->createToken('auth-token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Giriş yapılırken bir hata oluştu.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return response()->json(['message' => 'Başarıyla çıkış yapıldı.']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Çıkış yapılırken bir hata oluştu.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 