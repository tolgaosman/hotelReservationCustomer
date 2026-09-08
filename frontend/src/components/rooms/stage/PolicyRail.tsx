import { CalendarClock, CigaretteOff, PawPrint, ShieldCheck } from "lucide-react";
import { useDictionary } from "@/lib/DictionaryContext";
import { cn } from "@/lib/utils";

/**
 * Same pill-list styling as AmenityRail, one tier below it — the four stay
 * policies from tr.info.policiesList, condensed to short labels. Kept as a
 * separate component (not a shared generic list) since the icon set and
 * copy are policy-specific.
 */
export function PolicyRail({ className }: { className?: string }) {
  const tr = useDictionary();
  const policies = [
    { label: tr.roomStage.noPetsRailLabel, Icon: PawPrint },
    { label: tr.roomStage.noSmokingRailLabel, Icon: CigaretteOff },
    { label: tr.roomStage.flexibleTimesRailLabel, Icon: CalendarClock },
    { label: tr.roomStage.freeCancelRailLabel, Icon: ShieldCheck },
  ];

  return (
    <ul
      aria-label={tr.roomStage.policiesRailAria}
      className={cn(
        "flex flex-col items-start gap-1 rounded-full bg-white/12 p-2 xl:rounded-3xl xl:px-3 xl:py-4",
        className,
      )}
    >
      {policies.map(({ label, Icon }) => (
        <li
          key={label}
          className="flex items-center gap-2.5 rounded-full px-2 py-2.5 text-white xl:px-2"
        >
          <Icon className="size-4 shrink-0" strokeWidth={1.5} />
          <span className="sr-only xl:not-sr-only xl:text-xs xl:tracking-[0.06em] xl:whitespace-nowrap">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}
