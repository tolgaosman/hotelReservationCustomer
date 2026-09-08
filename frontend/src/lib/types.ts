/**
 * Types mirror the Laravel admin-panel models 1:1 (see
 * hotelReservation/backend/app/Models + database/migrations) so the data
 * layer can later be swapped for real API calls without reshaping anything
 * that already renders. Fields marked "not in backend yet" are additions
 * this site needs (photos, descriptions, slugs) that don't exist as
 * columns yet Ã¢â‚¬â€ the admin schema only carries a flat room catalog.
 */

export type RoomType =
  | "Standart"
  | "Deluxe"
  | "Aile OdasÃ„Â±"
  | "Suite"
  | "King Suite";

export type RoomStatus = "available" | "occupied" | "maintenance" | "passive";

export interface Room {
  id: number;
  number: string;
  type: RoomType;
  capacity: number;
  nightlyRate: number;
  amenities: string[];
  status: RoomStatus;
  availableCount?: number;
  // --- not in backend yet ---
  slug: string;
  title: string;
  description: string;
  size: number; // mÃ‚Â²
  rating: number;
  reviewCount: number;
  reviews?: Review[];
  images: string[];
}

export interface Review {
  id: number;
  room_id?: number;
  reservation_id?: number;
  guest_name?: string;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at: string;
  room?: {
    number: string;
  };
  /** Only present when eager-loaded — see ReviewController::index. */
  reservation?: {
    guest?: {
      full_name: string;
    };
  };
}

export interface Addon {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface HotelSettings {
  name: string;
  email: string;
  phone: string;
  taxRate: number;
  checkInTime: string; // "HH:mm"
  checkOutTime: string; // "HH:mm"
  address: string;
  location: string;
}

export interface Guest {
  id: number;
  fullName: string;
  phone: string;
  email?: string;
  identityNumber: string;
  country?: string;
}

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "checked_in"
  | "completed"
  | "cancelled";

export interface Reservation {
  id: number;
  guestId: number;
  roomId: number;
  checkIn: string; // ISO date
  checkOut: string; // ISO date
  guestCount: number;
  status: ReservationStatus;
  totalAmount: number;
  note?: string;
  /** Sadece iliÃ…Å¸ki yÃƒÂ¼klendiÃ„Å¸inde gelir Ã¢â‚¬â€ bkz. ReservationResource. */
  room?: Room;
}

export interface BookingSearch {
  arrival: string;
  departure: string;
  guests: number;
  units: number;
}

export type RestaurantPaymentStatus = "waived" | "pay_at_hotel";

export interface RestaurantReservation {
  id: number;
  fullName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  partySize: number;
  paymentStatus: RestaurantPaymentStatus;
  amount: number;
}
