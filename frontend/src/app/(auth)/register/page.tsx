"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { tr } from "@/lib/dictionary";
import { useAuth } from "@/lib/AuthContext";
import { ApiError, registerCustomer } from "@/lib/api";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { AuthSplitLayout } from "@/components/layout/AuthSplitLayout";
import { PhoneNumberField } from "@/components/auth/PhoneNumberField";

export default function RegisterPage() {
  // useSearchParams bir Suspense sınırı içinde olmalı (Next.js CSR bailout).
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryDial, setCountryDial] = useState("+90");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const { user, token } = await registerCustomer({
        fullName,
        email,
        phone: `${countryDial} ${phoneNumber}`.trim(),
        identityNumber: identityNumber || undefined,
        password,
      });
      login(user, token);
      router.push(redirectUrl);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Kayıt oluşturulamadı, lütfen tekrar deneyin.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthSplitLayout
      heading={tr.auth.registerHeading}
      subheading={tr.auth.registerSubheading}
      imageSrc="/images/register-bg.jpg"
      imageAlt="Oasis Resort Interior"
      overlayText="Lüks ve konforun birleştiği odayı keşfetmeye hazır mısınız?"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="relative">
            <label className="mb-1 block text-xs font-medium text-ink/70">
              {tr.reservation.guestDetails.fullName}
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full rounded-xl border-none bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-all focus:ring-1 focus:ring-brand"
            />
          </div>
          <div className="relative">
            <label className="mb-1 block text-xs font-medium text-ink/70">
              {tr.reservation.guestDetails.identityNumber}
            </label>
            <input
              type="text"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
              required
              className="w-full rounded-xl border-none bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-all focus:ring-1 focus:ring-brand"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="relative">
            <label className="mb-1 block text-xs font-medium text-ink/70">
              {tr.auth.emailLabel}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border-none bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-all focus:ring-1 focus:ring-brand"
            />
          </div>
          <div className="relative">
            <label className="mb-1 block text-xs font-medium text-ink/70">
              {tr.reservation.guestDetails.phone}
            </label>
            <PhoneNumberField
              countryDial={countryDial}
              onCountryDialChange={setCountryDial}
              number={phoneNumber}
              onNumberChange={setPhoneNumber}
              required
            />
          </div>
        </div>

        <div className="relative">
          <label className="mb-1 block text-xs font-medium text-ink/70">
            {tr.auth.passwordLabel}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full rounded-xl border-none bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-all focus:ring-1 focus:ring-brand"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full h-12 bg-[#594356] hover:bg-[#4a3748] text-sm tracking-wide text-white rounded-xl mt-4 disabled:opacity-60"
          )}
        >
          {tr.auth.registerCta}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/80">
        {tr.auth.hasAccount.split("?")[0]}?{" "}
        <Link
          href={`/login${redirectUrl !== "/" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
          className="font-medium text-ink hover:underline"
        >
          Giriş Yapın
        </Link>
      </p>
    </AuthSplitLayout>
  );
}
