"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial:
      "Judging the GDG Cairo hackathon, Masons stood out not just for their tech but for their incredible team energy. Top 7 well deserved!",
    by: "Mohamed, Senior Android Developer @ Yassir & GDG Hackthon Judge",
    imgSrc: "/images/testimonials/mohamed-atef.jpeg",
  },
  {
    tempId: 1,
    testimonial:
      "As a hackathon judge, I rarely see teams with such genuine passion. Masons creates an environment where creativity thrives.",
    by: "Mohamed, CTO @ Electro Pi & GDG Hackthon Judge",
    imgSrc: "/images/testimonials/mohamed-essam.jpeg",
  },
  {
    tempId: 2,
    testimonial:
      "Masons brought such positive energy to the hackathon. Their approach to problem-solving is both technical and deeply human.",
    by: "Qamar, Android Developer @ Yassir & GDG Hackthon Judge",
    imgSrc: "/images/testimonials/qamar-safadi.jpeg",
  },
  {
    tempId: 3,
    testimonial:
      "The collaborative spirit at Masons is unmatched. we felt like part of the family from day one.",
    by: "Collective of Interns @ Masons",
    imgSrc: "/logo.svg",
  },
  {
    tempId: 4,
    testimonial:
      "Judging their NASA project, I was impressed by their technical skills but blown away by their team dynamics. Special culture.",
    by: "Ayman, CTO @ North West Africa Nokia",
    imgSrc: "/images/testimonials/ayman-mosaad.jpeg",
  },
  {
    tempId: 5,
    testimonial:
      "Masons creates an environment where learning never stops. The growth mindset here is absolutely contagious.",
    by: "Abdelaziz, Co-Founder @ Masons",
    imgSrc: "/images/team/abdelaziz.jpeg",
  },
  {
    tempId: 6,
    testimonial:
      "At Masons, we focus on building a culture of trust, curiosity, and continuous improvement. Every milestone is a reflection of the team's dedication and shared vision.",
    by: "Seif, Founder & CEO @ Masons",
    imgSrc: "/images/team/seif.jpeg",
  },
  {
    tempId: 7,
    testimonial:
      "Seif showed excellent technical depth and leadership at DEPI. He leads by example and understands how to move teams with clarity and focus.",
    by: "Sayed Safwet, Senior Full Stack Engineer @ _VOIS & Mentor @ DEPI",
    imgSrc: "/images/testimonials/sayed-safwet.jpeg",
  },
];

interface Testimonial {
  tempId: string | number;
  testimonial: string;
  by: string;
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
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleManualMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out min-h-[350px]",
        isCenter
          ? "z-10 bg-primary text-primary-foreground border-primary"
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50",
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
        alt={`${testimonial.by.split(",")[0]}`}
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
          isCenter ? "text-primary-foreground" : "text-foreground",
        )}
      >
        &quot;{testimonial.testimonial}&quot;
      </h3>
      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
          isCenter ? "text-primary-foreground/80" : "text-muted-foreground",
        )}
      >
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(testimonials);
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
    [],
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
    [testimonialsList],
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
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg cursor-pointer",
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
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg cursor-pointer",
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
