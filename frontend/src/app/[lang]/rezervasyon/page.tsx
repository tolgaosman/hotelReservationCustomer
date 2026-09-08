import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { RestaurantReservationForm } from "@/components/restaurant/RestaurantReservationForm";
import { PageHero } from "@/components/layout/PageHero";
import { getDictionary } from "@/lib/dictionary";
import { heroSlides } from "@/lib/hero-slides";
import { getRooms, getSettings } from "@/lib/api";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const tr = await getDictionary(params.lang as any);
  return {
  title: `${tr.reservation.heading} — ${tr.brand.name}`,
};
}

export default async function ReservationPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const tr = await getDictionary(resolvedParams.lang as any);
  const [rooms, settings] = await Promise.all([getRooms(), getSettings()]);

  return (
    <main className="bg-canvas/30 pb-32">
      <PageHero
        title={tr.reservation.heading}
        subtitle={tr.reservation.subheading}
        image={heroSlides[0]}
      />

      <section className="mx-auto max-w-[1300px] px-6 lg:px-10 pt-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">
          <div className="flex flex-col">
            <Suspense fallback={null}>
              <BookingFlow rooms={rooms} taxRate={settings.taxRate} />
            </Suspense>
          </div>

          <div className="flex flex-col">
            <RestaurantReservationForm />
          </div>
        </div>
      </section>
    </main>
  );
}
