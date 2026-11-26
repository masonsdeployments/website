"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Heart, Zap, Users, Shield, Lightbulb, Rocket } from "lucide-react";
import { useIsRtl } from "@/hooks/use-rtl";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { cn } from "@/lib/utils";

const icons = [Heart, Zap, Users, Shield, Lightbulb, Rocket];

export const FeaturesSection = () => {
  const t = useTranslations("Features");
  const isRtl = useIsRtl();
  const containerRef = useRef<HTMLDivElement>(null);

  const features = [
    { index: "01", icon: 0, titleKey: "f1.title", descKey: "f1.desc" },
    { index: "02", icon: 1, titleKey: "f2.title", descKey: "f2.desc" },
    { index: "03", icon: 2, titleKey: "f3.title", descKey: "f3.desc" },
    { index: "04", icon: 3, titleKey: "f4.title", descKey: "f4.desc" },
    { index: "05", icon: 4, titleKey: "f5.title", descKey: "f5.desc" },
    { index: "06", icon: 5, titleKey: "f6.title", descKey: "f6.desc" },
  ];

  useGSAP(
    () => {
      gsap.fromTo(
        ".features-header",
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
        ".feature-card",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".features-grid",
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
      id="features"
      ref={containerRef}
      dir={isRtl ? "rtl" : "ltr"}
      className="section-padding scroll-mt-24 bg-background"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <header className="features-header grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <span className="font-mono text-[11px] text-primary">01</span>
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

        <div className="features-grid mt-12 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = icons[feature.icon];
            return (
              <article
                key={feature.index}
                className="feature-card group glass-card-hover card-shine flex flex-col justify-between rounded-2xl p-6 sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground/80">
                      {feature.index}
                    </span>
                  </div>

                  <h3 className="mt-6 font-serif text-xl font-semibold leading-snug text-foreground">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">
                    {t(feature.descKey)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
