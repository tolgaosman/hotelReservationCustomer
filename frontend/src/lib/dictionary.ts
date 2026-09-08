import type { Dictionary as TRDictionary } from "./dictionaries/tr";
export type Locale = "tr" | "en" | "ru" | "ar" | "fr";

const dictionaries = {
  tr: () => import("./dictionaries/tr").then((module) => module.tr),
  en: () => import("./dictionaries/en").then((module) => module.en),
  ru: () => import("./dictionaries/ru").then((module) => module.ru),
  ar: () => import("./dictionaries/ar").then((module) => module.ar),
  fr: () => import("./dictionaries/fr").then((module) => module.fr),
};

export const getDictionary = async (locale: Locale) => {
  if (typeof dictionaries[locale] === "function") {
    return dictionaries[locale]();
  }
  return dictionaries.tr();
};

export type Dictionary = TRDictionary;


