import type {
  HotelSettings,
  Reservation,
  ReservationStatus,
  Room,
  Addon,
  Review,
  RestaurantReservation,
} from "./types";

/**
 * Laravel backend (hotelReservationCustomer/backend). Defaults to the local
 * dev server; override with NEXT_PUBLIC_API_URL in .env.local for other
 * environments.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001/api";

/** TarayÃ„Â±cÃ„Â±yÃ„Â± bu adrese tam sayfa yÃƒÂ¶nlendirmesiyle gÃƒÂ¶nderin (fetch deÃ„Å¸il). */
export function googleAuthUrl(redirectTo: string): string {
  return `${API_URL}/auth/google/redirect?redirect=${encodeURIComponent(redirectTo)}`;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(
      res.status,
      body?.message ?? "Ã„Â°stek baÃ…Å¸arÃ„Â±sÃ„Â±z oldu, lÃƒÂ¼tfen tekrar deneyin.",
      body?.errors,
    );
  }

  const json = (await res.json()) as { data: T } | T;
  // BazÃ„Â± endpoint'ler (Addon/Review index) direkt array dÃƒÂ¶nÃƒÂ¼yor, data wrap olmayabilir.
  return (json && typeof json === 'object' && 'data' in json) ? (json as {data: T}).data : json as T;
}

export function getSettings(): Promise<HotelSettings> {
  return apiFetch<HotelSettings>("/settings", { next: { revalidate: 300 } });
}

export function getRooms(): Promise<Room[]> {
  return apiFetch<Room[]>("/rooms", { next: { revalidate: 300 } });
}

/** Returns null on 404 instead of throwing Ã¢â‚¬â€ callers use notFound(). */
export async function getRoom(slug: string): Promise<Room | null> {
  try {
    return await apiFetch<Room>(`/rooms/${slug}`, { next: { revalidate: 300 } });
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export function getAddons(): Promise<Addon[]> {
  return apiFetch<Addon[]>("/addons", { next: { revalidate: 300 } });
}

export function getReviews(): Promise<Review[]> {
  return apiFetch<Review[]>("/reviews", { next: { revalidate: 300 } });
}

export interface SearchParams {
  arrival: string; // YYYY-MM-DD
  departure: string; // YYYY-MM-DD
  guests: number;
  units?: number;
  excludeReservationId?: number;
}

export function searchRooms(params: SearchParams): Promise<Room[]> {
  return apiFetch<Room[]>("/search", {
    method: "POST",
    body: JSON.stringify(params),
    cache: "no-store",
  });
}

export interface CreateReservationInput {
  roomId: number;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  guestCount: number;
  note?: string;
  guest: {
    fullName: string;
    phone: string;
    email?: string;
    identityNumber: string;
    country?: string;
  };
  addonIds?: number[];
}

export interface CreatedReservation {
  id: number;
  guestId: number;
  roomId: number;
  checkIn: string;
  checkOut: string;
  guestCount: number;
  status: ReservationStatus;
  totalAmount: number;
}

export function createReservation(
  input: CreateReservationInput,
  token: string,
): Promise<CreatedReservation> {
  return apiFetch<CreatedReservation>("/reservations", {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export interface CreateReviewInput {
  reservation_id: number;
  room_id?: number;
  guest_name?: string;
  rating: number;
  comment?: string;
}

export function createReview(
  input: CreateReviewInput,
  token: string,
): Promise<Review> {
  return apiFetch<Review>("/reviews", {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });
}

/**
 * MÃƒÂ¼Ã…Å¸teri hesabÃ„Â±. Bu, admin panelin employee hesaplarÃ„Â±ndan ayrÃ„Â± bir
 * sistemdir Ã¢â‚¬â€ backend'deki AuthController/Customer modeline bakÃ„Â±n.
 */
export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  identityNumber?: string;
  createdAt?: string; // YYYY-MM-DD
}

/** GiriÃ…Å¸ yapmÃ„Â±Ã…Å¸ mÃƒÂ¼Ã…Å¸terinin kendi rezervasyonlarÃ„Â± (profil ekranÃ„Â±). */
export function fetchMyReservations(token: string): Promise<Reservation[]> {
  return apiFetch<Reservation[]>("/reservations", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
}

export interface UpdateReservationInput {
  roomId?: number;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  guestCount: number;
  note?: string;
}

export function updateReservation(
  id: number,
  input: UpdateReservationInput,
  token: string,
): Promise<Reservation> {
  return apiFetch<Reservation>(`/reservations/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function cancelReservation(
  id: number,
  token: string,
): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(`/reservations/${id}/cancel`, {
    method: "POST",
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface RegisterInput {
  fullName: string;
  email: string;
  phone: string;
  identityNumber?: string;
  password: string;
}

export type LoginInput =
  | { email: string; password: string; phone?: undefined }
  | { phone: string; password: string; email?: undefined };

async function authRequest(path: string, body: unknown): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      res.status,
      json?.message ?? "Ã„Â°stek baÃ…Å¸arÃ„Â±sÃ„Â±z oldu, lÃƒÂ¼tfen tekrar deneyin.",
      json?.errors,
    );
  }

  return { user: json.data as AuthUser, token: json.meta.token as string };
}

export function registerCustomer(input: RegisterInput): Promise<AuthResponse> {
  return authRequest("/auth/register", input);
}

export function loginCustomer(input: LoginInput): Promise<AuthResponse> {
  return authRequest("/auth/login", input);
}

export function fetchCurrentCustomer(token: string): Promise<AuthUser> {
  return apiFetch<AuthUser>("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
}

export async function logoutCustomer(token: string): Promise<void> {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
  });
}

export interface UpdateProfileInput {
  fullName: string;
  email: string;
  phone: string;
  identityNumber?: string;
  currentPassword?: string;
  password?: string;
  password_confirmation?: string;
}

export function updateProfile(
  input: UpdateProfileInput,
  token: string,
): Promise<AuthUser> {
  return apiFetch<AuthUser>("/auth/profile", {
    method: "PUT",
    body: JSON.stringify(input),
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });
}


export function getPhysicalRooms(): Promise<{id: number, number: string, type: string}[]> { return apiFetch<{id: number, number: string, type: string}[]>('/physical-rooms', { next: { revalidate: 300 } }); }

export interface CreateRestaurantReservationInput {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  partySize: number;
  fullName: string;
  phone: string;
  email?: string;
  note?: string;
  isHotelGuest: boolean;
  reservationId?: number;
  cardHolderName?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

/** Otel misafiri olmayanların da kullanabildiği public bir uç nokta — token gerekmez. */
export function createRestaurantReservation(
  input: CreateRestaurantReservationInput,
): Promise<RestaurantReservation> {
  return apiFetch<RestaurantReservation>("/restaurant-reservations", {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
  });
}
