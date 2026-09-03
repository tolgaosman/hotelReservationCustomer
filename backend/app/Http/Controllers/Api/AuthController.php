<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginCustomerRequest;
use App\Http\Requests\RegisterCustomerRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * Müşteri kayıt/giriş uçları. Admin panelin employee auth'uyla (ayrı
 * `users` tablosu, ayrı guard) hiçbir kod veya veri paylaşımı yoktur —
 * bkz. Customer modeli ve customers migration'ı.
 */
class AuthController extends Controller
{
    public function register(RegisterCustomerRequest $request): JsonResponse
    {
        $data = $request->validated();

        $customer = Customer::create([
            'full_name' => $data['fullName'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'identity_number' => $data['identityNumber'] ?? null,
            'password' => $data['password'],
        ]);

        $token = $this->issueToken($customer);

        return (new CustomerResource($customer))
            ->additional(['meta' => ['token' => $token]])
            ->response()
            ->setStatusCode(201);
    }

    public function login(LoginCustomerRequest $request): JsonResponse
    {
        $data = $request->validated();

        // E-posta veya telefonla giriş — bkz. LoginCustomerRequest (ikisinden
        // tam olarak biri gönderilir).
        $customer = ! empty($data['email'])
            ? Customer::where('email', $data['email'])->first()
            : Customer::where('phone', $data['phone'])->first();

        if (! $customer || ! Hash::check($data['password'], $customer->password)) {
            throw new HttpException(422, 'E-posta/Telefon veya şifre hatalı.');
        }

        $token = $this->issueToken($customer);

        return (new CustomerResource($customer))
            ->additional(['meta' => ['token' => $token]])
            ->response();
    }

    public function logout(Request $request): JsonResponse
    {
        $request->attributes->get('customer')->update(['api_token' => null]);

        return response()->json(['data' => null]);
    }

    public function me(Request $request): JsonResponse
    {
        return (new CustomerResource($request->attributes->get('customer')))->response();
    }

    public function updateProfile(UpdateProfileRequest $request): JsonResponse
    {
        $data = $request->validated();

        /** @var Customer $customer */
        $customer = $request->attributes->get('customer');

        $customer->fill([
            'full_name' => $data['fullName'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'identity_number' => $data['identityNumber'] ?? null,
        ]);

        if (! empty($data['password'])) {
            $customer->password = $data['password'];
        }

        $customer->save();

        return (new CustomerResource($customer))->response();
    }

    private function issueToken(Customer $customer): string
    {
        $token = Str::random(64);
        $customer->forceFill(['api_token' => hash('sha256', $token)])->save();

        return $token;
    }
}
