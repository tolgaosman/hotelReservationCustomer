"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { tr } from "@/lib/dictionary";
import { useAuth } from "@/lib/AuthContext";
import { ProfileSidebar, type ProfileSection } from "./ProfileSidebar";
import { PersonalInfoForm, PasswordForm } from "./ProfileForm";
import { ReservationList } from "./ReservationList";

export function ProfileContent() {
  const { user, token, isLoading, logout } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const reduceMotion = useReducedMotion();

  // /rezervasyon'daki "Profili Tamamla" bağlantısı doğrudan kişisel
  // bilgiler bölümünü açar ve pasaport alanını vurgular.
  const passportRequired = params.get("required") === "passport";
  const [section, setSection] = useState<ProfileSection>(
    passportRequired ? "info" : "reservations",
  );

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?required=true&redirect=/profil");
    }
  }, [user, isLoading, router]);

  if (!user || !token) return <ProfileSkeleton />;

  const passportMissing = !user.identityNumber?.trim();

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
      <ProfileSidebar
        user={user}
        active={section}
        onSelect={setSection}
        onLogout={logout}
        passportMissing={passportMissing}
      />

      <div>
        {passportMissing && (
          <p className="mb-6 border border-brand/30 bg-brand/5 px-6 py-4 text-sm text-brand">
            {tr.profile.passportMissingBanner}
          </p>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            {section === "reservations" && <ReservationList token={token} />}
            {section === "info" && (
              <PersonalInfoForm
                user={user}
                token={token}
                highlightPassport={passportRequired}
              />
            )}
            {section === "security" && <PasswordForm user={user} token={token} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
      <div className="h-[220px] animate-pulse bg-surface shadow-sm" />
      <div className="grid gap-4">
        {[0, 1].map((i) => (
          <div key={i} className="h-[132px] animate-pulse bg-surface shadow-sm" />
        ))}
      </div>
    </div>
  );
}
