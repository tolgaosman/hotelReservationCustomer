<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'arrival' => ['required', 'date_format:Y-m-d', 'after_or_equal:today'],
            'departure' => ['required', 'date_format:Y-m-d', 'after:arrival'],
            'guests' => ['required', 'integer', 'min:1', 'max:10'],
            'units' => ['nullable', 'integer', 'min:1'],
            'excludeReservationId' => ['nullable', 'integer', 'exists:reservations,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'arrival.required' => 'Giriş tarihi zorunludur.',
            'arrival.after_or_equal' => 'Giriş tarihi bugünden önce olamaz.',
            'departure.required' => 'Çıkış tarihi zorunludur.',
            'departure.after' => 'Çıkış tarihi, giriş tarihinden sonra olmalıdır.',
            'guests.required' => 'Misafir sayısı zorunludur.',
            'guests.min' => 'En az 1 misafir olmalıdır.',
            'guests.max' => 'En fazla 10 misafir seçilebilir.',
        ];
    }
}
