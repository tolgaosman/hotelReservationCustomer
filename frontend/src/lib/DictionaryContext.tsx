"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "./dictionary";
import { tr } from "./dictionaries/tr";
import { en } from "./dictionaries/en";
import { ar } from "./dictionaries/ar";
import { ru } from "./dictionaries/ru";
import { fr } from "./dictionaries/fr";

const dictionaries: Record<string, Dictionary> = {
  tr,
  en,
  ar,
  ru,
  fr,
};

const DictionaryContext = createContext<Dictionary | null>(null);

export function DictionaryProvider({ children, lang }: { children: React.ReactNode, lang: string }) {
  const dictionary = dictionaries[lang] || dictionaries["tr"];
  return <DictionaryContext.Provider value={dictionary}>{children}</DictionaryContext.Provider>;
}

export function useDictionary() {
  const dict = useContext(DictionaryContext);
  if (!dict) throw new Error("useDictionary must be used within DictionaryProvider");
  return dict;
}
