import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { tr } from "@/lib/dictionary";
import { heroSlides, rooms } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: `${tr.gallery.heading} — ${tr.brand.name}`,
};

const images = [...heroSlides, ...rooms.flatMap((room) => room.images)];

export default function GalleryPage() {
  return (
    <main>
      <PageHero title={tr.gallery.heading} subtitle={tr.gallery.subheading} image={heroSlides[2]} />
      <section className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
        <GalleryGrid images={images} />
      </section>
    </main>
  );
}
