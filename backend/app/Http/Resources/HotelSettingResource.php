<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HotelSettingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'phone' => (string) ($this->phone ?? ''),
            'taxRate' => (float) $this->tax_rate,
            // Stored as a full TIME column (HH:MM:SS); frontend "HH:mm" bekler.
            'checkInTime' => substr((string) $this->check_in_time, 0, 5),
            'checkOutTime' => substr((string) $this->check_out_time, 0, 5),
            'address' => (string) ($this->address ?? ''),
            'location' => (string) ($this->location ?? ''),
        ];
    }
}
