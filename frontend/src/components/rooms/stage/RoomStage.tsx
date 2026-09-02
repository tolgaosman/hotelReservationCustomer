"use client";

import { useEffect, useState } from "react";
import { tr } from "@/lib/dictionary";
import type { HotelSettings, Room } from "@/lib/types";
import { AmenityRail } from "./AmenityRail";
import { PriceCompareCard } from "./PriceCompareCard";
import { StageBackdrop } from "./StageBackdrop";
import { StageTitleBlock } from "./StageTitleBlock";
import { StayDetailCard } from "./StayDetailCard";
import { StoryPanel } from "./StoryPanel";
import { TripPlanCard } from "./TripPlanCard";

/**
 * Owns the gallery image index and keyboard navigation; renders the two
 * sibling compositions (mobile / desktop) with zero shared absolute
 * positioning between them — the flip is a hard breakpoint (`lg`), not a
 * gradual reflow, because the desktop layout cannot survive on a phone.
 */
export function RoomStage({
  room,
  rooms,
  settings,
}: {
  room: Room;
  rooms: Room[];
  settings: HotelSettings;
}) {
  const [active, setActive] = useState(0);
  const images = room.images;
  const go = (delta: number) =>
    setActive((i) => (i + delta + images.length) % images.length);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          "input, textarea, [role='dialog'], [data-slot='popover-content']",
        )
      )
        return;
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  return (
    <>
      <p aria-live="polite" className="sr-only">
        {tr.roomStage.imageCounter(active + 1, images.length)}
      </p>

      {/* Mobile / tablet (< lg): photo + bottom-left title block only. */}
      <section className="relative h-[68svh] min-h-[440px] w-full overflow-hidden bg-ink lg:hidden">
        <StageBackdrop images={images} active={active} title={room.title} />
        <div className="absolute inset-x-0 bottom-0 z-20 p-6">
          <StageTitleBlock
            room={room}
            imagesCount={images.length}
            active={active}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
            align="start"
          />
        </div>
      </section>

      {/* Desktop (>= lg): full cinematic stage. */}
      <section
        aria-label={tr.roomStage.stageAria(room.title)}
        className="relative isolate hidden h-[calc(100svh-var(--nav-h))] min-h-[680px] w-full overflow-hidden bg-ink lg:block"
      >
        <StageBackdrop images={images} active={active} title={room.title} />

        <div className="absolute inset-0 z-20 grid grid-cols-[64px_minmax(0,1fr)_360px] grid-rows-[1fr_auto] gap-8 p-8 xl:grid-cols-[minmax(84px,auto)_minmax(0,1fr)_400px] xl:gap-10 xl:p-10">
          <AmenityRail
            amenities={room.amenities}
            className="col-start-1 row-span-2 self-center justify-self-start"
          />

          <StoryPanel
            description={room.description}
            className="col-start-2 row-start-1 max-w-[380px] self-center justify-self-start"
          />

          <StageTitleBlock
            room={room}
            imagesCount={images.length}
            active={active}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
            className="relative z-30 col-start-2 row-start-2 justify-self-center"
          />

          <div className="col-start-3 row-span-2 flex max-h-full flex-col gap-4 self-center justify-self-end overflow-y-auto overscroll-contain py-1 [scrollbar-width:none]">
            <TripPlanCard />
            <StayDetailCard
              capacity={room.capacity}
              size={room.size}
              checkInTime={settings.checkInTime}
              checkOutTime={settings.checkOutTime}
            />
            <PriceCompareCard room={room} rooms={rooms} className="hidden xl:block" />
          </div>
        </div>

        <p className="absolute bottom-6 right-8 z-20 text-[10px] tracking-[0.2em] text-white/60">
          {tr.roomStage.scrollHint}
        </p>
      </section>
    </>
  );
}
