"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tr } from "@/lib/dictionary";

export interface GuestDetails {
  fullName: string;
  email: string;
  phone: string;
  identityNumber: string;
  country: string;
  note: string;
}

export function GuestDetailsForm({
  value,
  onChange,
}: {
  value: GuestDetails;
  onChange: (value: GuestDetails) => void;
}) {
  const field = (key: keyof GuestDetails) => ({
    value: value[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ ...value, [key]: e.target.value }),
  });

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-2 sm:col-span-2">
        <Label htmlFor="fullName" className="text-[11px] tracking-[0.1em] text-label">
          {tr.reservation.guestDetails.fullName}
        </Label>
        <Input
          id="fullName"
          required
          className="h-11 rounded-none border-0 border-b border-line px-0 focus-visible:ring-0"
          {...field("fullName")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-[11px] tracking-[0.1em] text-label">
          {tr.reservation.guestDetails.email}
        </Label>
        <Input
          id="email"
          type="email"
          required
          className="h-11 rounded-none border-0 border-b border-line px-0 focus-visible:ring-0"
          {...field("email")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone" className="text-[11px] tracking-[0.1em] text-label">
          {tr.reservation.guestDetails.phone}
        </Label>
        <Input
          id="phone"
          type="tel"
          required
          className="h-11 rounded-none border-0 border-b border-line px-0 focus-visible:ring-0"
          {...field("phone")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="identityNumber" className="text-[11px] tracking-[0.1em] text-label">
          {tr.reservation.guestDetails.identityNumber}
        </Label>
        <Input
          id="identityNumber"
          required
          className="h-11 rounded-none border-0 border-b border-line px-0 focus-visible:ring-0"
          {...field("identityNumber")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="country" className="text-[11px] tracking-[0.1em] text-label">
          {tr.reservation.guestDetails.country}
        </Label>
        <Input
          id="country"
          className="h-11 rounded-none border-0 border-b border-line px-0 focus-visible:ring-0"
          {...field("country")}
        />
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <Label htmlFor="note" className="text-[11px] tracking-[0.1em] text-label">
          {tr.reservation.guestDetails.note}
        </Label>
        <Input
          id="note"
          className="h-11 rounded-none border-0 border-b border-line px-0 focus-visible:ring-0"
          {...field("note")}
        />
      </div>
    </div>
  );
}
