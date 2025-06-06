"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

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
    imgSrc: "/images/team/seif.jpeg",
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
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out min-h-[350px]",
        isCenter
          ? "z-10 bg-primary text-primary-foreground border-primary"
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50"
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
          "text-base sm:text-xl font-medium",
          isCenter ? "text-primary-foreground" : "text-foreground"
        )}
      >
        &quot;{t(testimonial.testimonialKey)}&quot;
      </h3>
      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
          isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
        )}
      >
        - {t(testimonial.byKey)}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const t = useTranslations("Testimonials");
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] =
    useState<Testimonial[]>(testimonials);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [screenWidth, setScreenWidth] = useState(1200);

  // Create extended testimonials list for infinite scroll
  const createExtendedTestimonials = useCallback(
    (width: number, cardSize: number) => {
      const cardSpacing = cardSize / 1.5;
      const maxVisibleCards = Math.floor(width / cardSpacing) + 6; // +6 for buffer
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
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      const newCardSize = matches ? 365 : 290;
      const newScreenWidth = window.innerWidth;

      setCardSize(newCardSize);
      setScreenWidth(newScreenWidth);

      // Create extended testimonials list to fill screen
      const extended = createExtendedTestimonials(newScreenWidth, newCardSize);
      setTestimonialsList(extended);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [createExtendedTestimonials]);

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoPlay || isHovered) return;

    const interval = setInterval(() => {
      handleMove(1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlay, isHovered, handleMove]);

  return (
    <div
      className="relative w-full overflow-hidden bg-background"
      style={{ height: 600 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {testimonialsList.map((testimonial, index) => {
        const centerIndex = Math.floor(testimonialsList.length / 2);
        const position = index - centerIndex;

        // Only render cards that are reasonably close to the center for performance
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
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <Button
          onClick={() => handleManualMove(-1)}
          variant="outline"
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg cursor-pointer"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={() => handleManualMove(1)}
          variant="outline"
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg cursor-pointer"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
