export const siteName = "BELES";

export const defaultTitle = siteName;

export const defaultDescription =
  "BELES develops engineering-led mobility solutions for industrial and commercial transportation.";

export const defaultOgType = "website";

export function formatTitle(title = defaultTitle) {
  return title === siteName ? siteName : `${title} — ${siteName}`;
}
