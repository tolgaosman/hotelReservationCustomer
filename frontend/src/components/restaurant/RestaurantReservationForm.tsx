"use client";

import { useState, type FormEvent } from "react";
import { format } from "date-fns";
import { tr as trLocale } from "date-fns/locale";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { tr } from "@/lib/dictionary";
import { cn } from "@/lib/utils";
import { formatTRY } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import { ApiError, createRestaurantReservation } from "@/lib/api";

const FEE_PER_PERSON = 350;

const TIME_SLOTS = [
  "12:30", "13:00", "13:30", "14:00", "14:30",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
];

const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8];

const inputClass =
  "h-12 rounded-xl border-line/50 bg-canvas/30 px-4 focus-visible:border-brand focus-visible:ring-brand/20";
const labelClass = "text-[11px] font-semibold tracking-[0.14em] text-label uppercase";

export function RestaurantReservationForm() {
  const t = tr.restaurant.form;

  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>(TIME_SLOTS[0]);
  const [partySize, setPartySize] = useState("2");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const [isHotelGuest, setIsHotelGuest] = useState(false);
  const [reservationId, setReservationId] = useState("");

  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<"waived" | "paid" | null>(null);

  const totalFee = FEE_PER_PERSON * Number(partySize || 0);

  const canSubmit =
    Boolean(date && time && fullName.trim() && phone.trim()) &&
    (isHotelGuest ? Boolean(reservationId.trim()) : Boolean(cardHolderName.trim() && cardNumber.trim() && cardExpiry.trim() && cardCvc.trim()));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!date || !canSubmit) return;

    setSubmitting(true);
    setError(null);
    try {
      const result = await createRestaurantReservation({
        date: format(date, "yyyy-MM-dd"),
        time,
        partySize: Number(partySize),
        fullName,
        phone,
        email: email || undefined,
        note: note || undefined,
        isHotelGuest,
        reservationId: isHotelGuest ? Number(reservationId) : undefined,
        cardHolderName: isHotelGuest ? undefined : cardHolderName,
        cardNumber: isHotelGuest ? undefined : cardNumber,
        cardExpiry: isHotelGuest ? undefined : cardExpiry,
        cardCvc: isHotelGuest ? undefined : cardCvc,
      });
      setConfirmed(result.paymentStatus);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : tr.restaurant.errors.generic,
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmed) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-line/40 bg-surface p-10 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex size-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <CheckCircle2 className="size-7" strokeWidth={1.5} />
        </div>
        <h3 className="font-serif text-2xl text-ink">{tr.restaurant.confirmed.heading}</h3>
        <p className="text-sm leading-relaxed text-ink/75">
          {confirmed === "waived" ? tr.restaurant.confirmed.bodyWaived : tr.restaurant.confirmed.bodyPaid}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line/40 bg-surface p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-10"
    >
      <h3 className="mb-6 font-serif text-2xl text-ink tracking-wide">{t.heading}</h3>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label className={labelClass}>{t.date}</Label>
          <Popover>
            <PopoverTrigger className="flex h-12 w-full items-center gap-2 rounded-xl border border-line/50 bg-canvas/30 px-4 text-left text-sm text-ink transition-colors hover:border-brand/40">
              <CalendarIcon className="size-4 shrink-0 text-label" strokeWidth={1.5} />
              <span className={cn(!date && "text-label")}>
                {date ? format(date, "d MMM yyyy", { locale: trLocale }) : tr.booking.pickDate}
              </span>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={trLocale}
                disabled={{ before: new Date() }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-2">
          <Label className={labelClass}>{t.time}</Label>
          <Select value={time} onValueChange={(val) => val && setTime(val)}>
            <SelectTrigger className="h-12 w-full rounded-xl border border-line/50 bg-canvas/30 px-4">
              <SelectValue placeholder={t.pickTime} />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((slot) => (
                <SelectItem key={slot} value={slot}>{slot}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label className={labelClass}>{t.partySize}</Label>
          <Select value={partySize} onValueChange={(val) => val && setPartySize(val)}>
            <SelectTrigger className="h-12 w-full rounded-xl border border-line/50 bg-canvas/30 px-4">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PARTY_SIZES.map((n) => (
                <SelectItem key={n} value={String(n)}>{t.partySizeCount(n)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label className={labelClass}>{t.fullName}</Label>
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required className={inputClass} />
        </div>

        <div className="flex flex-col gap-2">
          <Label className={labelClass}>{t.phone}</Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} required className={inputClass} />
        </div>

        <div className="flex flex-col gap-2">
          <Label className={labelClass}>{t.email}</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label className={labelClass}>{t.note}</Label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="resize-none rounded-xl border border-line/50 bg-canvas/30 px-4 py-3 text-sm text-ink outline-none transition-colors focus-visible:border-brand"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-line/30 pt-6">
        <Checkbox
          id="is-hotel-guest"
          checked={isHotelGuest}
          onCheckedChange={setIsHotelGuest}
        />
        <Label htmlFor="is-hotel-guest" className="text-sm text-ink/85">
          {t.isHotelGuest}
        </Label>
      </div>

      {isHotelGuest ? (
        <div className="mt-4 flex flex-col gap-2">
          <Label className={labelClass}>{t.reservationId}</Label>
          <Input
            value={reservationId}
            onChange={(e) => setReservationId(e.target.value)}
            placeholder="1042"
            required
            className={inputClass}
          />
          <p className="text-[12px] text-ink/60">{t.reservationIdHint}</p>
        </div>
      ) : (
        <div className="mt-6 rounded-xl bg-canvas p-6">
          <p className="mb-5 text-sm text-ink/80">{t.feeNotice(formatTRY(totalFee))}</p>
          <h4 className="mb-4 text-[11px] font-semibold tracking-[0.14em] text-label uppercase">
            {t.paymentHeading}
          </h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label className={labelClass}>{t.cardHolderName}</Label>
              <Input value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} required className={cn(inputClass, "bg-surface")} />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label className={labelClass}>{t.cardNumber}</Label>
              <Input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                inputMode="numeric"
                placeholder="•••• •••• •••• ••••"
                required
                className={cn(inputClass, "bg-surface")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className={labelClass}>{t.cardExpiry}</Label>
              <Input value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} placeholder="12/28" required className={cn(inputClass, "bg-surface")} />
            </div>
            <div className="flex flex-col gap-2">
              <Label className={labelClass}>{t.cardCvc}</Label>
              <Input value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} inputMode="numeric" placeholder="123" required className={cn(inputClass, "bg-surface")} />
            </div>
          </div>
        </div>
      )}

      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        disabled={!canSubmit || submitting}
        className="mt-8 h-12 w-full rounded-xl bg-brand text-[11px] tracking-[0.14em] text-white hover:bg-brand-hover"
      >
        {submitting ? t.submitting : isHotelGuest ? t.submitFree : t.submitPaid}
      </Button>
    </form>
  );
}
