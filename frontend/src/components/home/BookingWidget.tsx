"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { tr as trLocale } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useDictionary } from "@/lib/DictionaryContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] uppercase tracking-[0.14em] text-label">
        {label}
      </span>
      {children}
    </div>
  );
}

const dateTriggerClass =
  "flex h-10 w-full items-center gap-2 border-b border-line text-left text-sm text-ink transition-colors hover:border-ink/40";

export function BookingWidget() {
  const tr = useDictionary();
  const router = useRouter();
  const [arrival, setArrival] = useState<Date | undefined>();
  const [departure, setDeparture] = useState<Date | undefined>();
  const [guests, setGuests] = useState("2");
  const [units, setUnits] = useState("1");

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (arrival) params.set("arrival", format(arrival, "yyyy-MM-dd"));
    if (departure) params.set("departure", format(departure, "yyyy-MM-dd"));
    params.set("guests", guests);
    params.set("units", units);
    router.push(`/rezervasyon?${params.toString()}`);
  };

  return (
    <div className="relative z-20 mx-auto -mt-16 max-w-[1200px] px-4 sm:-mt-20 lg:-mt-24 lg:px-6">
      <div className="grid overflow-hidden bg-surface shadow-lg lg:grid-cols-[240px_1fr]">
        <div className="flex items-center bg-brand px-8 py-7 lg:py-0">
          <h2 className="font-serif text-2xl leading-tight text-white lg:text-3xl">
            {tr.booking.heading}
          </h2>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6 lg:grid-cols-[repeat(4,1fr)_auto] lg:items-end lg:gap-4 lg:p-8">
          <Field label={tr.booking.arrival}>
            <Popover>
              <PopoverTrigger className={dateTriggerClass}>
                <CalendarIcon className="size-4 shrink-0 text-label" strokeWidth={1.5} />
                <span className={cn(!arrival && "text-label")}>
                  {arrival
                    ? format(arrival, "d MMM yyyy", { locale: trLocale })
                    : tr.booking.pickDate}
                </span>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={arrival}
                  defaultMonth={arrival}
                  onSelect={setArrival}
                  locale={trLocale}
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </Field>

          <Field label={tr.booking.departure}>
            <Popover>
              <PopoverTrigger className={dateTriggerClass}>
                <CalendarIcon className="size-4 shrink-0 text-label" strokeWidth={1.5} />
                <span className={cn(!departure && "text-label")}>
                  {departure
                    ? format(departure, "d MMM yyyy", { locale: trLocale })
                    : tr.booking.pickDate}
                </span>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={departure}
                  defaultMonth={departure}
                  onSelect={setDeparture}
                  locale={trLocale}
                  disabled={(date) => date <= (arrival ?? new Date())}
                />
              </PopoverContent>
            </Popover>
          </Field>

          <Field label={tr.booking.guests}>
            <Select value={guests} onValueChange={(v) => v && setGuests(v)}>
              <SelectTrigger className="h-10 w-full justify-between rounded-none border-0 border-b border-line px-0 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {tr.booking.guestCount(n)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label={tr.booking.units}>
            <Select value={units} onValueChange={(v) => v && setUnits(v)}>
              <SelectTrigger className="h-10 w-full justify-between rounded-none border-0 border-b border-line px-0 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {tr.booking.unitCount(n)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Button
            onClick={handleSubmit}
            className="h-11 rounded-none bg-brand px-8 text-[11px] tracking-[0.14em] text-white hover:bg-brand-hover lg:h-10 lg:self-end"
          >
            {tr.booking.submit}
          </Button>
        </div>
      </div>
    </div>
  );
}
