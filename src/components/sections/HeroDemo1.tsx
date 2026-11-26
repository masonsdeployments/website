"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useIsRtl } from "@/hooks/use-rtl";
import { useLenis } from "@/components/providers/LenisProvider";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { ProjectInquiryTrigger } from "@/components/project-inquiry-modal";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const HeroDemo1 = () => {
  const t = useTranslations("Hero");
  const td = useTranslations("HeroDemo");
  const isRtl = useIsRtl();
  const { scrollTo } = useLenis();
  const containerRef = useRef<HTMLDivElement>(null);
  const [cairoTime, setCairoTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        setCairoTime(
          new Intl.DateTimeFormat("en-GB", {
            timeZone: site.timeZone,
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(new Date())
        );
      } catch {
        setCairoTime("");
      }
    };
    updateTime();
    const id = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          ".demo1-meta",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45 }
        )
          .fromTo(
            ".demo1-title",
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.2"
          )
          .fromTo(
            ".demo1-body",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.55 },
            "-=0.3"
          )
          .fromTo(
            ".demo1-ledger",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.55 },
            "-=0.35"
          );
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [] }
  );

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) scrollTo(el, { offset: -88 });
  };

  const ledger = [
    {
      index: "01",
      value: "10M+ EGP",
      label: td("ledger.volumeLabel"),
      note: td("ledger.volumeNote"),
    },
    {
      index: "02",
      value: "20+",
      label: td("ledger.buildsLabel"),
      note: td("ledger.buildsNote"),
    },
    {
      index: "03",
      value: td("ledger.timelineValue"),
      label: td("ledger.timelineLabel"),
      note: td("ledger.timelineNote"),
    },
    {
      index: "04",
      value: "24h",
      label: td("ledger.replyLabel"),
      note: td("ledger.replyNote"),
    },
  ];

  const capabilities = [
    td("capabilities.c1"),
    td("capabilities.c2"),
    td("capabilities.c3"),
    td("capabilities.c4"),
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      dir={isRtl ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-background pt-24 pb-16 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 studio-grid opacity-45"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hero-gradient"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Quiet editorial masthead */}
        <div className="demo1-meta flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border/50 pb-4 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span className="font-medium text-foreground">{t("location")}</span>
            {cairoTime ? (
              <>
                <span aria-hidden className="text-border">
                  ·
                </span>
                <span
                  dir="ltr"
                  className="font-mono text-[11px] tabular-nums text-muted-foreground"
                >
                  {cairoTime} EET
                </span>
              </>
            ) : null}
          </div>

          <ProjectInquiryTrigger className="group inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-primary">
            <span>{t("availability")}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </ProjectInquiryTrigger>
        </div>

        {/* Monumental Display Headline */}
        <div className="demo1-title pt-12 pb-10 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {t("tagline")}
          </p>

          <h1 className="max-w-5xl font-serif text-5xl font-bold leading-[0.98] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
            {t("titleLine1")}{" "}
            <span className="gradient-text block font-serif sm:inline">
              {t("titleHighlight")}
            </span>
          </h1>
        </div>

        {/* Asymmetric 12-Col Split: Narrative + CTAs vs Commercial Proof Ledger */}
        <div className="grid grid-cols-1 gap-10 border-t border-border/50 pt-10 lg:grid-cols-12 lg:gap-12 lg:pt-12">
          <div className="demo1-body flex flex-col justify-between gap-8 lg:col-span-6">
            <div className="space-y-4">
              <p className="max-w-xl text-lg leading-relaxed text-foreground/90 sm:text-xl">
                {t("description")}
              </p>
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
                {td("demo1Subnote")}
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={site.studioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-animate inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>{t("ctaPrimary")}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <button
                type="button"
                onClick={() => handleScrollTo("projects")}
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-border/70 bg-card/70 px-7 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>{t("ctaSecondary")}</span>
                <ArrowRight
                  className={cn(
                    "h-4 w-4 transition-transform group-hover:translate-x-0.5",
                    isRtl && "rotate-180 group-hover:-translate-x-0.5"
                  )}
                />
              </button>

              <ProjectInquiryTrigger className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>{t("ctaQuickBrief")}</span>
              </ProjectInquiryTrigger>
            </div>
          </div>

          {/* 2x2 Architectural Commercial Ledger */}
          <dl className="demo1-ledger surface-card grid grid-cols-1 divide-y divide-border/50 overflow-hidden rounded-2xl sm:grid-cols-2 sm:divide-y-0 lg:col-span-6">
            {ledger.map((item, idx) => (
              <div
                key={item.index}
                className={cn(
                  "flex flex-col justify-between p-6 sm:p-7",
                  idx % 2 === 1 && "sm:border-s sm:border-border/50",
                  idx >= 2 && "sm:border-t sm:border-border/50"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {item.label}
                  </dt>
                  <span className="font-mono text-[11px] text-primary/80">
                    {item.index}
                  </span>
                </div>
                <dd className="mt-4 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {item.value}
                </dd>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.note}
                </p>
              </div>
            ))}
          </dl>
        </div>

        {/* Quiet Capabilities Strip */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border/50 pt-6 text-sm text-muted-foreground">
          {capabilities.map((cap, idx) => (
            <div key={cap} className="flex items-center gap-2.5">
              <span className="font-mono text-[11px] text-primary">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="font-medium text-foreground/85">{cap}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
