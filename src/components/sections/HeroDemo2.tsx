"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Gauge,
  Globe,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useIsRtl } from "@/hooks/use-rtl";
import { useLenis } from "@/components/providers/LenisProvider";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import {
  ProjectInquiryTrigger,
  useProjectInquiryModal,
} from "@/components/project-inquiry-modal";
import { site, type InquiryOptionId } from "@/lib/site";
import { cn } from "@/lib/utils";

type CapabilityKey = "webapps" | "internal" | "ai" | "conversion";

export const HeroDemo2 = () => {
  const t = useTranslations("Hero");
  const td = useTranslations("HeroDemo");
  const isRtl = useIsRtl();
  const { scrollTo } = useLenis();
  const { open } = useProjectInquiryModal();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [cairoTime, setCairoTime] = useState("");
  const [activeKey, setActiveKey] = useState<CapabilityKey>("webapps");

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
          ".demo2-meta",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45 }
        )
          .fromTo(
            ".demo2-left",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.65 },
            "-=0.2"
          )
          .fromTo(
            ".demo2-right",
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.4"
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

  const capabilities: {
    key: CapabilityKey;
    index: string;
    icon: typeof Globe;
    category: string;
    title: string;
    timeline: string;
    summary: string;
    deliverables: [string, string, string];
    cta: string;
    modalOption: InquiryOptionId;
  }[] = [
    {
      key: "webapps",
      index: "01",
      icon: Globe,
      category: td("buildDeck.webapps.category"),
      title: td("buildDeck.webapps.title"),
      timeline: td("buildDeck.webapps.timeline"),
      summary: td("buildDeck.webapps.summary"),
      deliverables: [
        td("buildDeck.webapps.d1"),
        td("buildDeck.webapps.d2"),
        td("buildDeck.webapps.d3"),
      ],
      cta: td("buildDeck.webapps.cta"),
      modalOption: "new-product",
    },
    {
      key: "internal",
      index: "02",
      icon: BarChart3,
      category: td("buildDeck.internal.category"),
      title: td("buildDeck.internal.title"),
      timeline: td("buildDeck.internal.timeline"),
      summary: td("buildDeck.internal.summary"),
      deliverables: [
        td("buildDeck.internal.d1"),
        td("buildDeck.internal.d2"),
        td("buildDeck.internal.d3"),
      ],
      cta: td("buildDeck.internal.cta"),
      modalOption: "new-product",
    },
    {
      key: "ai",
      index: "03",
      icon: Bot,
      category: td("buildDeck.ai.category"),
      title: td("buildDeck.ai.title"),
      timeline: td("buildDeck.ai.timeline"),
      summary: td("buildDeck.ai.summary"),
      deliverables: [
        td("buildDeck.ai.d1"),
        td("buildDeck.ai.d2"),
        td("buildDeck.ai.d3"),
      ],
      cta: td("buildDeck.ai.cta"),
      modalOption: "ai-integration",
    },
    {
      key: "conversion",
      index: "04",
      icon: Gauge,
      category: td("buildDeck.conversion.category"),
      title: td("buildDeck.conversion.title"),
      timeline: td("buildDeck.conversion.timeline"),
      summary: td("buildDeck.conversion.summary"),
      deliverables: [
        td("buildDeck.conversion.d1"),
        td("buildDeck.conversion.d2"),
        td("buildDeck.conversion.d3"),
      ],
      cta: td("buildDeck.conversion.cta"),
      modalOption: "consulting",
    },
  ];

  const active =
    capabilities.find((item) => item.key === activeKey) ?? capabilities[0];
  const ActiveIcon = active.icon;

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
        <div className="demo2-meta flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border/50 pb-4 text-xs text-muted-foreground">
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

        {/* 12-Col Asymmetric Firm Split */}
        <div className="grid grid-cols-1 items-center gap-12 pt-12 lg:grid-cols-12 lg:gap-12 lg:pt-16">
          {/* Left: Executive Copy & Actions */}
          <div className="demo2-left lg:col-span-6 xl:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {t("tagline")}
            </p>

            <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.01] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-6xl xl:text-[4.5rem]">
              {t("titleLine1")}{" "}
              <span className="gradient-text block font-serif">
                {t("titleHighlight")}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("description")}
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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

            {/* Grounded Studio Metrics */}
            <dl className="mt-10 grid grid-cols-3 gap-5 border-t border-border/50 pt-7">
              <div>
                <dd
                  dir="ltr"
                  className="inline-block font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                >
                  10M+
                </dd>
                <dt className="mt-1 text-xs font-medium text-muted-foreground">
                  {td("ledger.volumeLabel")}
                </dt>
              </div>
              <div className="border-s border-border/50 ps-5">
                <dd
                  dir="ltr"
                  className="inline-block font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                >
                  20+
                </dd>
                <dt className="mt-1 text-xs font-medium text-muted-foreground">
                  {td("ledger.buildsLabel")}
                </dt>
              </div>
              <div className="border-s border-border/50 ps-5">
                <dd
                  dir="ltr"
                  className="inline-block font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                >
                  24h
                </dd>
                <dt className="mt-1 text-xs font-medium text-muted-foreground">
                  {td("ledger.replyLabel")}
                </dt>
              </div>
            </dl>
          </div>

          {/* Right: Interactive "What We Can Build" Firm Dossier */}
          <div className="demo2-right relative lg:col-span-6 xl:col-span-5">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-primary/10 opacity-50 blur-3xl dark:opacity-35"
            />

            <div className="surface-card relative overflow-hidden rounded-3xl backdrop-blur-md">
              {/* Top Dossier Header */}
              <div className="flex items-center justify-between gap-3 border-b border-border/50 bg-muted/25 px-6 py-4">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                  {td("buildDeck.eyebrow")}
                </span>
                <span
                  dir="ltr"
                  className="font-mono text-[11px] tabular-nums text-muted-foreground"
                >
                  {active.index} / 04
                </span>
              </div>

              {/* Active Capability Stage */}
              <div
                id={`capability-panel-${active.key}`}
                role="tabpanel"
                aria-labelledby={`capability-tab-${active.key}`}
                className="flex min-h-[304px] flex-col border-b border-border/50 p-6 sm:p-7"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.key}
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: 8 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }
                    }
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                    className="flex flex-1 flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                          <ActiveIcon className="h-5 w-5" />
                        </span>
                        <span className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
                          {active.timeline}
                        </span>
                      </div>

                      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                        {active.category}
                      </p>
                      <h2 className="mt-1.5 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-[1.7rem]">
                        {active.title}
                      </h2>
                      <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">
                        {active.summary}
                      </p>

                      {/* Deliverables */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {active.deliverables.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-border/60 bg-background/75 px-3 py-1 text-xs font-medium text-foreground/85"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-2">
                      <button
                        type="button"
                        onClick={() => open(active.modalOption)}
                        className="group inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span>{active.cta}</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 4-Track Interactive Index */}
              <div
                role="tablist"
                aria-label={td("buildDeck.eyebrow")}
                className="divide-y divide-border/40 bg-background/45"
              >
                {capabilities.map((item, idx) => {
                  const selected = item.key === activeKey;
                  return (
                    <button
                      key={item.key}
                      id={`capability-tab-${item.key}`}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls={`capability-panel-${item.key}`}
                      onClick={() => setActiveKey(item.key)}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          const next = capabilities[(idx + 1) % capabilities.length];
                          setActiveKey(next.key);
                          document
                            .getElementById(`capability-tab-${next.key}`)
                            ?.focus();
                        } else if (e.key === "ArrowUp") {
                          e.preventDefault();
                          const prev =
                            capabilities[
                              (idx - 1 + capabilities.length) % capabilities.length
                            ];
                          setActiveKey(prev.key);
                          document
                            .getElementById(`capability-tab-${prev.key}`)
                            ?.focus();
                        }
                      }}
                      className={cn(
                        "relative flex w-full cursor-pointer items-center justify-between gap-3 px-6 py-3.5 text-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                        selected
                          ? "bg-primary/10 text-foreground"
                          : "text-muted-foreground hover:bg-card/75 hover:text-foreground"
                      )}
                    >
                      {selected && (
                        <span
                          aria-hidden
                          className="absolute inset-y-0 start-0 w-0.5 bg-primary"
                        />
                      )}
                      <span className="flex min-w-0 items-baseline gap-3">
                        <span
                          className={cn(
                            "shrink-0 font-mono text-[11px]",
                            selected
                              ? "font-semibold text-primary"
                              : "text-muted-foreground"
                          )}
                        >
                          {item.index}
                        </span>
                        <span className="truncate text-sm font-medium">
                          {item.title}
                        </span>
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {item.timeline}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
