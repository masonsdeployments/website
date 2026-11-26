"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { MessageSquare, Palette, Code, Rocket } from "lucide-react";
import { useIsRtl } from "@/hooks/use-rtl";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { cn } from "@/lib/utils";

const stepIcons = [MessageSquare, Palette, Code, Rocket];

export const HowItWorksSection = () => {
  const t = useTranslations("HowItWorks");
  const isRtl = useIsRtl();
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    { num: "01", titleKey: "s1.title", descKey: "s1.desc", icon: 0 },
    { num: "02", titleKey: "s2.title", descKey: "s2.desc", icon: 1 },
    { num: "03", titleKey: "s3.title", descKey: "s3.desc", icon: 2 },
    { num: "04", titleKey: "s4.title", descKey: "s4.desc", icon: 3 },
  ];

  useGSAP(
    () => {
      gsap.fromTo(
        ".hiw-header",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".hiw-step",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.09,
          scrollTrigger: {
            trigger: ".hiw-steps",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      dir={isRtl ? "rtl" : "ltr"}
      className="section-padding scroll-mt-24 border-t border-border/50 bg-secondary/15 dark:bg-secondary/10"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <header className="hiw-header grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <span className="font-mono text-[11px] text-primary">03</span>
              <span aria-hidden className="text-border">
                /
              </span>
              <span>{t("kicker")}</span>
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-[1.03] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
              {t("headlineStart")}{" "}
              <span className="gradient-text font-serif">
                {t("headlineSerif")}
              </span>
            </h2>
          </div>

          <p
            className={cn(
              "max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5 md:justify-self-end",
              isRtl ? "md:text-left" : "md:text-right"
            )}
          >
            {t("description")}
          </p>
        </header>

        <div className="relative mt-12 sm:mt-14">
          {/* Connecting desktop rail */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-11 right-12 left-12 hidden h-px bg-gradient-to-r from-primary/40 via-border to-primary/40 lg:block"
          />

          <ol className="hiw-steps grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = stepIcons[step.icon];
              return (
                <li
                  key={step.num}
                  className="hiw-step glass-card-hover relative flex flex-col justify-between rounded-2xl p-6 sm:p-7"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-4">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-xs font-semibold text-primary">
                        {step.num}
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/70 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>

                    <h3 className="mt-5 font-serif text-xl font-semibold text-foreground">
                      {t(step.titleKey)}
                    </h3>
                    <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">
                      {t(step.descKey)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
