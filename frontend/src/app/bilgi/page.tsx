import type { Metadata } from "next";
import { Check, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { AmenityList } from "@/components/rooms/AmenityList";
import { tr } from "@/lib/dictionary";
import { heroSlides, hotelSettings, rooms } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: `${tr.info.heading} — ${tr.brand.name}`,
};

const allAmenities = Array.from(new Set(rooms.flatMap((room) => room.amenities)));

export default function InfoPage() {
  return (
    <main>
      <PageHero title={tr.info.heading} image={heroSlides[3]} />

      <section className="mx-auto max-w-[900px] px-6 py-20 lg:px-10">
        <div className="grid gap-8 border border-line p-8 sm:grid-cols-2">
          <div className="flex items-start gap-4">
            <Clock className="size-5 shrink-0 text-brand" strokeWidth={1.5} />
            <div>
              <p className="text-[11px] tracking-[0.14em] text-label">
                {tr.info.checkIn}
              </p>
              <p className="mt-1 font-serif text-2xl text-ink">
                {hotelSettings.checkInTime}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="size-5 shrink-0 text-brand" strokeWidth={1.5} />
            <div>
              <p className="text-[11px] tracking-[0.14em] text-label">
                {tr.info.checkOut}
              </p>
              <p className="mt-1 font-serif text-2xl text-ink">
                {hotelSettings.checkOutTime}
              </p>
            </div>
          </div>
        </div>

        <h2 className="mt-16 font-serif text-2xl text-ink">
          {tr.info.facilities}
        </h2>
        <div className="mt-6">
          <AmenityList amenities={allAmenities} />
        </div>

        <h2 className="mt-16 font-serif text-2xl text-ink">
          {tr.info.policies}
        </h2>
        <ul className="mt-6 space-y-4">
          {tr.info.policiesList.map((policy) => (
            <li key={policy} className="flex items-start gap-3 text-sm text-ink/80">
              <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={1.5} />
              {policy}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
