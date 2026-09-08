import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarRange, Users, UtensilsCrossed } from "lucide-react";
import { useDictionary } from "@/lib/DictionaryContext";
import { formatDate, formatTRY } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ApiError, fetchMyRestaurantReservations } from "@/lib/api";
import type { RestaurantReservation } from "@/lib/types";

const STATUS_STYLES: Record<string, string> = {
  waived: "bg-emerald-600/10 text-emerald-700",
  pay_at_hotel: "bg-brand/10 text-brand",
  paid: "bg-ink/5 text-ink/60",
};

function startOfToday(): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

export function RestaurantReservationList({ token }: { token: string }) {
  const tr = useDictionary();
  const reduceMotion = useReducedMotion();
  const [reservations, setReservations] = useState<RestaurantReservation[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadReservations = () => {
    fetchMyRestaurantReservations(token)
      .then((data) => setReservations(data))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Rezervasyonlar yüklenirken bir hata oluştu."));
  };

  useEffect(() => {
    loadReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const { upcoming, past } = useMemo(() => {
    const today = startOfToday();
    const items = reservations ?? [];

    return {
      upcoming: items
        .filter((r) => new Date(r.date) >= today)
        .sort((a, b) => a.date.localeCompare(b.date)),
      past: items
        .filter((r) => new Date(r.date) < today)
        .sort((a, b) => b.date.localeCompare(a.date)),
    };
  }, [reservations]);

  if (error) {
    return <p className="bg-surface p-8 text-center text-sm text-red-600 shadow-sm">{error}</p>;
  }

  if (reservations === null) {
    return (
      <div className="grid gap-4">
        {[0, 1].map((i) => (
          <div key={i} className="h-[132px] animate-pulse bg-surface shadow-sm" />
        ))}
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className="bg-surface px-6 py-16 text-center shadow-sm">
        <UtensilsCrossed className="mx-auto size-8 text-label" strokeWidth={1.25} />
        <p className="mt-5 font-serif text-lg text-ink">Henüz bir restoran rezervasyonunuz yok.</p>
      </div>
    );
  }

  let index = 0;

  return (
    <div className="flex flex-col gap-10">
      {[
        [tr.profile.reservations.upcoming, upcoming] as const,
        [tr.profile.reservations.past, past] as const,
      ].map(([heading, group]) =>
        group.length === 0 ? null : (
          <section key={heading}>
            <h3 className="text-[11px] tracking-[0.14em] text-label">{heading}</h3>
            <div className="mt-4 grid gap-4">
              {group.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  index={index++}
                  reduceMotion={Boolean(reduceMotion)}
                />
              ))}
            </div>
          </section>
        ),
      )}
    </div>
  );
}

function ReservationCard({
  reservation,
  index,
  reduceMotion,
}: {
  reservation: RestaurantReservation;
  index: number;
  reduceMotion: boolean;
}) {
  const { date, time, partySize, amount, paymentStatus, note } = reservation;
  const diningDate = new Date(date);

  return (
    <motion.article
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.35,
        delay: reduceMotion ? 0 : index * 0.05,
        ease: [0.32, 0.72, 0, 1],
      }}
      className="group grid gap-5 overflow-hidden bg-surface p-5 shadow-sm transition-shadow hover:shadow-lg sm:grid-cols-[80px_1fr_auto] sm:items-center"
    >
      <div className="relative aspect-square overflow-hidden bg-canvas rounded-full flex items-center justify-center border border-line">
        <UtensilsCrossed
          className="size-7 text-brand"
          strokeWidth={1.25}
        />
      </div>

      <div className="min-w-0">
        <span className="text-[10px] tracking-[0.14em] text-label uppercase">
          Restoran Rezervasyonu #{reservation.id}
        </span>
        <h4 className="mt-1 font-serif text-lg text-ink">
          Mirage Fine Dining
        </h4>
        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-label">
          <CalendarRange className="size-3.5 shrink-0" strokeWidth={1.5} />
          {formatDate(diningDate)} - Saat: {time}
          <span className="opacity-30">•</span>
          <Users className="size-3.5 shrink-0" strokeWidth={1.5} />
          {partySize} Kişi
        </p>
        {note && (
          <p className="mt-2 text-xs text-ink/75 italic">Not: {note}</p>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-3">
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[10px] tracking-[0.1em]",
            STATUS_STYLES[paymentStatus] || "bg-ink/5 text-ink/60",
          )}
        >
          {paymentStatus === "waived" ? "Ücretsiz (Otel Misafiri)" : paymentStatus === "pay_at_hotel" ? "Otelde Ödenecek" : "Ödendi"}
        </span>
        <span className="text-lg text-ink">{amount > 0 ? formatTRY(amount) : "₺0,00"}</span>
      </div>
    </motion.article>
  );
}
