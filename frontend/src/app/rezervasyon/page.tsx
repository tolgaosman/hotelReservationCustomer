import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { tr } from "@/lib/dictionary";

export const metadata: Metadata = {
  title: `${tr.reservation.heading} — ${tr.brand.name}`,
};

export default function ReservationPage() {
  return (
    <main>
      <Suspense fallback={null}>
        <BookingFlow />
      </Suspense>
    </main>
  );
}
