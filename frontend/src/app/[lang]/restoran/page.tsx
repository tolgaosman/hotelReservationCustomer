import type { Metadata } from "next";
import { RestaurantLayoutWrapper } from "@/components/restaurant/RestaurantLayoutWrapper";
import { RestaurantGallery } from "@/components/restaurant/RestaurantGallery";
import { PageHero } from "@/components/layout/PageHero";
import { getDictionary } from "@/lib/dictionary";
import { facilityImages, restaurantImages } from "@/lib/hero-slides";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const tr = await getDictionary(params.lang as any);
  return {
  title: `${tr.nav.restaurant} — ${tr.brand.name}`,
};
}

export default async function RestaurantPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const tr = await getDictionary(resolvedParams.lang as any);
  return (
    <main className="bg-canvas/30 pb-32">
      <PageHero
        title={tr.restaurant.name}
        subtitle={tr.restaurant.tagline}
        image={restaurantImages[0]}
      />

      <section className="mx-auto max-w-[1200px] px-6 lg:px-10 pt-12">
        <RestaurantLayoutWrapper />

        {/* Restaurant Gallery Section */}
        <div className="mt-20">
          <RestaurantGallery images={restaurantImages} />
        </div>

        {/* Decorative Full-Width Banner */}
        <div className="relative h-[350px] w-full rounded-2xl overflow-hidden group shadow-xl mt-24">
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-700 z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={restaurantImages[2]}
            alt={tr.restaurant.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-center px-6">
            <h3 className="text-white font-script text-5xl md:text-7xl opacity-95 drop-shadow-lg mb-4">
              {tr.restaurant.bannerHeading}
            </h3>
            <p className="text-white/80 tracking-[0.2em] text-xs uppercase font-medium drop-shadow-md">
              {tr.restaurant.bannerTagline}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
