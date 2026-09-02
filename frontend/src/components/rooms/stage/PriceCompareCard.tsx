import Link from "next/link";
import { tr } from "@/lib/dictionary";
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
  variant?: "glass" | "plain";
  className?: string;
}) {
  const max = Math.max(...rooms.map((r) => r.nightlyRate));
  const avg = rooms.reduce((s, r) => s + r.nightlyRate, 0) / rooms.length;
  const pct = Math.round(((room.nightlyRate - avg) / avg) * 100);
  const isCheapest = room.nightlyRate === Math.min(...rooms.map((r) => r.nightlyRate));

  const deltaLabel =
    Math.abs(pct) < 3
      ? tr.roomStage.atAverage
      : pct > 0
        ? tr.roomStage.aboveAverage(pct)
        : tr.roomStage.belowAverage(Math.abs(pct));

  return (
    <GlassCard variant={variant} className={className}>
      <p className="text-[11px] tracking-[0.14em] text-label">
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
                  active ? "bg-brand" : "bg-ink/15 hover:bg-ink/35",
                )}
                style={{ height: `${Math.round((r.nightlyRate / max) * 100)}%` }}
              />
              <span
                className={cn(
                  "mt-1.5 block text-center text-[9px] tracking-[0.06em]",
                  active ? "text-ink" : "text-label",
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
          <p className="text-sm text-ink">
            {formatTRY(room.nightlyRate)}
            <span className="ml-1 text-xs text-label">{tr.rooms.perNight}</span>
          </p>
          <p className="text-xs text-label">{deltaLabel}</p>
        </div>
        {isCheapest && (
          <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[10px] tracking-[0.08em] text-brand">
            {tr.roomStage.lowestPrice}
          </span>
        )}
      </div>
    </GlassCard>
  );
}
