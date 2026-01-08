"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const t = useTranslations("FAQ");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    setIsRtl(document.body.getAttribute("data-rtl") === "true");
    const observer = new MutationObserver(() => {
      setIsRtl(document.body.getAttribute("data-rtl") === "true");
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-rtl"],
    });
    return () => observer.disconnect();
  }, []);

  const faqs = [
    { qKey: "q1.question", aKey: "q1.answer" },
    { qKey: "q2.question", aKey: "q2.answer" },
    { qKey: "q3.question", aKey: "q3.answer" },
    { qKey: "q4.question", aKey: "q4.answer" },
  ];

  useGSAP(
    () => {
      gsap.fromTo(
        ".faq-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".faq-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".faq-accordion",
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
      id="faq"
      ref={containerRef}
      className="section-padding bg-background scroll-mt-24"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="faq-header text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t("headlineStart")}{" "}
            <span className="gradient-text font-serif">
              {t("headlineSerif")}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">{t("description")}</p>
        </div>

        {/* FAQ Accordion */}
        <div className="faq-accordion max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="faq-item border border-border/50 rounded-xl px-6 bg-card/50 backdrop-blur-sm data-[state=open]:bg-card"
              >
                <AccordionTrigger className="text-lg font-medium py-5 hover:no-underline">
                  {t(faq.qKey)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {t(faq.aKey)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
