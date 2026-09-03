<?php

namespace App\Models;

use App\Enums\ReservationStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Mevcut admin panel tablosuna bağlanır; `note` kolonu bu proje
 * tarafından eklenmiştir (bkz. 2026_09_03_071036 migration).
 *
 * `check_out > check_in` DB seviyesinde CHECK constraint ile zorlanır.
 */
class Reservation extends Model
{
    protected $fillable = [
        'guest_id',
        'room_id',
        'check_in',
        'check_out',
        'guest_count',
        'status',
        'total_amount',
        'created_by',
        'note',
    ];

    protected function casts(): array
    {
        return [
            'check_in' => 'date',
            'check_out' => 'date',
            'guest_count' => 'integer',
            'status' => ReservationStatus::class,
            'total_amount' => 'decimal:2',
        ];
    }

    public function guest(): BelongsTo
    {
        return $this->belongsTo(Guest::class);
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }
}
