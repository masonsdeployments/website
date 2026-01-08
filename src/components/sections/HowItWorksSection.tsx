"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { cn } from "@/lib/utils";
import { MessageSquare, Palette, Code, Rocket } from "lucide-react";

const stepIcons = [MessageSquare, Palette, Code, Rocket];

export const HowItWorksSection = () => {
  const t = useTranslations("HowItWorks");
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

      // Adjust animation direction based on RTL
      const xDirection = isRtl ? 30 : -30;

      gsap.fromTo(
        ".hiw-step",
        { opacity: 0, x: xDirection },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".hiw-steps",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate the connecting line
      gsap.fromTo(
        ".hiw-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".hiw-steps",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [isRtl] }
  );

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="section-padding bg-secondary/30 dark:bg-secondary/20 scroll-mt-24"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="hiw-header text-center max-w-3xl mx-auto mb-16">
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

        {/* Steps */}
        <div className="hiw-steps relative max-w-3xl mx-auto">
          {/* Connecting line */}
          <div
            className={cn(
              "hiw-line absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top",
              isRtl ? "right-6 md:right-8" : "left-6 md:left-8"
            )}
          />

          {/* Step items */}
          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = stepIcons[step.icon];
              return (
                <div
                  key={index}
                  className="hiw-step relative flex gap-6 md:gap-8"
                >
                  {/* Number circle */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg md:text-xl shadow-lg">
                      {step.num}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <div
                      className={cn(
                        "flex items-center gap-3 mb-2",
                        isRtl && "flex-row-reverse justify-end"
                      )}
                    >
                      <Icon className="w-5 h-5 text-primary shrink-0" />
                      <h3 className="text-xl md:text-2xl font-semibold">
                        {t(step.titleKey)}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(step.descKey)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
