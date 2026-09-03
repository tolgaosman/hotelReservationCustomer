import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared card shell for the room stage's floating panels.
 * - "glass": bg-white/90 idiom already used on the old detail-page overlay,
 *   extended to /92 + a stronger shadow so it still reads over a bright photo.
 * - "brand": the one filled accent card (KONAKLAMA DETAYI).
 * - "plain": the sub-`lg` fallback — identical to the original sidebar card,
 *   no blur, no translucency (glass is the single biggest scroll-perf cost
 *   of this design on mid-range Android).
 */
export function GlassCard({
  variant = "glass",
  className,
  children,
}: {
  variant?: "glass" | "brand" | "plain";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5",
        variant === "glass" &&
          "bg-white/92 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/50 backdrop-blur-md",
        variant === "brand" && "bg-brand/55 text-white backdrop-blur-md",
        variant === "plain" && "border border-line bg-surface",
        className,
      )}
    >
      {children}
    </div>
  );
}
