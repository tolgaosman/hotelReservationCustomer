"use client";

import { format } from "date-fns";
import { tr as trLocale } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { tr } from "@/lib/dictionary";
import { formatTRY } from "@/lib/format";
import { cn } from "@/lib/utils";
import { GlassCard } from "./GlassCard";
import { useStay } from "./StayProvider";

export function TripPlanCard({
  variant = "glass",
  className,
}: {
  variant?: "glass" | "plain" | "brand";
  className?: string;
}) {
  const { arrival, departure, setArrival, setDeparture, pricing, taxRate } =
    useStay();
  const hasDates = Boolean(arrival && departure);
  const inverted = variant === "brand";

  return (
    <GlassCard variant={variant} className={className}>
      <p className={cn("text-[11px] tracking-[0.14em]", inverted ? "text-white/80" : "text-label")}>
        {tr.roomStage.tripPlanHeading}
      </p>

      <p className={cn("mt-2 text-3xl", inverted ? "text-white" : "text-ink")}>
        {formatTRY(pricing.total)}
        <span className={cn("ml-1 text-sm", inverted ? "text-white/75" : "text-label")}>
          {hasDates
            ? tr.roomStage.nightsLine(pricing.nights)
            : tr.rooms.perNight}
        </span>
      </p>
      <p className={cn("text-xs", inverted ? "text-white/75" : "text-label")}>
        {hasDates && arrival && departure
          ? tr.roomStage.dateRange(
              format(arrival, "d MMM", { locale: trLocale }),
              format(departure, "d MMM", { locale: trLocale }),
            )
          : tr.roomStage.pickDatesHint}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <DatePickerButton
          label={tr.booking.arrival}
          value={arrival}
          onChange={setArrival}
          disabled={{ before: new Date() }}
          inverted={inverted}
        />
        <DatePickerButton
          label={tr.booking.departure}
          value={departure}
          onChange={setDeparture}
          disabled={(date) => date <= (arrival ?? new Date())}
          inverted={inverted}
        />
      </div>

      <div
        role="img"
        aria-label={tr.roomStage.taxBreakdownAria(
          Math.round(100 - pricing.taxShare),
          Math.round(pricing.taxShare),
        )}
        className={cn("mt-5 flex h-2 overflow-hidden rounded-full", inverted ? "bg-white/20" : "bg-ink/10")}
      >
        <div
          className={cn("h-full", inverted ? "bg-white/90" : "bg-brand")}
          style={{ width: `${100 - pricing.taxShare}%` }}
        />
        <div
          className={cn("h-full", inverted ? "bg-white/40" : "bg-brand/35")}
          style={{ width: `${pricing.taxShare}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Stat label={tr.rooms.roomRate} value={formatTRY(pricing.roomTotal)} inverted={inverted} />
        <Stat label={tr.rooms.taxLabel(taxRate)} value={formatTRY(pricing.taxAmount)} inverted={inverted} />
        <Stat label={tr.rooms.total} value={formatTRY(pricing.total)} inverted={inverted} />
      </div>
    </GlassCard>
  );
}

function Stat({ label, value, inverted }: { label: string; value: string; inverted: boolean }) {
  return (
    <div>
      <p className={cn("truncate text-[9px] tracking-[0.08em]", inverted ? "text-white/75" : "text-label")}>{label}</p>
      <p className={cn("mt-0.5 text-xs", inverted ? "text-white" : "text-ink")}>{value}</p>
    </div>
  );
}

function DatePickerButton({
  label,
  value,
  onChange,
  disabled,
  inverted,
}: {
  label: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  disabled: Parameters<typeof Calendar>[0]["disabled"];
  inverted: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "flex h-9 w-full items-center gap-1.5 rounded-lg px-2.5 text-left text-xs transition-colors",
          inverted
            ? "bg-white/10 text-white hover:bg-white/20"
            : "border border-line text-ink hover:border-ink/40",
        )}
      >
        <CalendarIcon
          className={cn("size-3.5 shrink-0", inverted ? "text-white/75" : "text-label")}
          strokeWidth={1.5}
        />
        <span className={cn("truncate", !value && (inverted ? "text-white/75" : "text-label"))}>
          {value ? format(value, "d MMM", { locale: trLocale }) : label}
        </span>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          locale={trLocale}
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
}
