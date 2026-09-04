<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RestaurantReservationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'fullName' => $this->full_name,
            'date' => $this->date->format('Y-m-d'),
            'time' => $this->time,
            'partySize' => (int) $this->party_size,
            'paymentStatus' => $this->payment_status->value,
            'amount' => (float) $this->amount,
        ];
    }
}
