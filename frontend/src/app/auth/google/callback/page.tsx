"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { fetchCurrentCustomer } from "@/lib/api";

export default function GoogleCallbackPage() {
  // useSearchParams bir Suspense sınırı içinde olmalı (Next.js CSR bailout).
  return (
    <Suspense fallback={null}>
      <GoogleCallback />
    </Suspense>
  );
}

function GoogleCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();
  const token = params.get("token");
  const redirectTo = params.get("redirect") || "/";
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    if (!token) return;

    fetchCurrentCustomer(token)
      .then((user) => {
        login(user, token);
        router.replace(redirectTo);
      })
      .catch(() => {
        setFetchFailed(true);
      });
  }, [token, redirectTo, login, router]);

  const hasError = !token || fetchFailed;

  return (
    <div className="flex min-h-[calc(100vh-var(--nav-h))] items-center justify-center bg-canvas px-6 text-center">
      {hasError ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-red-600">
            Google ile giriş başarısız oldu, lütfen tekrar deneyin.
          </p>
          <a href="/login" className="text-sm font-medium text-ink underline">
            Giriş sayfasına dön
          </a>
        </div>
      ) : (
        <p className="text-sm text-ink/70">Giriş yapılıyor…</p>
      )}
    </div>
  );
}
