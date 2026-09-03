<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator as ValidatorContract;
use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

class UpdateReservationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'roomId' => ['nullable', 'integer', 'exists:rooms,id'],
            'checkIn' => ['required', 'date_format:Y-m-d'],
            'checkOut' => ['required', 'date_format:Y-m-d', 'after:checkIn'],
            'guestCount' => ['required', 'integer', 'min:1', 'max:10'],
            'note' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'checkIn.required' => 'Giriş tarihi zorunludur.',
            'checkOut.required' => 'Çıkış tarihi zorunludur.',
            'checkOut.after' => 'Çıkış tarihi, giriş tarihinden sonra olmalıdır.',
            'guestCount.required' => 'Misafir sayısı zorunludur.',
            'guestCount.min' => 'En az 1 misafir olmalıdır.',
        ];
    }

    public function withValidator(ValidatorContract $validator): void
    {
        $validator->after(function (ValidatorContract $validator) {
            /** @var \App\Models\Reservation $reservation */
            $reservation = $this->route('reservation');
            if (! $reservation) {
                return;
            }

            $roomId = $this->input('roomId');
            $room = $roomId ? \App\Models\Room::find($roomId) : $reservation->room;
            if (! $room) {
                return;
            }

            $guestCount = (int) $this->input('guestCount');
            if ($guestCount > 0 && $guestCount > $room->capacity) {
                $validator->errors()->add('guestCount', 'Misafir sayısı bu oda tipinin kapasitesini aşıyor.');
            }
            
            $checkIn = $this->input('checkIn');
            if ($checkIn && Carbon::parse($checkIn)->startOfDay()->lt(Carbon::today())) {
                $validator->errors()->add('checkIn', 'Giriş tarihi bugünden önce olamaz.');
            }
        });
    }
}
