"use client";

import Image from "next/image";
import { Check, Clock, PawPrint, CigaretteOff, CalendarClock, CalendarX } from "lucide-react";
import { useDictionary } from "@/lib/DictionaryContext";
import type { HotelSettings, Room } from "@/lib/types";
import { AmenityList } from "@/components/rooms/AmenityList";

export function AboutSection({
  rooms,
  settings,
}: {
  rooms: Room[];
  settings: HotelSettings;
}) {
  const tr = useDictionary();
  const allAmenities = Array.from(new Set(rooms.flatMap((room) => room.amenities)));
  const featuredImage = rooms[3]?.images[0] ?? rooms[0]?.images[0];

  return (
    <section className="pattern-diamond py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="text-center">
          <span className="font-script text-4xl text-brand sm:text-5xl">
            {tr.about.heading}
          </span>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden bg-surface shadow-sm">
            {featuredImage && (
              <Image
                src={featuredImage}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            )}
          </div>
          <div className="bg-surface p-8 shadow-sm sm:p-12 lg:-ml-20 lg:mt-16">
            <p className="text-base leading-relaxed text-ink/80">
              {tr.about.body}
            </p>
            <button
              type="button"
              className="mt-8 text-[11px] tracking-[0.14em] text-brand underline underline-offset-4 transition-colors hover:text-brand-hover"
            >
              {tr.about.cta}
            </button>
          </div>
        </div>

        <div className="mt-8 grid divide-y divide-line bg-surface shadow-sm sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          <div className="flex items-center gap-4 p-8 sm:p-10">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand/10">
              <Clock className="size-5 text-brand" strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-[11px] tracking-[0.14em] text-label">
                {tr.info.checkIn}
              </p>
              <p className="mt-1 font-serif text-xl text-ink">
                {settings.checkInTime}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-8 sm:p-10">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand/10">
              <Clock className="size-5 text-brand" strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-[11px] tracking-[0.14em] text-label">
                {tr.info.checkOut}
              </p>
              <p className="mt-1 font-serif text-xl text-ink">
                {settings.checkOutTime}
              </p>
            </div>
          </div>

          <div className="p-8 sm:col-span-2 sm:p-10 lg:col-span-2">
            <p className="text-[11px] tracking-[0.14em] text-label">
              {tr.info.facilities}
            </p>
            <div className="mt-5">
              <AmenityList amenities={allAmenities} />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-surface p-8 shadow-sm sm:p-12">
          <p className="text-[11px] tracking-[0.14em] text-label">
            {tr.info.policies}
          </p>
          <ul className="mt-5 grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0">
            {tr.info.policiesList.map((policy: string, idx: number) => {
              const Icon = [PawPrint, CigaretteOff, CalendarClock, CalendarX][idx] || Check;
              return (
                <li
                  key={policy}
                  className="flex items-start gap-3 border-line py-3.5 text-sm text-ink/80 first:pt-0 last:pb-0 sm:py-4 sm:odd:pr-10 sm:even:pl-10 sm:[&:nth-child(-n+2)]:pt-0 sm:[&:not(:nth-last-child(-n+2))]:border-b sm:[&:nth-child(odd)]:border-r"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/10">
                    <Icon className="size-3 text-brand" strokeWidth={2} />
                  </span>
                  {policy}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
