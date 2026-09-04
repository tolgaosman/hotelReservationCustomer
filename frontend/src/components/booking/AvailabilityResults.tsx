import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Users } from "lucide-react";
import { tr } from "@/lib/dictionary";
import { formatTRY } from "@/lib/format";
import type { Room } from "@/lib/types";

export function AvailabilityResults({
  rooms,
  onSelect,
}: {
  rooms: Room[];
  onSelect: (room: Room) => void;
}) {
  const reduceMotion = useReducedMotion();

  if (rooms.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-label">
        {tr.rooms.noResults}
      </p>
    );
  }

  return (
    <div className="grid gap-6">
      {rooms.map((room, i) => (
        <motion.div
          key={room.id}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : i * 0.05 }}
          className="group grid gap-5 overflow-hidden rounded-2xl border border-line/40 bg-surface p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow hover:shadow-lg sm:grid-cols-[200px_1fr_auto] sm:items-center"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={room.images[0]}
              alt={room.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="200px"
            />
          </div>
          <div>
            <h3 className="font-serif text-lg text-ink">{room.title}</h3>
            <span className="mt-1 flex items-center gap-1.5 text-xs tracking-[0.08em] text-label">
              <Users className="size-3.5" strokeWidth={1.5} />
              {tr.rooms.capacity(room.capacity)}
              <span className="mx-2 opacity-30">•</span>
              <span className="font-medium text-brand">
                {tr.rooms.availableCount(room.availableCount || Math.max(1, room.id % 4 + 1))}
              </span>
            </span>
            <p className="mt-2 text-lg text-ink">
              {formatTRY(room.nightlyRate)}
              <span className="ml-1 text-xs text-label">{tr.rooms.perNight}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelect(room)}
            className="h-11 rounded-xl border border-brand px-8 text-[11px] tracking-[0.14em] text-brand transition-colors hover:bg-brand hover:text-white sm:justify-self-end"
          >
            {tr.reservation.selectRoom}
          </button>
        </motion.div>
      ))}
    </div>
  );
}
