"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { IdCard, Lock, Mail, User } from "lucide-react";
import { useDictionary } from "@/lib/DictionaryContext";
import { useAuth } from "@/lib/AuthContext";
import { ApiError, updateProfile } from "@/lib/api";
import type { AuthUser } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PhoneNumberField } from "@/components/auth/PhoneNumberField";
import { splitPhoneNumber } from "@/lib/countryCodes";

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
        className={cn(
          "h-11 rounded-none border-0 border-b border-line pl-6 pr-0 focus-visible:ring-0",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function SectionCard({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-surface p-6 shadow-sm sm:p-8">
      <h2 className="font-serif text-xl text-ink">{heading}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

const labelClass = "text-[11px] tracking-[0.1em] text-label";
const primaryButtonClass =
  "h-11 w-fit rounded-none bg-brand px-8 text-[11px] tracking-[0.14em] text-white hover:bg-brand-hover";

/** Ad Soyad / E-posta / Telefon / Pasaport — profilin ana bölümü. */
export function PersonalInfoForm({
  user,
  token,
  highlightPassport,
}: {
  user: AuthUser;
  token: string;
  highlightPassport?: boolean;
}) {
  const tr = useDictionary();
  const { updateUser } = useAuth();

  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);

  const initialPhone = splitPhoneNumber(user.phone);
  const [countryDial, setCountryDial] = useState(initialPhone.dial);
  const [phoneNumber, setPhoneNumber] = useState(initialPhone.number);

  const [identityNumber, setIdentityNumber] = useState(user.identityNumber ?? "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const passportEmpty = !identityNumber.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSaving(true);
    try {
      const updated = await updateProfile(
        { fullName, email, phone: `${countryDial} ${phoneNumber}`.trim(), identityNumber: identityNumber || undefined },
        token,
      );
      updateUser(updated);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Bilgileriniz güncellenemedi, lütfen tekrar deneyin.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <SectionCard heading={tr.profile.personalInfo.heading}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="fullName" className={labelClass}>
              {tr.reservation.guestDetails.fullName}
            </Label>
            <IconInput
              id="fullName"
              icon={User}
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className={labelClass}>
              {tr.reservation.guestDetails.email}
            </Label>
            <IconInput
              id="email"
              type="email"
              icon={Mail}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone" className={labelClass}>
              {tr.reservation.guestDetails.phone}
            </Label>
            <PhoneNumberField
              id="phone"
              countryDial={countryDial}
              onCountryDialChange={setCountryDial}
              number={phoneNumber}
              onNumberChange={setPhoneNumber}
              required
              variant="underlined"
            />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label
              htmlFor="identityNumber"
              className={cn(
                "text-[11px] tracking-[0.1em]",
                highlightPassport && passportEmpty ? "text-brand" : "text-label",
              )}
            >
              {tr.reservation.guestDetails.identityNumber}
            </Label>
            <IconInput
              id="identityNumber"
              icon={IdCard}
              autoFocus={highlightPassport}
              inputMode="numeric"
              className={
                highlightPassport && passportEmpty
                  ? "border-brand focus-visible:ring-brand/30"
                  : undefined
              }
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value.replace(/[^0-9]/g, ""))}
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && (
          <p className="text-sm text-emerald-600">{tr.profile.personalInfo.success}</p>
        )}

        <Button type="submit" disabled={saving} className={primaryButtonClass}>
          {saving ? tr.profile.personalInfo.saving : tr.profile.personalInfo.saveCta}
        </Button>
      </form>
    </SectionCard>
  );
}

/** Şifre değiştirme — mevcut şifre backend'de Hash::check ile doğrulanır. */
export function PasswordForm({ user, token }: { user: AuthUser; token: string }) {
  const tr = useDictionary();
  const { updateUser } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSaving(true);
    try {
      // Backend PUT /auth/profile tüm profili bekliyor; şifre alanları
      // opsiyonel eklenir, kalanlar mevcut değerleriyle gönderilir.
      const updated = await updateProfile(
        {
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          identityNumber: user.identityNumber || undefined,
          currentPassword,
          password: newPassword,
          password_confirmation: newPasswordConfirmation,
        },
        token,
      );
      updateUser(updated);
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirmation("");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Şifreniz güncellenemedi, lütfen tekrar deneyin.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <SectionCard heading={tr.profile.changePassword.heading}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="currentPassword" className={labelClass}>
              {tr.profile.changePassword.currentPassword}
            </Label>
            <IconInput
              id="currentPassword"
              type="password"
              icon={Lock}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="newPassword" className={labelClass}>
              {tr.profile.changePassword.newPassword}
            </Label>
            <IconInput
              id="newPassword"
              type="password"
              icon={Lock}
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="newPasswordConfirmation" className={labelClass}>
              {tr.profile.changePassword.newPasswordConfirmation}
            </Label>
            <IconInput
              id="newPasswordConfirmation"
              type="password"
              icon={Lock}
              required
              minLength={8}
              value={newPasswordConfirmation}
              onChange={(e) => setNewPasswordConfirmation(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && (
          <p className="text-sm text-emerald-600">{tr.profile.changePassword.success}</p>
        )}

        <Button
          type="submit"
          disabled={saving || !currentPassword || !newPassword}
          className={primaryButtonClass}
        >
          {saving ? tr.profile.changePassword.saving : tr.profile.changePassword.saveCta}
        </Button>
      </form>
    </SectionCard>
  );
}
