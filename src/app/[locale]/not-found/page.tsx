"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useIsRtl } from "@/hooks/use-rtl";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");
  const isRtl = useIsRtl();

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="flex min-h-screen flex-col bg-background text-foreground"
    >
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-5 pt-28 pb-20 text-center">
        <div className="surface-card max-w-md rounded-3xl p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            <span className="font-mono">404</span> / Not Found
          </p>
          <h1 className="mt-4 font-serif text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            404
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground">
            {t("line1")}
          </p>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            {t("line2")}
          </p>
          <Link
            href="/"
            className="btn-animate mt-7 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-colors hover:bg-primary/90"
          >
            <span>{t("cta")}</span>
            {isRtl ? (
              <ArrowLeft className="h-4 w-4" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
