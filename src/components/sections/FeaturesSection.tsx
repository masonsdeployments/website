"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Zap, Users, Shield, Lightbulb, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = [Heart, Zap, Users, Shield, Lightbulb, Rocket];

export const FeaturesSection = () => {
  const t = useTranslations("Features");
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

  const features = [
    { icon: 0, titleKey: "f1.title", descKey: "f1.desc" },
    { icon: 1, titleKey: "f2.title", descKey: "f2.desc" },
    { icon: 2, titleKey: "f3.title", descKey: "f3.desc" },
    { icon: 3, titleKey: "f4.title", descKey: "f4.desc" },
    { icon: 4, titleKey: "f5.title", descKey: "f5.desc" },
    { icon: 5, titleKey: "f6.title", descKey: "f6.desc" },
  ];

  useGSAP(
    () => {
      gsap.fromTo(
        ".features-header",
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
        ".feature-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
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
      className="section-padding bg-background scroll-mt-24"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="features-header text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t("headlineStart")}{" "}
            <span className="gradient-text font-serif">
              {t("headlineSerif")}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = icons[feature.icon];
            return (
              <Card
                key={index}
                className={cn(
                  "feature-card group cursor-default",
                  "glass-card-hover hover-lift card-shine",
                  "border-border/50"
                )}
              >
                <CardContent className={cn("p-6", isRtl && "text-right")}>
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors",
                      isRtl ? "mr-0 ml-auto" : "ml-0"
                    )}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(feature.descKey)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
