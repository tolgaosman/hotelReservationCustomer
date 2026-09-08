"use client";

import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDictionary } from "@/lib/DictionaryContext";

const languages = [
  { code: "tr", name: "Türkçe", short: "TR" },
  { code: "en", name: "English", short: "EN" },
  { code: "ru", name: "Русский", short: "RU" },
  { code: "ar", name: "العربية", short: "AR" },
  { code: "fr", name: "Français", short: "FR" },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const tr = useDictionary();

  const handleLanguageChange = (code: string) => {
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink hover:text-ink/80 transition-colors"
        aria-label="Dil seçimi"
      >
        <Globe className="size-4" strokeWidth={1.5} />
        {tr.nav.lang}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="min-w-[140px] rounded-xl border-line/40 bg-surface p-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="cursor-pointer font-sans text-[13px] text-ink/80 focus:bg-canvas focus:text-brand rounded-lg px-3 py-2.5 transition-colors mb-0.5 last:mb-0 flex items-center"
          >
            <span className="flex-1 font-medium">{lang.name}</span>
            <span className="text-ink/40 text-[10px] font-semibold tracking-wider ml-4">{lang.short}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
