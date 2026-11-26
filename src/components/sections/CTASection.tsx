"use client";

import { useRef } from "react";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useIsRtl } from "@/hooks/use-rtl";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { ProjectInquiryTrigger } from "@/components/project-inquiry-modal";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const CTASection = () => {
  const t = useTranslations("CTA");
  const isRtl = useIsRtl();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, y: 24, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section
      id="contact"
      ref={containerRef}
      dir={isRtl ? "rtl" : "ltr"}
      className="section-padding relative scroll-mt-24 overflow-hidden border-t border-border/50"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 gradient-glow-bottom" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="cta-content surface-card relative overflow-hidden rounded-3xl p-8 backdrop-blur-md sm:p-12 lg:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/12 blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <span className="font-mono text-[11px] text-primary">06</span>
                <span aria-hidden className="text-border">
                  /
                </span>
                <span>{t("kicker")}</span>
              </p>

              <h2 className="mt-4 font-serif text-4xl font-bold leading-[1.03] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
                {t("headlineStart")}{" "}
                <span className="gradient-text block font-serif sm:inline">
                  {t("headlineSerif")}
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
            </div>

            <div className="flex flex-col gap-3.5 lg:col-span-5 lg:items-end">
              <div className="flex w-full flex-col gap-2.5 sm:flex-row lg:justify-end">
                <Link
                  href="/contact"
                  className="group btn-animate inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-colors hover:bg-primary/90"
                >
                  <span>{t("button")}</span>
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 transition-transform group-hover:translate-x-0.5",
                      isRtl && "rotate-180 group-hover:-translate-x-0.5"
                    )}
                  />
                </Link>

                <ProjectInquiryTrigger className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-border/70 bg-background/70 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{t("quickBriefButton")}</span>
                </ProjectInquiryTrigger>
              </div>

              <a
                href={`mailto:${site.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <span>{site.email}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <p className="text-xs text-muted-foreground">
                {t("trustNote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
