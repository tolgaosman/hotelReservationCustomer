<?php

namespace App\Models;

use App\Enums\ReservationStatus;
use App\Enums\RoomStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Mevcut admin panel tablosuna bağlanır (hotelReservation/backend). Bu
 * proje o tabloya kolon eklemez; sadece müşteriye açık alanları okur.
 */
class Room extends Model
{
    protected $fillable = [
        'number',
        'type',
        'capacity',
        'nightly_rate',
        'amenities',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'capacity' => 'integer',
            'nightly_rate' => 'decimal:2',
            'amenities' => 'array',
            'status' => RoomStatus::class,
        ];
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    /**
     * Bu odanın tipine ait pazarlama içeriği (slug/title/görseller/...).
     */
    public function typeContent(): BelongsTo
    {
        return $this->belongsTo(RoomTypeContent::class, 'type', 'type');
    }

    public function scopeAvailable(Builder $query): Builder
    {
        return $query->where('status', RoomStatus::Available);
    }

    /**
     * Verilen tarih aralığında (yarı-açık: [checkIn, checkOut)) dolu
     * olmayan odalar. Admin panelin ReservationService::hasConflict() ve
     * frontend'in lib/availability.ts ile aynı çakışma mantığı — aynı gün
     * devir (checkout gününde yeni checkin) serbesttir.
     *
     * `pending` durumundaki rezervasyonlar da bloklayıcıdır (admin panel
     * ReservationStatus::activeStatuses() ile aynı davranış), aksi halde
     * aynı odaya çifte rezervasyon oluşabilir.
     */
    public function scopeFreeBetween(Builder $query, string $checkIn, string $checkOut, ?int $excludeReservationId = null): Builder
    {
        $blocking = array_map(
            fn (ReservationStatus $s) => $s->value,
            ReservationStatus::activeStatuses(),
        );

        return $query->whereDoesntHave('reservations', function (Builder $r) use ($checkIn, $checkOut, $blocking, $excludeReservationId) {
            $r->whereIn('status', $blocking)
                ->where('check_in', '<', $checkOut)
                ->where('check_out', '>', $checkIn)
                ->when($excludeReservationId, fn ($q, $id) => $q->where('id', '!=', $id));
        });
    }
}
