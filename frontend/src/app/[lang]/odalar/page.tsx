import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { RoomsGrid } from "@/components/rooms/RoomsGrid";
import { getDictionary } from "@/lib/dictionary";
import { heroSlides } from "@/lib/hero-slides";
import { getRooms } from "@/lib/api";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const tr = await getDictionary(params.lang as any);
  return {
  title: `${tr.rooms.heading} — ${tr.brand.name}`,
};
}

export default async function RoomsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const tr = await getDictionary(resolvedParams.lang as any);
  const rooms = await getRooms();

  return (
    <main>
      <PageHero title={tr.rooms.heading} subtitle={tr.rooms.subheading} image={heroSlides[1]} />
      <section className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
        <RoomsGrid rooms={rooms} />
      </section>
    </main>
  );
}
