import Image from "next/image";
import { Clock, UtensilsCrossed, ShieldCheck } from "lucide-react";
import { useDictionary } from "@/lib/DictionaryContext";
import { restaurantImages } from "@/lib/hero-slides";

const MEAL_ICONS = [Clock, Clock, Clock] as const;

export function RestaurantPolicyCard() {
  const tr = useDictionary();
  const t = tr.restaurant;
  return (
    <div className="rounded-2xl border border-line/40 bg-surface p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-10">
      <div className="flex items-center gap-4 mb-6 pb-5 border-b border-line/30">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-canvas">
          <ShieldCheck className="size-5 text-brand" strokeWidth={1.5} />
        </div>
        <h2 className="font-serif text-2xl text-ink tracking-wide">{t.policyHeading}</h2>
      </div>
      <ul className="space-y-4">
        {t.policiesList.map((policy: string) => (
          <li key={policy} className="flex items-start gap-3 text-[14px] leading-relaxed text-ink/80">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
            <span>{policy}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RestaurantShowcase() {
  const tr = useDictionary();
  const t = tr.restaurant;
  const meals = [
    { label: t.hours.breakfast.label, time: t.hours.breakfast.time, desc: t.menu.breakfast },
    { label: t.hours.lunch.label, time: t.hours.lunch.time, desc: t.menu.lunch },
    { label: t.hours.dinner.label, time: t.hours.dinner.time, desc: t.menu.dinner },
  ];

  return (
    <div className="flex h-full flex-col gap-8">
      {/* Banner / Ad */}
      <div className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-2xl shadow-xl">
        <Image
          src={restaurantImages[3]}
          alt={t.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/80">{t.tagline}</p>
          <h2 className="mt-2 font-serif text-4xl text-white drop-shadow-lg">{t.name}</h2>
        </div>
      </div>

      {/* Intro + Hours/Menu Card */}
      <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-line/40 bg-surface p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-10">
        <div className="absolute inset-0 pattern-diamond opacity-5 pointer-events-none" />
        <div className="relative z-10 flex flex-1 flex-col">
          <div className="flex items-center gap-4 mb-6 pb-5 border-b border-line/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-canvas">
              <UtensilsCrossed className="size-5 text-brand" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-2xl text-ink tracking-wide">{t.hoursHeading}</h2>
          </div>

          <p className="mb-8 text-[14px] leading-relaxed text-ink/80">{t.intro}</p>

          <dl className="mt-auto space-y-6">
            {meals.map(({ label, time, desc }, idx) => {
              const Icon = MEAL_ICONS[idx];
              return (
                <div key={label} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10">
                    <Icon className="size-3.5 text-brand" strokeWidth={2} />
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold tracking-[0.14em] text-label uppercase">
                      {label} — {time}
                    </dt>
                    <dd className="mt-1 text-[14px] leading-relaxed text-ink/80">{desc}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
}
