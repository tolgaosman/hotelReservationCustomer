"use client";

import type { LucideIcon } from "lucide-react";
import { Globe, IdCard, Mail, MessageSquare, Phone, User } from "lucide-react";
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

function IconInput({
  icon: Icon,
  className,
  ...props
}: { icon: LucideIcon } & React.ComponentProps<typeof Input>) {
  return (
    <div className="relative">
      <Icon
        className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-label"
        strokeWidth={1.5}
      />
      <Input
        className={`h-11 rounded-none border-0 border-b border-line pl-6 pr-0 focus-visible:ring-0 ${className ?? ""}`}
        {...props}
      />
    </div>
  );
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
        <IconInput id="fullName" icon={User} required {...field("fullName")} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-[11px] tracking-[0.1em] text-label">
          {tr.reservation.guestDetails.email}
        </Label>
        <IconInput id="email" type="email" icon={Mail} required {...field("email")} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone" className="text-[11px] tracking-[0.1em] text-label">
          {tr.reservation.guestDetails.phone}
        </Label>
        <IconInput id="phone" type="tel" icon={Phone} required {...field("phone")} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="identityNumber" className="text-[11px] tracking-[0.1em] text-label">
          {tr.reservation.guestDetails.identityNumber}
        </Label>
        <IconInput
          id="identityNumber"
          icon={IdCard}
          required
          inputMode="numeric"
          value={value.identityNumber}
          onChange={(e) => onChange({ ...value, identityNumber: e.target.value.replace(/[^0-9]/g, "") })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="country" className="text-[11px] tracking-[0.1em] text-label">
          {tr.reservation.guestDetails.country}
        </Label>
        <IconInput id="country" icon={Globe} {...field("country")} />
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <Label htmlFor="note" className="text-[11px] tracking-[0.1em] text-label">
          {tr.reservation.guestDetails.note}
        </Label>
        <IconInput id="note" icon={MessageSquare} {...field("note")} />
      </div>
    </div>
  );
}
