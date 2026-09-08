"use client";

import { useState, useEffect, type FormEvent } from "react";
import { format } from "date-fns";
import { tr as trLocale } from "date-fns/locale";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { useDictionary } from "@/lib/DictionaryContext";
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
import { ApiError, createRestaurantReservation, fetchMyReservations } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import type { Reservation } from "@/lib/types";

const FEE_PER_PERSON = 350;

const TIME_SLOTS = [
  "12:30", "13:00", "13:30", "14:00", "14:30",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
];

const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8];

const inputClass =
  "h-12 rounded-xl border-line/50 bg-canvas/30 px-4 focus-visible:border-brand focus-visible:ring-brand/20";
const labelClass = "text-[11px] font-semibold tracking-[0.14em] text-label uppercase";

export function RestaurantReservationForm({
  onShortFormChange,
}: {
  onShortFormChange?: (isShort: boolean) => void;
} = {}) {
  const tr = useDictionary();
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

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<"waived" | "pay_at_hotel" | null>(null);

  const { user, token } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loadingReservations, setLoadingReservations] = useState(false);

  useEffect(() => {
    if (user && token) {
      setLoadingReservations(true);
      fetchMyReservations(token)
        .then((res) => {
          const activeRes = res.filter(r =>
            r.status === "confirmed" || r.status === "checked_in" || r.status === "pending"
          );
          setReservations(activeRes);
          if (activeRes.length > 0) {
            setIsHotelGuest(true);
            setReservationId(String(activeRes[0].id));
          } else {
            setIsHotelGuest(false);
          }
        })
        .catch(console.error)
        .finally(() => setLoadingReservations(false));
    } else {
      setIsHotelGuest(false);
      setReservations([]);
    }
  }, [user, token]);

  const isShort = isHotelGuest && reservations.length > 0;
  useEffect(() => {
    onShortFormChange?.(isShort);
  }, [isShort, onShortFormChange]);

  const dateFilteredReservations = date
    ? reservations.filter((r) => {
        const checkIn = new Date(r.checkIn);
        const checkOut = new Date(r.checkOut);
        checkIn.setHours(0, 0, 0, 0);
        checkOut.setHours(0, 0, 0, 0);
        const selected = new Date(date);
        selected.setHours(0, 0, 0, 0);
        return selected >= checkIn && selected <= checkOut;
      })
    : reservations;

  useEffect(() => {
    if (dateFilteredReservations.length > 0) {
      if (!dateFilteredReservations.some((r) => String(r.id) === reservationId)) {
        setReservationId(String(dateFilteredReservations[0].id));
      }
    } else {
      setReservationId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, reservations]);

  const totalFee = FEE_PER_PERSON * Number(partySize || 0);

  const canUseFreeReservation = isHotelGuest && dateFilteredReservations.length > 0;

  const canSubmit =
    Boolean(date && time && fullName.trim() && phone.trim()) &&
    (!canUseFreeReservation || Boolean(reservationId.trim()));

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
        isHotelGuest: canUseFreeReservation,
        reservationId: canUseFreeReservation ? Number(reservationId) : undefined,
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
          {confirmed === "waived" ? tr.restaurant.confirmed.bodyWaived : tr.restaurant.confirmed.bodyPayAtHotel}
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
                defaultMonth={date}
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
            <SelectTrigger size="none" className="h-12 w-full rounded-xl border border-line/50 bg-canvas/30 px-4">
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
            <SelectTrigger size="none" className="h-12 w-full rounded-xl border border-line/50 bg-canvas/30 px-4">
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
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            required
            inputMode="numeric"
            pattern="[0-9]*"
            className={inputClass}
          />
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

      <div className="mt-6 border-t border-line/30 pt-6">
        {loadingReservations ? (
          <p className="text-sm text-ink/75">Rezervasyonlariniz kontrol ediliyor...</p>
        ) : isHotelGuest && dateFilteredReservations.length > 0 ? (
          <div className="flex flex-col gap-2">
            <Label className={labelClass}>Konaklama Rezervasyonunuz</Label>
            <Select value={reservationId} onValueChange={(val) => val && setReservationId(val)}>
              <SelectTrigger size="none" className={cn(inputClass, "w-full")}>
                <SelectValue placeholder="Rezervasyon seçin" />
              </SelectTrigger>
              <SelectContent>
                {dateFilteredReservations.map((r) => (
                  <SelectItem key={r.id} value={String(r.id)}>
                    Rezervasyon #{r.id} ({format(new Date(r.checkIn), "d MMM", { locale: trLocale })} - {format(new Date(r.checkOut), "d MMM", { locale: trLocale })})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-[12px] text-ink/60">Bu rezervasyonunuz sayesinde ücretsiz masa ayırtabilirsiniz.</p>
          </div>
        ) : isHotelGuest && reservations.length > 0 && date ? (
          <div className="rounded-xl bg-canvas p-6">
            <p className="text-sm text-ink/80">Seçtiğiniz tarihte konaklama rezervasyonunuz bulunmuyor.</p>
            <p className="mt-2 text-sm text-ink/80">{t.feeNotice(formatTRY(totalFee))}</p>
            <p className="mt-2 text-sm text-ink/80">{t.payAtHotelNotice}</p>
          </div>
        ) : (
          <div className="rounded-xl bg-canvas p-6">
            <p className="text-sm text-ink/80">{t.feeNotice(formatTRY(totalFee))}</p>
            <p className="mt-2 text-sm text-ink/80">{t.payAtHotelNotice}</p>
          </div>
        )}
      </div>

      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        disabled={!canSubmit || submitting}
        className="mt-8 h-12 w-full rounded-xl bg-brand text-[11px] tracking-[0.14em] text-white hover:bg-brand-hover"
      >
        {submitting ? t.submitting : canUseFreeReservation ? t.submitFree : t.submitPaid}
      </Button>
    </form>
  );
}