import { tr } from "@/lib/dictionary";
import { cn } from "@/lib/utils";
import { GlassCard } from "./GlassCard";

export function StayDetailCard({
  capacity,
  size,
  checkInTime,
  checkOutTime,
  variant = "brand",
  className,
}: {
  capacity: number;
  size: number;
  checkInTime: string;
  checkOutTime: string;
  variant?: "brand" | "plain";
  className?: string;
}) {
  const policyPills = [tr.roomStage.noSmokingBadge, tr.roomStage.noPetsBadge];
  const inverted = variant === "brand";

  return (
    <GlassCard variant={variant} className={className}>
      <p
        className={cn(
          "text-[11px] tracking-[0.14em]",
          inverted ? "text-white/80" : "text-label",
        )}
      >
        {tr.roomStage.stayCardHeading}
      </p>

      <div className="mt-3 flex items-end gap-6">
        <div>
          <p className={cn("text-3xl", !inverted && "text-ink")}>{capacity}</p>
          <p
            className={cn(
              "text-[10px] tracking-[0.08em]",
              inverted ? "text-white/75" : "text-label",
            )}
          >
            {tr.roomStage.guestsLabel}
          </p>
        </div>
        <div>
          <p className={cn("text-3xl", !inverted && "text-ink")}>{size}</p>
          <p
            className={cn(
              "text-[10px] tracking-[0.08em]",
              inverted ? "text-white/75" : "text-label",
            )}
          >
            m²
          </p>
        </div>
      </div>

      <p className={cn("mt-4 text-xs", inverted ? "text-white/85" : "text-ink/80")}>
        {tr.roomStage.checkInOut(checkInTime, checkOutTime)}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {policyPills.map((policy) => (
          <span
            key={policy}
            className={cn(
              "rounded-full px-2.5 py-1 text-[10px] leading-tight",
              inverted ? "bg-white/15 text-white/90" : "bg-canvas text-ink/75",
            )}
          >
            {policy}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}
