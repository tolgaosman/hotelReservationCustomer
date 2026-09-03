<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

/**
 * "Google ile devam et" — müşteri girişi/kaydı. Admin panelin employee
 * auth'uyla hiçbir ilişkisi yoktur (bkz. AuthController).
 *
 * Bu bir SPA + ayrı API akışıdır: buton tarayıcıyı doğrudan bu uca yönlendirir
 * (fetch değil, tam sayfa yönlendirmesi), Google'dan dönüşte token, frontend'e
 * query string üzerinden taşınır ve /auth/google/callback sayfası onu okuyup
 * oturumu (localStorage) kurar.
 */
class GoogleAuthController extends Controller
{
    public function redirect(Request $request): RedirectResponse
    {
        $redirectTo = $request->query('redirect', '/');

        return Socialite::driver('google')
            ->stateless()
            ->with(['state' => base64_encode($redirectTo)])
            ->redirect();
    }

    public function callback(Request $request): RedirectResponse
    {
        $frontendUrl = rtrim(env('FRONTEND_URL', 'http://localhost:3000'), '/');
        $redirectTo = $request->query('state')
            ? base64_decode((string) $request->query('state'))
            : '/';

        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
        } catch (\Throwable $e) {
            return redirect()->away($frontendUrl.'/login?error=google');
        }

        $customer = Customer::where('google_id', $googleUser->getId())->first();

        if (! $customer) {
            // Aynı e-postayla daha önce şifreyle kayıt olunmuşsa hesabı
            // Google ile eşleştir; yoksa yeni bir müşteri oluştur.
            $customer = Customer::where('email', $googleUser->getEmail())->first();

            if ($customer) {
                $customer->forceFill(['google_id' => $googleUser->getId()])->save();
            } else {
                $customer = Customer::create([
                    'full_name' => $googleUser->getName() ?: $googleUser->getNickname() ?: 'Google Kullanıcısı',
                    'email' => $googleUser->getEmail(),
                    // Google telefon numarası vermez — müşteri profil
                    // ekranından tamamlar (bkz. ProfileForm).
                    'phone' => '',
                    'google_id' => $googleUser->getId(),
                    'password' => Hash::make(Str::random(40)),
                ]);
            }
        }

        $token = Str::random(64);
        $customer->forceFill(['api_token' => hash('sha256', $token)])->save();

        return redirect()->away(
            $frontendUrl.'/auth/google/callback?token='.$token.'&redirect='.urlencode($redirectTo),
        );
    }
}
