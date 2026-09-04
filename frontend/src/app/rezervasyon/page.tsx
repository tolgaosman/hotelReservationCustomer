import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { RestaurantShowcase } from "@/components/restaurant/RestaurantShowcase";
import { RestaurantReservationForm } from "@/components/restaurant/RestaurantReservationForm";
import { PageHero } from "@/components/layout/PageHero";
import { tr } from "@/lib/dictionary";
import { heroSlides, facilityImages } from "@/lib/hero-slides";
import { getRooms, getSettings } from "@/lib/api";

export const metadata: Metadata = {
  title: `${tr.reservation.heading} — ${tr.brand.name}`,
};

export default async function ReservationPage() {
  const [rooms, settings] = await Promise.all([getRooms(), getSettings()]);

  return (
    <main className="bg-canvas/30 pb-32">
      <PageHero
        title={tr.reservation.heading}
        subtitle={tr.reservation.subheading}
        image={heroSlides[0]}
      />

      <section className="mx-auto max-w-[1200px] px-6 lg:px-10 -mt-16 relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          <Suspense fallback={null}>
            <BookingFlow rooms={rooms} taxRate={settings.taxRate} />
          </Suspense>

          <div className="flex flex-col gap-8">
            <h3 className="font-serif text-2xl text-ink tracking-wide">
              {tr.restaurant.columnHeading}
            </h3>
            <RestaurantShowcase />
            <RestaurantReservationForm />
          </div>
        </div>

        {/* Decorative Full-Width Banner */}
        <div className="relative h-[350px] w-full rounded-2xl overflow-hidden group shadow-xl mt-16">
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-700 z-10" />
          <img
            src={facilityImages[0]}
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
