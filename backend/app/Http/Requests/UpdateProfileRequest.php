<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator as ValidatorContract;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'fullName' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('customers', 'email')->ignore($this->customerId())],
            'phone' => ['required', 'string', 'max:30'],
            'identityNumber' => ['nullable', 'string', 'max:50'],
            'currentPassword' => ['required_with:password', 'string'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ];
    }

    public function messages(): array
    {
        return [
            'fullName.required' => 'Ad soyad zorunludur.',
            'email.required' => 'E-posta zorunludur.',
            'email.email' => 'Geçerli bir e-posta adresi giriniz.',
            'email.unique' => 'Bu e-posta adresi zaten kayıtlı.',
            'phone.required' => 'Telefon numarası zorunludur.',
            'currentPassword.required_with' => 'Şifrenizi değiştirmek için mevcut şifrenizi giriniz.',
            'password.min' => 'Şifre en az 8 karakter olmalıdır.',
            'password.confirmed' => 'Yeni şifre tekrarı eşleşmiyor.',
        ];
    }

    /**
     * Mevcut şifre, yeni bir şifre talep edildiğinde doğrulanır — bu bir
     * `rules()` kısıtı değil (hash karşılaştırması gerektirir), bu yüzden
     * `withValidator` içinde ele alınır.
     */
    public function withValidator(ValidatorContract $validator): void
    {
        $validator->after(function (ValidatorContract $validator) {
            if (! $this->filled('password')) {
                return;
            }

            $customer = $this->customer();
            if ($customer && ! Hash::check((string) $this->input('currentPassword'), $customer->password)) {
                $validator->errors()->add('currentPassword', 'Mevcut şifreniz hatalı.');
            }
        });
    }

    private function customer(): ?\App\Models\Customer
    {
        return $this->attributes->get('customer');
    }

    private function customerId(): ?int
    {
        return $this->customer()?->id;
    }
}
