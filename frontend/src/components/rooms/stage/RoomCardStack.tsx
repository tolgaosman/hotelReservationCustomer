import type { HotelSettings, Room } from "@/lib/types";
import { PriceCompareCard } from "./PriceCompareCard";
import { StayDetailCard } from "./StayDetailCard";
import { TripPlanCard } from "./TripPlanCard";

/**
 * Cards that the stage hides at narrower breakpoints resurface here, in the
 * light detail band, as plain theme-native cards (no blur — the biggest
 * scroll-perf cost of this design on mid-range Android):
 * - Trip plan + stay detail: the stage only shows them from `lg` up.
 * - Price comparison: the stage only shows it from `xl` up (card-column
 *   height budget), so it stays visible here through the `lg`-`xl` range too.
 */
export function RoomCardStack({
  room,
  rooms,
  settings,
}: {
  room: Room;
  rooms: Room[];
  settings: HotelSettings;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TripPlanCard variant="plain" className="lg:hidden" />
      <StayDetailCard
        variant="plain"
        capacity={room.capacity}
        size={room.size}
        checkInTime={settings.checkInTime}
        checkOutTime={settings.checkOutTime}
        className="lg:hidden"
      />
      <PriceCompareCard
        variant="plain"
        room={room}
        rooms={rooms}
        className="sm:col-span-2 xl:hidden"
      />
    </div>
  );
}
