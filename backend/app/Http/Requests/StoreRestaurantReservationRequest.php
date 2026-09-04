<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRestaurantReservationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date' => ['required', 'date_format:Y-m-d', 'after_or_equal:today'],
            'time' => ['required', 'date_format:H:i'],
            'partySize' => ['required', 'integer', 'min:1', 'max:12'],
            'fullName' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:255'],
            'note' => ['nullable', 'string', 'max:1000'],

            'isHotelGuest' => ['required', 'boolean'],
            'reservationId' => ['required_if:isHotelGuest,true', 'nullable', 'integer', 'exists:reservations,id'],

            'cardHolderName' => ['required_if:isHotelGuest,false', 'nullable', 'string', 'max:255'],
            'cardNumber' => ['required_if:isHotelGuest,false', 'nullable', 'string', 'min:12', 'max:19'],
            'cardExpiry' => ['required_if:isHotelGuest,false', 'nullable', 'string', 'max:7'],
            'cardCvc' => ['required_if:isHotelGuest,false', 'nullable', 'string', 'min:3', 'max:4'],
        ];
    }

    public function messages(): array
    {
        return [
            'date.required' => 'Tarih zorunludur.',
            'date.after_or_equal' => 'Tarih bugünden önce olamaz.',
            'time.required' => 'Saat zorunludur.',
            'partySize.required' => 'Kişi sayısı zorunludur.',
            'partySize.min' => 'En az 1 kişi olmalıdır.',
            'fullName.required' => 'Ad soyad zorunludur.',
            'phone.required' => 'Telefon numarası zorunludur.',
            'email.email' => 'Geçerli bir e-posta adresi giriniz.',
            'reservationId.required_if' => 'Otel misafiriyseniz rezervasyon numaranızı giriniz.',
            'reservationId.exists' => 'Bu rezervasyon numarası bulunamadı.',
            'cardHolderName.required_if' => 'Kart üzerindeki isim zorunludur.',
            'cardNumber.required_if' => 'Kart numarası zorunludur.',
            'cardExpiry.required_if' => 'Son kullanma tarihi zorunludur.',
            'cardCvc.required_if' => 'CVC zorunludur.',
        ];
    }
}
