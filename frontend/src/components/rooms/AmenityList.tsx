import {
  AirVent,
  Bath,
  Coffee,
  ConciergeBell,
  ShieldCheck,
  Sun,
  Waves,
  Wifi,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
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
  variant?: "default" | "table"
}) {
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

