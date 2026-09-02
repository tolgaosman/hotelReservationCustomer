import type { Reservation } from "./types";

/**
 * Mirrors ReservationService::hasConflict() in the admin backend
 * (hotelReservation/backend/app/Services/ReservationService.php):
 * same-day turnover is allowed (a checkout and a checkin can share a date),
 * any other date overlap among pending/confirmed/checked_in reservations
 * blocks the room.
 */
const BLOCKING_STATUSES: Reservation["status"][] = [
  "pending",
  "confirmed",
  "checked_in",
];

export function hasConflict(
  reservations: Reservation[],
  roomId: number,
  checkIn: string,
  checkOut: string,
): boolean {
  const start = new Date(checkIn).getTime();
  const end = new Date(checkOut).getTime();

  return reservations.some((reservation) => {
    if (reservation.roomId !== roomId) return false;
    if (!BLOCKING_STATUSES.includes(reservation.status)) return false;

    const existingStart = new Date(reservation.checkIn).getTime();
    const existingEnd = new Date(reservation.checkOut).getTime();

    return start < existingEnd && end > existingStart;
  });
}
