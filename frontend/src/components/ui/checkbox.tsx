"use client";

import { cn } from "@/lib/utils";

/**
 * Native <input type="checkbox"> ile aynı davranışı korur (label tıklaması,
 * klavye ile odaklanma) ama site tasarımına uygun kare/marka renginde bir
 * kutucuk olarak çizilir — tarayıcı varsayılan checkbox'ı yerine.
 */
export function Checkbox({
  checked,
  onCheckedChange,
  className,
  id,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  id?: string;
}) {
  return (
    <span className="relative inline-flex size-4 shrink-0">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="peer absolute inset-0 size-full cursor-pointer opacity-0"
      />
      <span
        aria-hidden="true"
        className={cn(
          "flex size-4 items-center justify-center rounded-[5px] border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40 peer-focus-visible:ring-offset-2",
          checked ? "border-brand bg-brand" : "border-line bg-transparent",
          className,
        )}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="size-2.5 text-white" fill="none">
            <path
              d="M2.5 6.2 4.8 8.5 9.5 3.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </span>
  );
}
