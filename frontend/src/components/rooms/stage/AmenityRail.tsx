import { amenityIcon } from "@/components/rooms/AmenityList";
import { useDictionary } from "@/lib/DictionaryContext";
import { cn } from "@/lib/utils";

/**
 * Left vertical icon rail. Non-interactive <li>s on purpose — nothing here
 * is a link, so there's nothing to trap focus on or hide from assistive
 * tech. Icon-only at lg, labels revealed at xl via layout, not hover.
 */
export function AmenityRail({
  amenities,
  className,
}: {
  amenities: string[];
  className?: string;
}) {
  const tr = useDictionary();
  return (
    <ul
      aria-label={tr.roomStage.amenitiesRailAria}
      className={cn(
        "flex flex-col items-start gap-1 rounded-full bg-white/12 p-2 xl:rounded-3xl xl:px-3 xl:py-4",
        className,
      )}
    >
      {amenities.map((amenity) => {
        const Icon = amenityIcon(amenity);
        return (
          <li
            key={amenity}
            className="flex items-center gap-2.5 rounded-full px-2 py-2.5 text-white xl:px-2"
          >
            <Icon className="size-4 shrink-0" strokeWidth={1.5} />
            <span className="sr-only xl:not-sr-only xl:text-xs xl:tracking-[0.06em] xl:whitespace-nowrap">
              {amenity}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
