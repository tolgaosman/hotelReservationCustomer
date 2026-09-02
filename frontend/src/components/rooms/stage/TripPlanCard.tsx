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
  variant?: "glass" | "plain";
  className?: string;
}) {
  const { arrival, departure, setArrival, setDeparture, pricing, taxRate } =
    useStay();
  const hasDates = Boolean(arrival && departure);

  return (
    <GlassCard variant={variant} className={className}>
      <p className="text-[11px] tracking-[0.14em] text-label">
        {tr.roomStage.tripPlanHeading}
      </p>

      <p className="mt-2 text-3xl text-ink">
        {formatTRY(pricing.total)}
        <span className="ml-1 text-sm text-label">
          {hasDates
            ? tr.roomStage.nightsLine(pricing.nights)
            : tr.rooms.perNight}
        </span>
      </p>
      <p className="text-xs text-label">
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
        />
        <DatePickerButton
          label={tr.booking.departure}
          value={departure}
          onChange={setDeparture}
          disabled={(date) => date <= (arrival ?? new Date())}
        />
      </div>

      <div
        role="img"
        aria-label={tr.roomStage.taxBreakdownAria(
          Math.round(100 - pricing.taxShare),
          Math.round(pricing.taxShare),
        )}
        className="mt-5 flex h-2 overflow-hidden rounded-full bg-ink/10"
      >
        <div
          className="h-full bg-brand"
          style={{ width: `${100 - pricing.taxShare}%` }}
        />
        <div
          className="h-full bg-brand/35"
          style={{ width: `${pricing.taxShare}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Stat label={tr.rooms.roomRate} value={formatTRY(pricing.roomTotal)} />
        <Stat label={tr.rooms.taxLabel(taxRate)} value={formatTRY(pricing.taxAmount)} />
        <Stat label={tr.rooms.total} value={formatTRY(pricing.total)} />
      </div>
    </GlassCard>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="truncate text-[9px] tracking-[0.08em] text-label">{label}</p>
      <p className="mt-0.5 text-xs text-ink">{value}</p>
    </div>
  );
}

function DatePickerButton({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  disabled: Parameters<typeof Calendar>[0]["disabled"];
}) {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "flex h-9 w-full items-center gap-1.5 rounded-lg border border-line px-2.5 text-left text-xs text-ink transition-colors hover:border-ink/40",
        )}
      >
        <CalendarIcon className="size-3.5 shrink-0 text-label" strokeWidth={1.5} />
        <span className={cn("truncate", !value && "text-label")}>
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
