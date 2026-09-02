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
};

const fallbackIcon = ConciergeBell;

export function amenityIcon(name: string): LucideIcon {
  return iconMap[name] ?? fallbackIcon;
}

export function AmenityList({ amenities }: { amenities: string[] }) {
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
