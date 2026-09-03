import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { PageHero } from "@/components/layout/PageHero";
import { tr } from "@/lib/dictionary";
import { heroSlides } from "@/lib/hero-slides";
import { getRooms, getSettings } from "@/lib/api";

export const metadata: Metadata = {
  title: `${tr.reservation.heading} — ${tr.brand.name}`,
};

export default async function ReservationPage() {
  const [rooms, settings] = await Promise.all([getRooms(), getSettings()]);

  return (
    <main>
      <PageHero
        title={tr.reservation.heading}
        subtitle={tr.reservation.subheading}
        image={heroSlides[0]}
      />
      <Suspense fallback={null}>
        <BookingFlow rooms={rooms} taxRate={settings.taxRate} />
      </Suspense>
    </main>
  );
}
