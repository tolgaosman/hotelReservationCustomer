"use client";

import { CalendarCheck, Lock, LogOut, User as UserIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { tr } from "@/lib/dictionary";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AuthUser } from "@/lib/api";

export type ProfileSection = "reservations" | "info" | "security";

const NAV_ITEMS: { id: ProfileSection; label: string; icon: LucideIcon }[] = [
  { id: "reservations", label: tr.profile.nav.reservations, icon: CalendarCheck },
  { id: "info", label: tr.profile.nav.info, icon: UserIcon },
  { id: "security", label: tr.profile.nav.security, icon: Lock },
];

/** "Tolga Osman Falay" → "TF" */
function initials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function ProfileSidebar({
  user,
  active,
  onSelect,
  onLogout,
  passportMissing,
}: {
  user: AuthUser;
  active: ProfileSection;
  onSelect: (section: ProfileSection) => void;
  onLogout: () => void;
  passportMissing: boolean;
}) {
  return (
    <aside className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
      <div className="bg-surface p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand/10 font-serif text-lg text-brand">
            {initials(user.fullName)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-serif text-lg leading-snug text-ink">
              {user.fullName}
            </p>
            <p className="truncate text-xs text-label">{user.email}</p>
          </div>
        </div>
        {user.createdAt && (
          <p className="mt-4 border-t border-line pt-4 text-[10px] tracking-[0.14em] text-label">
            {tr.profile.memberSince(formatDate(new Date(user.createdAt)))}
          </p>
        )}
      </div>

      <nav className="mt-4 flex overflow-x-auto bg-surface shadow-sm lg:mt-6 lg:flex-col lg:overflow-visible">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-3 whitespace-nowrap px-5 py-4 text-[11px] uppercase tracking-[0.14em] transition-colors",
                "border-b-2 lg:border-b-0 lg:border-l-2",
                isActive
                  ? "border-brand bg-canvas text-ink"
                  : "border-transparent text-ink/65 hover:bg-canvas/60 hover:text-ink",
              )}
            >
              <Icon className="size-4 shrink-0" strokeWidth={1.5} />
              {label}
              {id === "info" && passportMissing && (
                <span className="size-1.5 shrink-0 rounded-full bg-amber-500" />
              )}
            </button>
          );
        })}
        <button
          type="button"
          onClick={onLogout}
          className="flex shrink-0 items-center gap-3 whitespace-nowrap border-b-2 border-transparent px-5 py-4 text-[11px] uppercase tracking-[0.14em] text-ink/65 transition-colors hover:bg-canvas/60 hover:text-ink lg:border-b-0 lg:border-l-2 lg:border-t lg:border-t-line"
        >
          <LogOut className="size-4 shrink-0" strokeWidth={1.5} />
          {tr.profile.nav.logout}
        </button>
      </nav>
    </aside>
  );
}
