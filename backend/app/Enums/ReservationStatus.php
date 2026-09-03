<?php

namespace App\Enums;

// Admin panel (hotelReservation/backend/app/Enums/ReservationStatus.php)
// ile birebir aynı tutulur — aynı `reservations.status` enum kolonunu
// paylaşıyoruz.
enum ReservationStatus: string
{
    case Pending = 'pending';
    case Confirmed = 'confirmed';
    case CheckedIn = 'checked_in';
    case Completed = 'completed';
    case Cancelled = 'cancelled';

    /**
     * Bir odayı belirli tarihlerde "dolu" sayan statüler.
     *
     * @return list<self>
     */
    public static function activeStatuses(): array
    {
        return [self::Pending, self::Confirmed, self::CheckedIn];
    }
}
