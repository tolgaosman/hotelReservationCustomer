<?php

namespace App\Http\Middleware;

use App\Models\Customer;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * Bearer token'ı `customers.api_token` üzerinden doğrular. Admin panelin
 * oturum/guard mekanizmasıyla hiçbir bağlantısı yoktur.
 */
class AuthenticateCustomer
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        $customer = $token
            ? Customer::where('api_token', hash('sha256', $token))->first()
            : null;

        if (! $customer) {
            throw new HttpException(401, 'Oturum bulunamadı, lütfen tekrar giriş yapın.');
        }

        $request->attributes->set('customer', $customer);

        return $next($request);
    }
}
