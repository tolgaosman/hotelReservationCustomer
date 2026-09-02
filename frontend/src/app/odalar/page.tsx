import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { RoomsGrid } from "@/components/rooms/RoomsGrid";
import { tr } from "@/lib/dictionary";
import { heroSlides, rooms } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: `${tr.rooms.heading} — ${tr.brand.name}`,
};

export default function RoomsPage() {
  return (
    <main>
      <PageHero title={tr.rooms.heading} subtitle={tr.rooms.subheading} image={heroSlides[1]} />
      <section className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
        <RoomsGrid rooms={rooms} />
      </section>
    </main>
  );
}
