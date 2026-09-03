"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { tr } from "@/lib/dictionary";
import { useAuth } from "@/lib/AuthContext";
import { ApiError, loginCustomer } from "@/lib/api";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthSplitLayout } from "@/components/layout/AuthSplitLayout";
import { PhoneNumberField } from "@/components/auth/PhoneNumberField";

export default function LoginPage() {
  // useSearchParams bir Suspense sınırı içinde olmalı (Next.js CSR bailout).
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [loginWithPhone, setLoginWithPhone] = useState(false);
  const [email, setEmail] = useState("");
  const [countryDial, setCountryDial] = useState("+90");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const required = searchParams.get("required") === "true";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const { user, token } = await loginCustomer(
        loginWithPhone
          ? { phone: `${countryDial} ${phoneNumber}`.trim(), password }
          : { email, password },
      );
      login(user, token);
      router.push(redirectUrl);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Giriş yapılamadı, lütfen tekrar deneyin.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthSplitLayout
      heading={tr.auth.loginHeading}
      subheading={
        required ? (
          <span className="text-brand font-medium">{tr.auth.loginRequiredMessage}</span>
        ) : (
          tr.auth.loginSubheading
        )
      }
      imageSrc="/images/login-bg.jpg"
      imageAlt="Oasis Resort"
      overlayText="Eşsiz bir tatil deneyimi için binlerce seçeneği keşfedin."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-sm text-red-600 mb-2">{error}</p>
        )}
        <div className="relative">
          <label className="mb-1 block text-xs font-medium text-ink/70">
            {loginWithPhone ? tr.reservation.guestDetails.phone : tr.auth.emailLabel}
          </label>
          {loginWithPhone ? (
            <PhoneNumberField
              countryDial={countryDial}
              onCountryDialChange={setCountryDial}
              number={phoneNumber}
              onNumberChange={setPhoneNumber}
              required
            />
          ) : (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border-none bg-canvas px-4 py-3 text-sm text-ink outline-none transition-all focus:ring-1 focus:ring-brand"
            />
          )}
        </div>

        <label className="-mt-2 flex w-fit items-center gap-2 text-xs text-ink/80 cursor-pointer">
          <Checkbox checked={loginWithPhone} onCheckedChange={setLoginWithPhone} />
          {tr.auth.loginWithPhone}
        </label>

        <div className="relative">
          <label className="mb-1 block text-xs font-medium text-ink/70">
            {tr.auth.passwordLabel}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border-none bg-canvas px-4 py-3 text-sm text-ink outline-none transition-all focus:ring-1 focus:ring-brand"
          />
        </div>

        <div className="-mt-2 flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-ink/80 cursor-pointer">
            <Checkbox checked={rememberMe} onCheckedChange={setRememberMe} />
            {tr.auth.rememberMe}
          </label>
          <Link href="#" className="text-xs font-medium text-ink hover:underline">
            {tr.auth.forgotPassword}
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full h-12 bg-[#594356] hover:bg-[#4a3748] text-sm tracking-wide text-white rounded-xl mt-4 disabled:opacity-60"
          )}
        >
          {tr.auth.loginButton}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-ink/80">
        {tr.auth.noAccount.split("?")[0]}?{" "}
        <Link
          href={`/register${redirectUrl !== "/" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
          className="font-medium text-ink hover:underline"
        >
          Kayıt Olun
        </Link>
      </p>
    </AuthSplitLayout>
  );
}
