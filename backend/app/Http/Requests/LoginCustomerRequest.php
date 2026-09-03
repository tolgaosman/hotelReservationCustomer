<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginCustomerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required_without:phone', 'nullable', 'email'],
            'phone' => ['required_without:email', 'nullable', 'string'],
            'password' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required_without' => 'E-posta veya telefon numarası zorunludur.',
            'email.email' => 'Geçerli bir e-posta adresi giriniz.',
            'phone.required_without' => 'E-posta veya telefon numarası zorunludur.',
            'password.required' => 'Şifre zorunludur.',
        ];
    }
}
