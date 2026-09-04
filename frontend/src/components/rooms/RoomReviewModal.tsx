"use client";

import { useState, useEffect, useMemo } from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tr } from "@/lib/dictionary";
import { cn } from "@/lib/utils";
import { getPhysicalRooms, fetchMyReservations, createReview } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import type { Reservation } from "@/lib/types";

interface PhysicalRoom {
  id: number;
  number: string;
  type: string;
}

interface RoomReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomTitle: string;
}

const todayStr = () => new Date().toISOString().slice(0, 10);

function matchesRoomTitle(type: string | undefined, roomTitle: string): boolean {
  if (!type) return false;
  return type === roomTitle || roomTitle.includes(type);
}

export function RoomReviewModal({ isOpen, onClose, roomTitle }: RoomReviewModalProps) {
  const { token, isLoading: authLoading } = useAuth();

  const [guestName, setGuestName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [reservationId, setReservationId] = useState<number | null>(null);
  const [roomTouched, setRoomTouched] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [physicalRooms, setPhysicalRooms] = useState<PhysicalRoom[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(false);

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loadingReservations, setLoadingReservations] = useState(false);

  useEffect(() => {
    if (isOpen && physicalRooms.length === 0) {
      setLoadingRooms(true);
      getPhysicalRooms()
        .then(rooms => {
          const filtered = rooms.filter(r => r.type === roomTitle || roomTitle.includes(r.type));
          setPhysicalRooms(filtered.length > 0 ? filtered : rooms);
        })
        .finally(() => setLoadingRooms(false));
    }
  }, [isOpen, roomTitle, physicalRooms.length]);

  useEffect(() => {
    if (isOpen && token && reservations.length === 0) {
      setLoadingReservations(true);
      fetchMyReservations(token)
        .then(setReservations)
        .catch(() => setReservations([]))
        .finally(() => setLoadingReservations(false));
    }
  }, [isOpen, token, reservations.length]);

  // Hesaba ait, bu oda tipinde, bugün devam eden ya da geçmişte kalmış
  // (gelecekteki hariç) rezervasyonlar — oda numarasına göre en güncel
  // rezervasyon önceliklidir.
  const eligibleByRoom = useMemo(() => {
    const today = todayStr();
    const eligible = reservations.filter(
      r => r.status !== "cancelled" && r.checkIn <= today && matchesRoomTitle(r.room?.type, roomTitle)
    );
    eligible.sort((a, b) => a.checkIn.localeCompare(b.checkIn));
    const map = new Map<string, Reservation>();
    eligible.forEach(r => map.set(String(r.roomId), r));
    return map;
  }, [reservations, roomTitle]);

  const defaultReservation = useMemo(() => {
    const today = todayStr();
    let best: Reservation | null = null;
    for (const r of eligibleByRoom.values()) {
      const isCurrent = r.checkOut >= today;
      if (isCurrent) {
        if (!best || (best.checkOut >= today ? r.checkIn > best.checkIn : true)) best = r;
      } else if (!best || best.checkOut < today) {
        if (!best || r.checkOut > best.checkOut) best = r;
      }
    }
    return best;
  }, [eligibleByRoom]);

  const loadingContext = loadingRooms || loadingReservations;

  useEffect(() => {
    if (!roomTouched && !loadingContext && defaultReservation) {
      setRoomId(String(defaultReservation.roomId));
      setReservationId(defaultReservation.id);
    }
  }, [roomTouched, loadingContext, defaultReservation]);

  const handleRoomChange = (value: string | null) => {
    if (!value) return;
    setRoomTouched(true);
    setRoomId(value);
    const match = eligibleByRoom.get(value);
    setReservationId(match ? match.id : null);
  };

  const noEligibleStay = !loadingContext && eligibleByRoom.size === 0;
  const roomMismatch = !loadingContext && !!roomId && !reservationId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !roomId || !reservationId || rating === 0 || !token) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      await createReview(
        {
          room_id: parseInt(roomId),
          reservation_id: reservationId,
          guest_name: guestName.trim(),
          rating,
          comment: comment.trim() || undefined,
        },
        token
      );

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || tr.rooms.reviewError);
    }
  };

  const handleReset = () => {
    setGuestName("");
    setRoomId("");
    setReservationId(null);
    setRoomTouched(false);
    setRating(0);
    setComment("");
    setStatus("idle");
    setErrorMessage("");
    setReservations([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleReset()}>
      <DialogContent className="sm:max-w-md bg-surface p-0 overflow-hidden border-line/30 rounded-2xl">
        <div className="p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="font-serif text-2xl text-ink">
              {tr.rooms.reviewTitle}
            </DialogTitle>
            <DialogDescription className="text-ink/60 mt-2">
              {roomTitle} {tr.rooms.reviewDescription}
            </DialogDescription>
          </DialogHeader>

          {!authLoading && !token ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <h3 className="font-serif text-xl text-ink mb-2">{tr.rooms.reviewLoginRequiredTitle}</h3>
              <p className="text-sm text-ink/70 mb-6">{tr.rooms.reviewLoginRequiredDesc}</p>
              <Button
                render={<Link href="/login" />}
                className="w-full bg-brand text-white hover:bg-brand-hover"
              >
                {tr.rooms.reviewLoginButton}
              </Button>
            </div>
          ) : status === "success" ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-brand/10 text-brand rounded-full flex items-center justify-center mb-4">
                <Star className="fill-brand" size={32} />
              </div>
              <h3 className="font-serif text-xl text-ink mb-2">{tr.rooms.reviewSuccessTitle}</h3>
              <p className="text-sm text-ink/70 mb-6">{tr.rooms.reviewSuccessDesc}</p>
              <Button onClick={handleReset} variant="outline" className="w-full">
                {tr.rooms.reviewClose}
              </Button>
            </div>
          ) : noEligibleStay ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <h3 className="font-serif text-xl text-ink mb-2">{tr.rooms.reviewNoStayTitle}</h3>
              <p className="text-sm text-ink/70">{tr.rooms.reviewNoStayDesc}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-xs font-semibold tracking-wider text-label uppercase mb-2">
                  ADINIZ SOYADINIZ *
                </label>
                <Input
                  type="text"
                  placeholder="Ad Soyad"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                  className="bg-canvas border-line/50 text-ink focus-visible:ring-brand"
                  disabled={status === "submitting"}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-label uppercase mb-2">
                  KALDIĞINIZ ODA *
                </label>
                <Select value={roomId} onValueChange={handleRoomChange} disabled={status === "submitting" || loadingContext}>
                  <SelectTrigger className="w-full h-12 rounded-xl border border-line/50 bg-canvas text-ink focus:ring-1 focus:ring-brand">
                    <SelectValue placeholder={loadingContext ? "Yükleniyor..." : "Lütfen kaldığınız odayı seçin"} />
                  </SelectTrigger>
                  <SelectContent className="bg-canvas border-line/50">
                    {physicalRooms.map(r => (
                      <SelectItem key={r.id} value={r.id.toString()} className="focus:bg-brand/10 focus:text-brand cursor-pointer">
                        Oda {r.number}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {roomMismatch && (
                  <p className="text-xs text-red-600 mt-2">{tr.rooms.reviewRoomMismatch}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-label uppercase mb-2">
                  {tr.rooms.reviewRating} *
                </label>
                <div
                  className="flex gap-1"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      disabled={status === "submitting"}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      className="p-1 focus:outline-none transition-transform active:scale-90 disabled:opacity-50"
                    >
                      <Star
                        size={32}
                        className={cn(
                          "transition-colors",
                          (hoverRating || rating) >= star
                            ? "fill-brand text-brand"
                            : "fill-line/20 text-line/50"
                        )}
                        strokeWidth={1}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-label uppercase mb-2">
                  {tr.rooms.reviewComment}
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={tr.rooms.reviewCommentPlaceholder}
                  rows={3}
                  className="w-full rounded-xl border border-line/50 bg-canvas p-3 text-sm text-ink outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand disabled:opacity-50 resize-none"
                  disabled={status === "submitting"}
                />
              </div>

              {status === "error" && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 text-sm">
                  {errorMessage}
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={!guestName || !roomId || !reservationId || rating === 0 || status === "submitting"}
                  className="w-full bg-brand text-white hover:bg-brand-hover h-12 text-sm font-medium tracking-wide"
                >
                  {status === "submitting" ? tr.rooms.reviewSubmitting : tr.rooms.reviewSubmit}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
