import {
  AirVent,
  Bath,
  BedDouble,
  Coffee,
  ConciergeBell,
  Maximize,
  Mountain,
  ShieldCheck,
  ShowerHead,
  Sofa,
  Sun,
  Tv,
  Waves,
  Wifi,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "LED TV": Tv,
  Duş: ShowerHead,
  "İki Yatak Odası": BedDouble,
  "Oturma Alanı": Sofa,
  "Ayrı Oturma Alanı": Sofa,
  "Panoramik Deniz Manzarası": Mountain,
  "Özel Jakuzili Teras": Bath,
  "Geniş Salon": Maximize,
  "Kişiye Özel Concierge": ConciergeBell,
  "Deniz Manzarası": Waves,
  Balkon: Sun,
  Klima: AirVent,
  "Mini Bar": Coffee,
  Jakuzi: Bath,
  "Wi-Fi": Wifi,
  Kasa: ShieldCheck,
  "Oda Servisi": ConciergeBell,
};

const fallbackIcon = ConciergeBell;

export function amenityIcon(name: string): LucideIcon {
  return iconMap[name] ?? fallbackIcon;
}

export function AmenityList({ 
  amenities, 
  variant = "default" 
}: { 
  amenities: string[],
  variant?: "default" | "table" | "cells"
}) {
  if (variant === "cells") {
    return (
      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line/60 bg-line/60 sm:grid-cols-2 lg:grid-cols-3">
        {amenities.map((amenity) => {
          const Icon = iconMap[amenity] ?? fallbackIcon;
          return (
            <li
              key={amenity}
              className="flex items-center gap-3 bg-surface px-4 py-3.5 text-sm text-ink/80 transition-colors hover:bg-canvas/60"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/10">
                <Icon className="size-4 text-brand" strokeWidth={1.5} />
              </span>
              <span className="leading-snug">{amenity}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  if (variant === "table") {
    return (
      <div className="rounded-xl border border-line/30 bg-surface overflow-hidden shadow-sm">
        <ul className="flex flex-col sm:grid sm:grid-cols-2">
          {amenities.map((amenity) => {
            const Icon = iconMap[amenity] ?? fallbackIcon;
            return (
              <li
                key={amenity}
                className="flex items-center gap-3.5 p-4 text-[14px] text-ink/80 transition-colors hover:bg-canvas/40 border-t border-line/30 first:border-t-0 sm:[&:nth-child(2)]:border-t-0 sm:even:border-l"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/5">
                  <Icon className="size-4 text-brand" strokeWidth={1.5} />
                </div>
                <span className="font-medium">{amenity}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
      {amenities.map((amenity) => {
        const Icon = iconMap[amenity] ?? fallbackIcon;
        return (
          <li
            key={amenity}
            className="flex items-center gap-2.5 text-sm text-ink/80"
          >
            <Icon className="size-4 shrink-0 text-brand" strokeWidth={1.5} />
            {amenity}
          </li>
        );
      })}
    </ul>
  );
}

