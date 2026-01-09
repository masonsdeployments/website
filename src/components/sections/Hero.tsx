"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { useLenis } from "@/components/providers/LenisProvider";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const HeroSection = () => {
  const t = useTranslations("Hero");
  const { scrollTo } = useLenis();
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

  // GSAP animations
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          ".hero-badge",
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 }
        )
          .fromTo(
            ".hero-title",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.3"
          )
          .fromTo(
            ".hero-description",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.4"
          )
          .fromTo(
            ".hero-ctas",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.3"
          )
          .fromTo(
            ".hero-social-proof",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 },
            "-=0.2"
          )
          .fromTo(
            ".hero-preview",
            { opacity: 0, y: 60, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1 },
            "-=0.3"
          );
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [] }
  );

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) scrollTo(el, { offset: -80 });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-glow pointer-events-none" />
      <div className="absolute inset-0 hero-gradient pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-6 pt-24 pb-12 text-center relative z-10">
        {/* Badge */}
        <Badge
          variant="secondary"
          className={cn(
            "hero-badge mb-6 px-4 py-2 text-sm font-medium border border-primary/20 bg-primary/10",
            "inline-flex items-center gap-2"
          )}
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span>{t("tagline")}</span>
        </Badge>

        {/* Title */}
        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
          {t("titleLine1")}
          <br />
          <span className="gradient-text font-serif">
            {t("titleHighlight")}
          </span>
        </h1>

        {/* Description */}
        <p className="hero-description text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          {t("description")}
        </p>

        {/* CTAs */}
        <div
          className={cn(
            "hero-ctas flex flex-col sm:flex-row gap-4 justify-center items-center mb-8",
            isRtl && "sm:flex-row-reverse"
          )}
        >
          <Button
            size="lg"
            className={cn(
              "btn-animate bg-primary text-primary-foreground hover:bg-primary/90",
              "text-lg px-8 py-6 font-medium inline-flex items-center gap-2"
            )}
          >
            <span>{t("ctaPrimary")}</span>
            <Link href="https://studio.wearemasons.com"></Link>
            <ArrowRight className={cn("h-5 w-5", isRtl && "rotate-180")} />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleScrollTo("projects")}
            className="text-lg px-8 py-6 font-medium hover:bg-muted/50"
          >
            {t("ctaSecondary")}
          </Button>
        </div>

        {/* Social Proof */}
        <div
          className={cn(
            "hero-social-proof flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground",
            isRtl && "sm:flex-row-reverse"
          )}
        >
          <div
            className={cn(
              "flex",
              isRtl ? "space-x-reverse -space-x-2" : "-space-x-2"
            )}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-background flex items-center justify-center text-xs font-medium"
              >
                {["S", "A", "Z", "O", "K"][i - 1]}
              </div>
            ))}
          </div>
          <span>{t("socialProof")}</span>
        </div>

        {/* Dashboard Preview */}
        <div className="hero-preview mt-16 relative mx-auto max-w-5xl">
          <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm shadow-2xl">
            {/* Browser chrome */}
            <div
              className={cn(
                "flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30",
                isRtl && "flex-row-reverse"
              )}
            >
              <div className={cn("flex gap-1.5", isRtl && "flex-row-reverse")}>
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-6 bg-background/50 rounded-md max-w-md mx-auto flex items-center justify-center text-xs text-muted-foreground">
                  rafiqi.wearemasons.com
                </div>
              </div>
            </div>
            {/* Preview content */}
            {/* Preview content */}
            <div className="relative aspect-[16/9] bg-muted/50">
              <Image
                src="/images/images/rafiqi.png"
                alt={t("previewAlt")}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-primary/10 blur-2xl rounded-full" />
        </div>
      </div>
    </section>
  );
};
