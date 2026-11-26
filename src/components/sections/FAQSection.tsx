"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useIsRtl } from "@/hooks/use-rtl";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const FAQSection = () => {
  const t = useTranslations("FAQ");
  const isRtl = useIsRtl();
  const containerRef = useRef<HTMLDivElement>(null);

  const faqs = [
    { index: "01", qKey: "q1.question", aKey: "q1.answer" },
    { index: "02", qKey: "q2.question", aKey: "q2.answer" },
    { index: "03", qKey: "q3.question", aKey: "q3.answer" },
    { index: "04", qKey: "q4.question", aKey: "q4.answer" },
  ];

  useGSAP(
    () => {
      gsap.fromTo(
        ".faq-header",
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
        ".faq-item",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".faq-accordion",
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section
      id="faq"
      ref={containerRef}
      dir={isRtl ? "rtl" : "ltr"}
      className="section-padding scroll-mt-24 border-t border-border/50 bg-background"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <header className="faq-header lg:col-span-5">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <span className="font-mono text-[11px] text-primary">05</span>
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
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </header>

          <div className="faq-accordion lg:col-span-7">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.index}
                  value={`item-${faq.index}`}
                  className="faq-item surface-card rounded-2xl px-6 transition-colors data-[state=open]:border-primary/40 data-[state=open]:bg-card/90"
                >
                  <AccordionTrigger
                    className={cn(
                      "py-5 text-start text-base font-semibold text-foreground hover:no-underline",
                      "gap-4"
                    )}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] text-primary">
                        {faq.index}
                      </span>
                      <span>{t(faq.qKey)}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                    {t(faq.aKey)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
