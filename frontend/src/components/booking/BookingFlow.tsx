"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { tr as trLocale } from "date-fns/locale";
import type { Matcher } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { tr } from "@/lib/dictionary";
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
import { BookingStepper } from "./BookingStepper";
import { AvailabilityResults } from "./AvailabilityResults";
import { GuestDetailsForm, type GuestDetails } from "./GuestDetailsForm";
import { BookingSummary } from "./BookingSummary";
import { rooms as allRooms, getRoomBySlug } from "@/lib/mock-data";
import type { Room } from "@/lib/types";

const STEP_LABELS = [
  tr.reservation.steps.search,
  tr.reservation.steps.select,
  tr.reservation.steps.details,
  tr.reservation.steps.confirm,
];

const emptyGuestDetails: GuestDetails = {
  fullName: "",
  email: "",
  phone: "",
  identityNumber: "",
  country: "",
  note: "",
};

function parseDate(value: string | null): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export function BookingFlow() {
  const params = useSearchParams();

  const [step, setStep] = useState(0);
  const [arrival, setArrival] = useState<Date | undefined>(() =>
    parseDate(params.get("arrival")),
  );
  const [departure, setDeparture] = useState<Date | undefined>(() =>
    parseDate(params.get("departure")),
  );
  const [guests, setGuests] = useState(params.get("guests") ?? "2");
  const [units, setUnits] = useState(params.get("units") ?? "1");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(() => {
    const slug = params.get("room");
    return slug ? (getRoomBySlug(slug) ?? null) : null;
  });
  const [guestDetails, setGuestDetails] = useState<GuestDetails>(emptyGuestDetails);
  const [confirmed, setConfirmed] = useState(false);

  const matchingRooms = useMemo(
    () => allRooms.filter((room) => room.capacity >= Number(guests)),
    [guests],
  );

  const canSearch = Boolean(arrival && departure);

  if (confirmed) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="font-serif text-3xl text-ink">
          {tr.reservation.confirmed.heading}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink/75">
          {tr.reservation.confirmed.body}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-none border border-brand px-8 text-[11px] tracking-[0.14em] text-brand transition-colors hover:bg-brand hover:text-white"
        >
          {tr.reservation.confirmed.backHome}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[880px] px-6 py-16 lg:py-24">
      <h1 className="text-center font-serif text-3xl text-ink sm:text-4xl">
        {tr.reservation.heading}
      </h1>
      <div className="mt-10">
        <BookingStepper steps={STEP_LABELS} current={step} />
      </div>

      <div className="mt-14">
        {step === 0 && (
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8">
            <DateField
              label={tr.booking.arrival}
              value={arrival}
              onChange={setArrival}
              disabled={{ before: new Date() }}
            />
            <DateField
              label={tr.booking.departure}
              value={departure}
              onChange={setDeparture}
              disabled={(date) => date <= (arrival ?? new Date())}
            />
            <CountField
              label={tr.booking.guests}
              value={guests}
              onChange={setGuests}
              render={tr.booking.guestCount}
              options={[1, 2, 3, 4, 5, 6]}
            />
            <CountField
              label={tr.booking.units}
              value={units}
              onChange={setUnits}
              render={tr.booking.unitCount}
              options={[1, 2, 3]}
            />
            <Button
              disabled={!canSearch}
              onClick={() => setStep(1)}
              className="h-12 rounded-none bg-brand text-[11px] tracking-[0.14em] text-white hover:bg-brand-hover sm:col-span-2"
            >
              {tr.reservation.searchCta}
            </Button>
          </div>
        )}

        {step === 1 && (
          <AvailabilityResults
            rooms={matchingRooms}
            onSelect={(room) => {
              setSelectedRoom(room);
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <div>
            <GuestDetailsForm value={guestDetails} onChange={setGuestDetails} />
            <StepNav
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
              nextDisabled={
                !guestDetails.fullName || !guestDetails.email || !guestDetails.phone
              }
              nextLabel={tr.reservation.continue}
            />
          </div>
        )}

        {step === 3 && selectedRoom && arrival && departure && (
          <div>
            <BookingSummary
              room={selectedRoom}
              arrival={arrival}
              departure={departure}
              guests={Number(guests)}
              guestDetails={guestDetails}
            />
            <StepNav
              onBack={() => setStep(2)}
              onNext={() => setConfirmed(true)}
              nextLabel={tr.reservation.summary.confirmCta}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function StepNav({
  onBack,
  onNext,
  nextDisabled,
  nextLabel,
}: {
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel: string;
}) {
  return (
    <div className="mt-10 flex items-center justify-between">
      <button
        type="button"
        onClick={onBack}
        className="text-[11px] tracking-[0.14em] text-label transition-colors hover:text-ink"
      >
        {tr.reservation.back}
      </button>
      <Button
        disabled={nextDisabled}
        onClick={onNext}
        className="h-11 rounded-none bg-brand px-8 text-[11px] tracking-[0.14em] text-white hover:bg-brand-hover"
      >
        {nextLabel}
      </Button>
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  disabled: Matcher | Matcher[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] uppercase tracking-[0.14em] text-label">
        {label}
      </span>
      <Popover>
        <PopoverTrigger className="flex h-11 w-full items-center gap-2 border-b border-line text-left text-sm text-ink transition-colors hover:border-ink/40">
          <CalendarIcon className="size-4 shrink-0 text-label" strokeWidth={1.5} />
          <span className={cn(!value && "text-label")}>
            {value
              ? format(value, "d MMM yyyy", { locale: trLocale })
              : tr.booking.pickDate}
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
    </div>
  );
}

function CountField({
  label,
  value,
  onChange,
  options,
  render,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: number[];
  render: (n: number) => string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] uppercase tracking-[0.14em] text-label">
        {label}
      </span>
      <Select value={value} onValueChange={(v) => v && onChange(v)}>
        <SelectTrigger className="h-11 w-full justify-between rounded-none border-0 border-b border-line px-0 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((n) => (
            <SelectItem key={n} value={String(n)}>
              {render(n)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
