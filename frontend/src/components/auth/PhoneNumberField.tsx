"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { countryCodes, flagEmoji } from "@/lib/countryCodes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function PhoneNumberField({
  id,
  countryDial,
  onCountryDialChange,
  number,
  onNumberChange,
  required,
  variant = "default",
}: {
  id?: string;
  countryDial: string;
  onCountryDialChange: (dial: string) => void;
  number: string;
  onNumberChange: (value: string) => void;
  required?: boolean;
  variant?: "default" | "underlined";
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) searchInputRef.current?.focus();
  }, [open]);

  const filteredCountries = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return countryCodes;

    const digits = query.replace(/[^0-9]/g, "");
    return countryCodes.filter((country) => {
      const matchesDigits = digits.length > 0 && country.dial.replace("+", "").includes(digits);
      const matchesName = country.name.toLowerCase().includes(query);
      return matchesDigits || matchesName;
    });
  }, [search]);

  return (
    <div className={cn("flex gap-2", variant === "underlined" && "border-b border-line")}>
      <Select
        value={countryDial}
        onValueChange={(v) => v && onCountryDialChange(v)}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setSearch("");
        }}
      >
        <SelectTrigger
          aria-label="Ülke kodu"
          className={cn(
            "!h-11 w-[76px] shrink-0 justify-between gap-1 text-sm text-ink shadow-none",
            variant === "default" && "rounded-xl border-0 bg-canvas px-3",
            variant === "underlined" && "rounded-none border-0 bg-transparent px-0 focus:ring-0 focus:ring-offset-0"
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="w-64 rounded-xl p-0">
          <div className="sticky top-0 z-10 border-b border-line bg-surface p-2">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-label"
                strokeWidth={1.5}
              />
              <input
                ref={searchInputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== "Escape") e.stopPropagation();
                  if (e.key === "Enter") e.preventDefault();
                }}
                placeholder="Ülke veya kod ara"
                className="h-9 w-full rounded-lg border-0 bg-canvas pl-8 pr-2 text-sm text-ink outline-none transition-all focus:ring-1 focus:ring-brand"
              />
            </div>
          </div>
          {filteredCountries.length === 0 ? (
            <p className="px-4 py-3 text-sm text-label">Sonuç bulunamadı</p>
          ) : (
            filteredCountries.map((country) => (
              <SelectItem
                key={`${country.iso2}-${country.dial}`}
                value={country.dial}
                className="gap-2 text-sm"
              >
                <span>{flagEmoji(country.iso2)}</span>
                <span className="text-label">{country.dial}</span>
                <span className="truncate">{country.name}</span>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      <input
        id={id}
        type="tel"
        inputMode="tel"
        value={number}
        onChange={(e) => {
          const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
          onNumberChange(onlyNumbers);
        }}
        required={required}
        className={cn(
          "h-11 min-w-0 flex-1 text-sm text-ink outline-none transition-all",
          variant === "default" && "rounded-xl border-none bg-canvas px-4 focus:ring-1 focus:ring-brand",
          variant === "underlined" && "rounded-none border-0 bg-transparent px-2 focus:ring-0 focus:ring-offset-0"
        )}
      />
    </div>
  );
}
