"use client";

import { useMemo, useState } from "react";
import { tr } from "@/lib/dictionary";
import { cn } from "@/lib/utils";
import type { Room, RoomType } from "@/lib/types";
import { RoomCard } from "./RoomCard";

export function RoomsGrid({ rooms }: { rooms: Room[] }) {
  const types = useMemo(
    () => Array.from(new Set(rooms.map((r) => r.type))) as RoomType[],
    [rooms],
  );
  const [filter, setFilter] = useState<RoomType | "all">("all");

  const filtered =
    filter === "all" ? rooms : rooms.filter((r) => r.type === filter);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
          {tr.rooms.filterAll}
        </FilterButton>
        {types.map((type) => (
          <FilterButton
            key={type}
            active={filter === type}
            onClick={() => setFilter(type)}
          >
            {type}
          </FilterButton>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-sm text-label">
          {tr.rooms.noResults}
        </p>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border px-5 py-2 text-[11px] tracking-[0.14em] transition-colors",
        active
          ? "border-brand bg-brand text-white"
          : "border-line text-ink/70 hover:border-ink/40 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
