export const internalPageKeys = ["story", "projects", "capabilities", "about", "contact"] as const;

export type InternalPageKey = (typeof internalPageKeys)[number];
