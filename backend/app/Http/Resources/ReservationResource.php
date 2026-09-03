<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'guestId' => $this->guest_id,
            'roomId' => $this->room_id,
            'checkIn' => $this->check_in->format('Y-m-d'),
            'checkOut' => $this->check_out->format('Y-m-d'),
            'guestCount' => (int) $this->guest_count,
            'status' => $this->status->value,
            'totalAmount' => (float) $this->total_amount,
            'note' => $this->note,
            'guest' => new GuestResource($this->whenLoaded('guest')),
            'room' => new RoomResource($this->whenLoaded('room')),
        ];
    }
}
