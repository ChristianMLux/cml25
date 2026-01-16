export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'de';

export function isValidLocale(locale: any): locale is Locale {
  return locales.includes(locale);
}
export const localeNames: Record<Locale, string> = {
  de: 'Deutsch',
  en: 'English',
};
