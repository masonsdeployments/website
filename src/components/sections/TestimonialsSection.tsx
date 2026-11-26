"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useIsRtl } from "@/hooks/use-rtl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonialKey: "t0.text",
    byKey: "t0.by",
    imgSrc: "/images/testimonials/mohamed-atef.jpeg",
  },
  {
    tempId: 1,
    testimonialKey: "t1.text",
    byKey: "t1.by",
    imgSrc: "/images/testimonials/mohamed-essam.jpeg",
  },
  {
    tempId: 2,
    testimonialKey: "t2.text",
    byKey: "t2.by",
    imgSrc: "/images/testimonials/qamar-safadi.jpeg",
  },
  {
    tempId: 3,
    testimonialKey: "t3.text",
    byKey: "t3.by",
    imgSrc: "/logo.svg",
  },
  {
    tempId: 4,
    testimonialKey: "t4.text",
    byKey: "t4.by",
    imgSrc: "/images/testimonials/ayman-mosaad.jpeg",
  },
  {
    tempId: 5,
    testimonialKey: "t5.text",
    byKey: "t5.by",
    imgSrc: "/images/team/abdelaziz.jpeg",
  },
  {
    tempId: 6,
    testimonialKey: "t6.text",
    byKey: "t6.by",
    imgSrc: "/images/team/seif.webp",
  },
  {
    tempId: 7,
    testimonialKey: "t7.text",
    byKey: "t7.by",
    imgSrc: "/images/testimonials/sayed-safwet.jpeg",
  },
];

interface Testimonial {
  tempId: string | number;
  testimonialKey: string;
  byKey: string;
  imgSrc: string;
  originalIndex?: number;
}

interface TestimonialCardProps {
  position: number;
  testimonial: Testimonial;
  handleManualMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleManualMove,
  cardSize,
}) => {
  const t = useTranslations("Testimonials");
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleManualMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-7 transition-all duration-500 ease-in-out min-h-[375px]",
        isCenter
          ? "z-10 border-primary bg-primary text-primary-foreground"
          : "z-0 border-border bg-card text-card-foreground hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px hsl(var(--border))"
          : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <Image
        src={testimonial.imgSrc}
        alt={t(testimonial.byKey).split(",")[0]}
        className="mb-4 h-14 w-12 bg-muted object-cover object-top"
        width={50}
        height={50}
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))",
        }}
      />
      <h3
        className={cn(
          "text-base leading-relaxed font-medium",
          isCenter ? "text-primary-foreground" : "text-foreground"
        )}
      >
        &quot;{t(testimonial.testimonialKey)}&quot;
      </h3>
      <p
        className={cn(
          "absolute bottom-7 left-7 right-7 mt-2 text-xs font-medium leading-snug",
          isCenter ? "text-primary-foreground/90" : "text-muted-foreground"
        )}
      >
        {t(testimonial.byKey)}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const t = useTranslations("Testimonials");
  const isRtl = useIsRtl();
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] =
    useState<Testimonial[]>(testimonials);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [screenWidth, setScreenWidth] = useState(1200);

  const createExtendedTestimonials = useCallback(
    (width: number, size: number) => {
      const cardSpacing = size / 1.5;
      const maxVisibleCards = Math.floor(width / cardSpacing) + 6;
      const originalCount = testimonials.length;
      const repetitions = Math.ceil(maxVisibleCards / originalCount);

      const extended: Testimonial[] = [];
      for (let i = 0; i < repetitions; i++) {
        testimonials.forEach((testimonial, index) => {
          extended.push({
            ...testimonial,
            tempId: `${i}-${index}`,
            originalIndex: index,
          });
        });
      }
      return extended;
    },
    []
  );

  const handleMove = useCallback(
    (steps: number) => {
      const newList = [...testimonialsList];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = newList.shift();
          if (!item) return;
          newList.push({ ...item, tempId: `moved-${Math.random()}` });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = newList.pop();
          if (!item) return;
          newList.unshift({ ...item, tempId: `moved-${Math.random()}` });
        }
      }
      setTestimonialsList(newList);
    },
    [testimonialsList]
  );

  const handleManualMove = (steps: number) => {
    setIsAutoPlay(false);
    handleMove(steps);
    window.setTimeout(() => setIsAutoPlay(true), 10000);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      const newCardSize = matches ? 365 : 290;
      const newScreenWidth = window.innerWidth;

      setCardSize(newCardSize);
      setScreenWidth(newScreenWidth);

      const extended = createExtendedTestimonials(newScreenWidth, newCardSize);
      setTestimonialsList(extended);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [createExtendedTestimonials]);

  useEffect(() => {
    if (!isAutoPlay || isHovered) return;

    const interval = window.setInterval(() => {
      handleMove(1);
    }, 3500);

    return () => window.clearInterval(interval);
  }, [isAutoPlay, isHovered, handleMove]);

  return (
    <section
      id="testimonials"
      dir={isRtl ? "rtl" : "ltr"}
      className="section-padding scroll-mt-24 border-t border-border/50 bg-background"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <header className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <span className="font-mono text-[11px] text-primary">04</span>
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
      </div>

      <div
        className="relative mt-10 w-full overflow-hidden bg-background"
        style={{ height: 580 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {testimonialsList.map((testimonial, index) => {
          const centerIndex = Math.floor(testimonialsList.length / 2);
          const position = index - centerIndex;

          const maxRenderDistance =
            Math.floor(screenWidth / (cardSize / 1.5)) + 2;
          if (Math.abs(position) > maxRenderDistance) return null;

          return (
            <TestimonialCard
              key={testimonial.tempId}
              testimonial={testimonial}
              handleManualMove={handleManualMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}

        <div
          className={cn(
            "absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2.5",
            isRtl && "flex-row-reverse"
          )}
        >
          <Button
            onClick={() => handleManualMove(-1)}
            variant="outline"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-card/85 shadow-sm backdrop-blur-md transition-colors hover:border-primary/50 hover:text-primary"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => handleManualMove(1)}
            variant="outline"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-card/85 shadow-sm backdrop-blur-md transition-colors hover:border-primary/50 hover:text-primary"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
