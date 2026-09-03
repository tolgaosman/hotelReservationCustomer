<?php

namespace App\Enums;

// Admin panel (hotelReservation/backend/app/Enums/RoomStatus.php) ile
// birebir aynı tutulur — aynı `rooms.status` enum kolonunu paylaşıyoruz.
enum RoomStatus: string
{
    case Available = 'available';
    case Occupied = 'occupied';
    case Maintenance = 'maintenance';
    case Passive = 'passive';
}
