import { RoomCard } from "@/components/rooms/RoomCard";
import { RoomCardStack } from "@/components/rooms/stage/RoomCardStack";
import { RoomReviews } from "@/components/rooms/RoomReviews";
import { useDictionary } from "@/lib/DictionaryContext";
import type { HotelSettings, Room } from "@/lib/types";

/**
 * Everything under the cinematic stage. The bg-ink -> bg-surface -> bg-canvas
 * cascade is deliberate: it steps the page from the dark photo down to the
 * global Footer's bg-canvas so there's no jarring seam. If this band is ever
 * reordered, keep that progression intact.
 */
export function RoomDetailBand({
  room,
  rooms,
  settings,
}: {
  room: Room;
  rooms: Room[];
  settings: HotelSettings;
}) {
  const tr = useDictionary();
  const others = rooms.filter((r) => r.slug !== room.slug);

  return (
    <>
      <div className="bg-ink py-14">
        <p className="mx-auto max-w-[46ch] px-6 text-center font-serif text-2xl leading-snug text-white/90">
          {room.description}
        </p>
      </div>

      <div className="bg-surface py-20 xl:hidden">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <RoomCardStack room={room} rooms={rooms} settings={settings} />
        </div>
      </div>

      <div className="bg-surface">
        <RoomReviews room={room} />
      </div>

      <div className="bg-canvas py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <h2 className="font-serif text-2xl text-ink">{tr.roomStage.otherRooms}</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((r) => (
              <RoomCard key={r.id} room={r} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
