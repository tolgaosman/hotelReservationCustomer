import Image from "next/image";
import Link from "next/link";
import { Users, Maximize, Star } from "lucide-react";
import { tr } from "@/lib/dictionary";
import { formatTRY } from "@/lib/format";
import type { Room } from "@/lib/types";

export function RoomCard({ room }: { room: Room }) {
  return (
    <Link
      href={`/odalar/${room.slug}`}
      className="group block overflow-hidden bg-surface shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl text-ink">{room.title}</h3>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-ink/80">
          <Star className="size-3.5 fill-brand text-brand" />
          <span className="font-medium text-ink">{room.rating.toFixed(1)}</span>
          <span className="text-label">({tr.rooms.reviews(room.reviewCount)})</span>
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs tracking-[0.08em] text-label">
          <span className="flex items-center gap-1.5">
            <Users className="size-3.5" strokeWidth={1.5} />
            {tr.rooms.capacity(room.capacity)}
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="size-3.5" strokeWidth={1.5} />
            {tr.rooms.size(room.size)}
          </span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
          <span className="text-lg text-ink">
            {formatTRY(room.nightlyRate)}
            <span className="ml-1 text-xs text-label">{tr.rooms.perNight}</span>
          </span>
          <span className="text-[11px] tracking-[0.14em] text-brand underline underline-offset-4">
            {tr.rooms.viewDetails}
          </span>
        </div>
      </div>
    </Link>
  );
}
