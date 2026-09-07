"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { tr as trLocale } from "date-fns/locale";
import { CalendarIcon, Loader2, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tr } from "@/lib/dictionary";
import { cn } from "@/lib/utils";
import { updateReservation, searchRooms, ApiError } from "@/lib/api";
import type { Reservation, Room } from "@/lib/types";

export function EditReservationModal({
  reservation,
  token,
  open,
  onOpenChange,
  onSuccess,
}: {
  reservation: Reservation;
  token: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) {
  const [arrival, setArrival] = useState<Date | undefined>(new Date(reservation.checkIn));
  const [departure, setDeparture] = useState<Date | undefined>(new Date(reservation.checkOut));
  const [guestCount, setGuestCount] = useState<number>(reservation.guestCount);
  const [roomId, setRoomId] = useState<number | undefined>(reservation.roomId);
  const [note, setNote] = useState<string>(reservation.note ?? "");
  
  const [availableRooms, setAvailableRooms] = useState<Room[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (!arrival || !departure) return;

    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSearching(true);
    setError(null);

    const timer = setTimeout(async () => {
      try {
        const rooms = await searchRooms({
          arrival: format(arrival, "yyyy-MM-dd"),
          departure: format(departure, "yyyy-MM-dd"),
          guests: guestCount,
          excludeReservationId: reservation.id,
        });
        
        if (!cancelled) {
          setAvailableRooms(rooms);
          
          const stillAvailable = rooms.find(r => r.id === roomId);
          if (!stillAvailable && rooms.length > 0) {
            setRoomId(rooms[0].id);
          } else if (rooms.length === 0) {
            setError("Seçtiğiniz tarihler/kişi sayısı için uygun oda bulunamadı.");
            setRoomId(undefined);
          }
        }
      } catch {
        if (!cancelled) setError("Odalar aranırken hata oluştu.");
      } finally {
        if (!cancelled) setIsSearching(false);
      }
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrival, departure, guestCount, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!arrival || !departure) {
      setError("Lütfen giriş ve çıkış tarihlerini seçin.");
      return;
    }
    if (!roomId) {
      setError("Lütfen bir oda seçin.");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await updateReservation(
        reservation.id,
        {
          roomId,
          checkIn: format(arrival, "yyyy-MM-dd"),
          checkOut: format(departure, "yyyy-MM-dd"),
          guestCount,
          note,
        },
        token,
      );
      onSuccess();
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Güncelleme başarısız oldu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md gap-0 p-0 sm:rounded-[32px] [&>button]:hidden">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <DialogTitle className="font-serif text-xl text-ink">
            Rezervasyonu Düzenle
          </DialogTitle>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-full p-2 text-label hover:bg-canvas hover:text-ink transition-colors"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
          
          <div className="grid gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] tracking-[0.14em] text-label">
                  {tr.booking.arrival}
                </label>
                <DatePickerButton
                  label={tr.booking.arrival}
                  value={arrival}
                  onChange={setArrival}
                  disabled={{ before: new Date() }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] tracking-[0.14em] text-label">
                  {tr.booking.departure}
                </label>
                <DatePickerButton
                  label={tr.booking.departure}
                  value={departure}
                  onChange={setDeparture}
                  disabled={(date) => date <= (arrival ?? new Date())}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] tracking-[0.14em] text-label">
                Misafir Sayısı
              </label>
              <Select value={guestCount.toString()} onValueChange={(val) => setGuestCount(Number(val))}>
                <SelectTrigger className="h-11 w-full justify-between rounded-xl border-line text-sm text-ink px-3 shadow-none">
                  <SelectValue placeholder="Misafir Sayısı Seçin" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-line bg-surface shadow-lg">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()} className="hover:bg-canvas focus:bg-canvas">
                      {tr.profile.reservations.guestCount(num)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] tracking-[0.14em] text-label">
                Oda Tipi
              </label>
              <Select 
                value={roomId ? roomId.toString() : ""} 
                onValueChange={(val) => setRoomId(Number(val))}
                disabled={isSearching || !availableRooms || availableRooms.length === 0}
              >
                <SelectTrigger className="h-11 w-full justify-between rounded-xl border-line text-sm text-ink px-3 shadow-none">
                  <SelectValue placeholder={isSearching ? "Aranıyor..." : "Oda Seçin"} />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-line bg-surface shadow-lg">
                  {availableRooms?.map((room) => (
                    <SelectItem key={room.id} value={room.id.toString()} className="hover:bg-canvas focus:bg-canvas">
                      {room.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] tracking-[0.14em] text-label">
                Notlar
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[100px] w-full resize-none rounded-xl border border-line bg-transparent p-3 text-sm text-ink outline-none transition-colors focus:border-brand shadow-sm"
                placeholder="Özel isteklerinizi belirtebilirsiniz..."
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="h-11 rounded-xl px-6 text-sm font-medium text-ink/70 hover:bg-canvas hover:text-ink transition-colors"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isSearching || availableRooms?.length === 0}
              className="flex h-11 items-center justify-center rounded-xl bg-brand px-8 text-[11px] tracking-[0.14em] text-white transition-colors hover:bg-brand-hover disabled:opacity-50 shadow-sm"
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Kaydet"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
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
        className="flex h-11 w-full items-center gap-2 rounded-xl border border-line px-3 text-left text-sm text-ink hover:border-ink/40 transition-colors shadow-none"
      >
        <CalendarIcon className="size-4 shrink-0 text-label" strokeWidth={1.5} />
        <span className={cn("truncate", !value && "text-label")}>
          {value ? format(value, "d MMM yyyy", { locale: trLocale }) : label}
        </span>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0 rounded-xl">
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
