import { VueI18nOptions } from "vue-i18n";
import { INITIAL_LOCALE, FALLBACK_LOCALE } from "@/env/variables";
import enUs from "./locales/en-US.json";

export const DEFAULT_LOCALE = "en-US";

// This array is an index of the JSON files in '@/locales
// Items in this array must adhere to the Language interface in components/LocaleSelect.vue
export const supportedLanguages = [
  { locale: "en-US", name: "English" },
  { locale: "ko", name: "한국어" },
];

export const supportedLocales = supportedLanguages.map(
  (language) => language.locale,
);

export const vueI18nOptions: VueI18nOptions = {
  locale: INITIAL_LOCALE || DEFAULT_LOCALE,
  fallbackLocale: FALLBACK_LOCALE || DEFAULT_LOCALE,
  messages: {
    "en-US": enUs,
  },
};
