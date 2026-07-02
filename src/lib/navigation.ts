import type { Locale } from "../i18n/config";

export const navItems = [
  {
    key: "story",
    label: "Story",
    href: "/story/",
  },
  {
    key: "projects",
    label: "Projects",
    href: "/projects/",
  },
  {
    key: "capabilities",
    label: "Capabilities",
    href: "/capabilities/",
  },
  {
    key: "about",
    label: "About",
    href: "/about/",
  },
  {
    key: "contact",
    label: "Contact",
    href: "/contact/",
  },
] as const;

export const localeItems = [
  {
    locale: "en",
    label: "English",
    shortLabel: "EN",
    pathPrefix: "/",
  },
  {
    locale: "ru",
    label: "Русский",
    shortLabel: "RU",
    pathPrefix: "/ru/",
  },
  {
    locale: "zh",
    label: "中文",
    shortLabel: "ZH",
    pathPrefix: "/zh/",
  },
  {
    locale: "ky",
    label: "Кыргызча",
    shortLabel: "KY",
    pathPrefix: "/ky/",
  },
] as const satisfies readonly {
  locale: Locale;
  label: string;
  shortLabel: string;
  pathPrefix: string;
}[];

export type NavItem = (typeof navItems)[number];
export type NavKey = NavItem["key"];
export type LocaleItem = (typeof localeItems)[number];

export function getLocaleFromPathname(pathname: string): Locale {
  const locale = localeItems.find(
    (item) => item.locale !== "en" && pathname.startsWith(item.pathPrefix),
  );

  return locale?.locale ?? "en";
}

export function getPathWithoutLocalePrefix(pathname: string): string {
  const locale = localeItems.find(
    (item) => item.locale !== "en" && pathname.startsWith(item.pathPrefix),
  );

  if (!locale) {
    return pathname || "/";
  }

  const path = pathname.slice(locale.pathPrefix.length - 1);

  return path === "" ? "/" : path;
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (locale === "en") {
    return normalizedPath;
  }

  if (normalizedPath === "/") {
    return `/${locale}/`;
  }

  return `/${locale}${normalizedPath}`;
}
