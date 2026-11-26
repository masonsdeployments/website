"use client";

import { useLocale } from "next-intl";

export function useIsRtl(): boolean {
  const locale = useLocale();
  return locale === "ar";
}
