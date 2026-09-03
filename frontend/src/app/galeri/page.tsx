import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { tr } from "@/lib/dictionary";
import { heroSlides, facilityImages } from "@/lib/hero-slides";
import { getRooms } from "@/lib/api";

export const metadata: Metadata = {
  title: `${tr.gallery.heading} — ${tr.brand.name}`,
};

/** Interleaves room shots with facility shots so the grid doesn't read as one long strip of bedrooms. */
function interleave(rooms: string[], facilities: string[]) {
  const result: string[] = [];
  const ratio = Math.max(1, Math.round(rooms.length / facilities.length));
  let f = 0;
  rooms.forEach((image, i) => {
    result.push(image);
    if ((i + 1) % ratio === 0 && f < facilities.length) {
      result.push(facilities[f++]);
    }
  });
  result.push(...facilities.slice(f));
  return result;
}

export default async function GalleryPage() {
  const rooms = await getRooms();
  const roomImages = [...heroSlides, ...rooms.flatMap((room) => room.images)];
  const images = interleave(roomImages, facilityImages);

  return (
    <main>
      <PageHero title={tr.gallery.heading} subtitle={tr.gallery.subheading} image={heroSlides[2]} />
      <section className="mx-auto max-w-[1800px] px-2 py-12 sm:px-3 lg:px-4">
        <GalleryGrid images={images} />
      </section>
    </main>
  );
}
