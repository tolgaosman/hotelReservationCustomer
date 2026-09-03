"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { tr } from "@/lib/dictionary";
import { cn } from "@/lib/utils";
import type { Room } from "@/lib/types";
import { useStay } from "./StayProvider";

export function StageTitleBlock({
  room,
  imagesCount,
  active,
  onPrev,
  onNext,
  align = "center",
  className,
}: {
  room: Room;
  imagesCount: number;
  active: number;
  onPrev: () => void;
  onNext: () => void;
  align?: "center" | "start";
  className?: string;
}) {
  const { bookingHref } = useStay();
  const reduce = useReducedMotion();
  const entrance = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.8, delay: reduce ? 0 : delay },
  });

  return (
    <div
      className={cn(
        "flex max-w-[520px] flex-col text-white",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <motion.p
        {...entrance(0.2)}
        className="rounded-full bg-white/15 px-4 py-1.5 text-[11px] tracking-[0.14em] backdrop-blur-sm"
      >
        {tr.roomStage.statPill(room.capacity, room.size)}
      </motion.p>

      <motion.h1
        {...entrance(0.35)}
        className="mt-4 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[0.95]"
      >
        {room.title}
      </motion.h1>
      <motion.p {...entrance(0.4)} className="mt-1 text-xs tracking-[0.1em] text-white/75">
        {tr.roomStage.roomNumber(room.number)}
      </motion.p>

      <motion.div {...entrance(0.45)} className="mt-4 flex items-center gap-2">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-3.5",
                i < Math.floor(room.rating)
                  ? "fill-brand text-brand"
                  : "fill-white/20 text-transparent",
              )}
            />
          ))}
        </div>
        <span className="text-[13px] font-medium text-white">
          {room.rating.toFixed(1)}
        </span>
        <span className="text-xs text-white/70">
          ({tr.rooms.reviews(room.reviewCount)})
        </span>
      </motion.div>

      <motion.div {...entrance(0.55)} className="mt-6 flex items-center gap-4">
        {imagesCount > 1 && (
          <button
            type="button"
            onClick={onPrev}
            aria-label={tr.rooms.prevImage}
            className="flex size-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronLeft className="size-4" strokeWidth={1.5} />
          </button>
        )}

        <Link
          href={bookingHref}
          className={cn(
            buttonVariants({ variant: "default" }),
            "h-11 rounded-full bg-brand px-8 text-[11px] tracking-[0.14em] text-white hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
          )}
        >
          {tr.rooms.bookRoom}
        </Link>

        {imagesCount > 1 && (
          <button
            type="button"
            onClick={onNext}
            aria-label={tr.rooms.nextImage}
            className="flex size-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronRight className="size-4" strokeWidth={1.5} />
          </button>
        )}
      </motion.div>

      {imagesCount > 1 && (
        <div className="mt-5 flex items-center gap-1.5">
          {Array.from({ length: imagesCount }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === active ? "w-4 bg-white" : "w-1.5 bg-white/45",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
