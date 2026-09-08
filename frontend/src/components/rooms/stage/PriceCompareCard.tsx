import Link from "next/link";
import { useDictionary } from "@/lib/DictionaryContext";
import { formatTRY } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Room } from "@/lib/types";
import { GlassCard } from "./GlassCard";

/**
 * A plain-div bar chart, not an area/mountain chart — the data is 5 discrete
 * rooms (categorical), so an area chart would falsely imply a continuum.
 * Each bar links to that room's page, so this also doubles as a switcher.
 */
export function PriceCompareCard({
  room,
  rooms,
  variant = "glass",
  className,
}: {
  room: Room;
  rooms: Room[];
  variant?: "glass" | "plain" | "brand";
  className?: string;
}) {
  const tr = useDictionary();
  const max = Math.max(...rooms.map((r) => r.nightlyRate));
  const avg = rooms.reduce((s, r) => s + r.nightlyRate, 0) / rooms.length;
  const pct = Math.round(((room.nightlyRate - avg) / avg) * 100);
  const isCheapest = room.nightlyRate === Math.min(...rooms.map((r) => r.nightlyRate));
  const inverted = variant === "brand";

  const deltaLabel =
    Math.abs(pct) < 3
      ? tr.roomStage.atAverage
      : pct > 0
        ? tr.roomStage.aboveAverage(pct)
        : tr.roomStage.belowAverage(Math.abs(pct));

  return (
    <GlassCard variant={variant} className={className}>
      <p className={cn("text-[11px] tracking-[0.14em]", inverted ? "text-white/80" : "text-label")}>
        {tr.roomStage.priceCompareHeading}
      </p>

      <ul
        aria-label={tr.roomStage.compareChartAria}
        className="mt-4 flex h-[64px] items-end gap-1.5"
      >
        {rooms.map((r) => {
          const active = r.slug === room.slug;
          return (
            <li key={r.id} className="flex h-full flex-1 flex-col justify-end">
              <Link
                href={`/odalar/${r.slug}`}
                aria-label={tr.roomStage.compareBarAria(r.title, formatTRY(r.nightlyRate))}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block w-full rounded-t-[3px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                  inverted
                    ? active
                      ? "bg-white"
                      : "bg-white/25 hover:bg-white/45"
                    : active
                      ? "bg-brand"
                      : "bg-ink/15 hover:bg-ink/35",
                )}
                style={{ height: `${Math.round((r.nightlyRate / max) * 100)}%` }}
              />
              <span
                className={cn(
                  "mt-1.5 block text-center text-[9px] tracking-[0.06em]",
                  inverted
                    ? active
                      ? "text-white"
                      : "text-white/70"
                    : active
                      ? "text-ink"
                      : "text-label",
                )}
              >
                {r.number}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className={cn("text-sm", inverted ? "text-white" : "text-ink")}>
            {formatTRY(room.nightlyRate)}
            <span className={cn("ml-1 text-xs", inverted ? "text-white/75" : "text-label")}>
              {tr.rooms.perNight}
            </span>
          </p>
          <p className={cn("text-xs", inverted ? "text-white/75" : "text-label")}>{deltaLabel}</p>
        </div>
        {isCheapest && (
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-[10px] tracking-[0.08em]",
              inverted ? "bg-white/15 text-white" : "bg-brand/10 text-brand",
            )}
          >
            {tr.roomStage.lowestPrice}
          </span>
        )}
      </div>
    </GlassCard>
  );
}
