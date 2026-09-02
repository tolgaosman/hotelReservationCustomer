"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { nights as countNights } from "@/lib/format";
import { priceStay, type StayPricing } from "@/lib/pricing";
import type { Room } from "@/lib/types";

interface StayContextValue {
  room: Room;
  taxRate: number;
  arrival: Date | undefined;
  departure: Date | undefined;
  setArrival: (date: Date | undefined) => void;
  setDeparture: (date: Date | undefined) => void;
  pricing: StayPricing;
  bookingHref: string;
}

const StayContext = createContext<StayContextValue | null>(null);

/**
 * Holds the trip-plan date selection so the same state drives both the
 * desktop glass card and the mobile card stack without duplicating it —
 * `children` is a server-rendered slot (RoomDetailBand keeps rendering on
 * the server even though this wrapper is a client component).
 */
export function StayProvider({
  room,
  taxRate,
  children,
}: {
  room: Room;
  taxRate: number;
  children: ReactNode;
}) {
  const [arrival, setArrival] = useState<Date | undefined>();
  const [departure, setDeparture] = useState<Date | undefined>();

  const value = useMemo<StayContextValue>(() => {
    const nightCount =
      arrival && departure ? countNights(arrival, departure) : 1;
    const pricing = priceStay(room.nightlyRate, taxRate, nightCount);

    const params = new URLSearchParams({ room: room.slug });
    if (arrival) params.set("arrival", arrival.toISOString().slice(0, 10));
    if (departure) params.set("departure", departure.toISOString().slice(0, 10));

    return {
      room,
      taxRate,
      arrival,
      departure,
      setArrival,
      setDeparture,
      pricing,
      bookingHref: `/rezervasyon?${params.toString()}`,
    };
  }, [room, taxRate, arrival, departure]);

  return <StayContext.Provider value={value}>{children}</StayContext.Provider>;
}

export function useStay() {
  const ctx = useContext(StayContext);
  if (!ctx) throw new Error("useStay must be used within a StayProvider");
  return ctx;
}
