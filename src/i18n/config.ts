export const defaultLocale = "en";

export const locales = ["en", "ru", "zh", "ky"] as const;

export type Locale = (typeof locales)[number];
