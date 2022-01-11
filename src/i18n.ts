import { createI18n, I18n } from "vue-i18n";
import enUs from "./locales/en-US.json";

const DEFAULT_LOCALE = "en-US";

export const INITIAL_LOCALE =
  (import.meta.env.VITE_INITIAL_LOCALE as string | undefined) || DEFAULT_LOCALE;

export const FALLBACK_LOCALE =
  (import.meta.env.VITE_FALLBACK_LOCALE as string | undefined) ||
  DEFAULT_LOCALE;

export const i18n = createI18n<false>({
  legacy: false,
  locale: INITIAL_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  messages: {
    "en-US": enUs,
  },
});

// This array is an index of the JSON files in '@/locales
// Items in this array must adhere to the Language interface in components/LocaleSelect.vue
export const supportedLanguages = [
  { locale: "en-US", name: "English" },
  { locale: "ko", name: "한국어" },
];

export const supportedLocales = supportedLanguages.map(
  (language) => language.locale,
);

export async function setLocale(
  i18n: I18n<{}, {}, {}, string, false>,
  locale: string,
  document: Document,
): Promise<void> {
  if (!i18n.global.availableLocales.includes(locale)) {
    const messages = await import(`./locales/${locale}.json`);
    i18n.global.setLocaleMessage(locale, messages.default);
  }
  i18n.global.locale.value = locale;
  (document.querySelector("html") as HTMLElement).setAttribute("lang", locale);
}
