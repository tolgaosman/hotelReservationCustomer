import { tr } from "@/lib/dictionary";
import { formatDate, formatTRY, nights } from "@/lib/format";
import { hotelSettings } from "@/lib/mock-data";
import { priceStay } from "@/lib/pricing";
import type { Room } from "@/lib/types";
import type { GuestDetails } from "./GuestDetailsForm";

export function BookingSummary({
  room,
  arrival,
  departure,
  guests,
  guestDetails,
}: {
  room: Room;
  arrival: Date;
  departure: Date;
  guests: number;
  guestDetails: GuestDetails;
}) {
  const n = nights(arrival, departure);
  const { roomTotal, taxAmount, total } = priceStay(
    room.nightlyRate,
    hotelSettings.taxRate,
    n,
  );

  const rows: [string, string][] = [
    [tr.reservation.summary.room, room.title],
    [
      tr.reservation.summary.dates,
      `${formatDate(arrival)} — ${formatDate(departure)}`,
    ],
    [tr.reservation.summary.nights, String(n)],
    [tr.reservation.summary.guests, String(guests)],
    [tr.reservation.guestDetails.fullName, guestDetails.fullName],
    [tr.reservation.guestDetails.email, guestDetails.email],
    [tr.reservation.guestDetails.phone, guestDetails.phone],
    [tr.rooms.roomRate, formatTRY(roomTotal)],
    [tr.rooms.taxLabel(hotelSettings.taxRate), formatTRY(taxAmount)],
  ];

  return (
    <div className="border border-line p-6 sm:p-8">
      <dl className="divide-y divide-line">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between py-3">
            <dt className="text-[11px] tracking-[0.1em] text-label">{label}</dt>
            <dd className="text-sm text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <span className="text-[11px] tracking-[0.1em] text-label">
          {tr.reservation.summary.total}
        </span>
        <span className="font-serif text-2xl text-ink">{formatTRY(total)}</span>
      </div>
    </div>
  );
}
