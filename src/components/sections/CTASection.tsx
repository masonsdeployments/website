"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { cn } from "@/lib/utils";

export const CTASection = () => {
  const t = useTranslations("CTA");
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

  useGSAP(
    () => {
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
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
      className="section-padding relative overflow-hidden scroll-mt-24"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 gradient-glow-bottom pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="cta-content max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t("headlineStart")}
            <br />
            <span className="gradient-text font-serif">
              {t("headlineSerif")}
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
            {t("description")}
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            asChild
            className={cn(
              "btn-animate bg-primary text-primary-foreground hover:bg-primary/90",
              "text-lg px-10 py-7 font-medium inline-flex items-center gap-2"
            )}
          >
            <Link href="/contact">
              <span>{t("button")}</span>
              <ArrowRight className={cn("h-5 w-5", isRtl && "rotate-180")} />
            </Link>
          </Button>

          {/* Trust note */}
          <p className="mt-6 text-sm text-muted-foreground">{t("trustNote")}</p>
        </div>
      </div>
    </section>
  );
};
