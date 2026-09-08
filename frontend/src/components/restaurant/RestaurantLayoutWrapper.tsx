"use client";

import { useState } from "react";
import { useDictionary } from "@/lib/DictionaryContext";
import { RestaurantShowcase, RestaurantPolicyCard } from "./RestaurantShowcase";
import { RestaurantReservationForm } from "./RestaurantReservationForm";

export function RestaurantLayoutWrapper() {
  const tr = useDictionary();
  const [, setIsShortForm] = useState(false);

  return (
    <div className="grid gap-12 lg:grid-cols-2 items-stretch">
      <div className="flex h-full flex-col gap-8">
        <h3 className="font-serif text-2xl text-ink tracking-wide">
          {tr.restaurant.name}
        </h3>
        <RestaurantShowcase />
      </div>

      <div className="flex h-full flex-col gap-8">
        <h3 className="font-serif text-2xl text-ink tracking-wide">
          {tr.restaurant.columnHeading}
        </h3>
        <RestaurantReservationForm onShortFormChange={setIsShortForm} />
      </div>

      <div className="lg:col-span-2">
        <RestaurantPolicyCard />
      </div>
    </div>
  );
}
