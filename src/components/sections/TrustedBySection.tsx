"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { cn } from "@/lib/utils";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiVercel,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiDocker,
  SiMongodb,
  SiRedis,
  SiGraphql,
  SiSupabase,
  SiPrisma,
  SiFigma,
  SiStripe,
  SiGit,
  SiShadcnui,
  SiRadixui,
  SiAwslambda,
} from "react-icons/si";
import Marquee from "react-fast-marquee";

// Define a type for the logo object to handle the icon component
type TechLogo = {
  name: string;
  icon: React.ReactNode;
};

const ConvexLogo = () => (
  <svg
    width="1.5em"
    height="1.5em"
    viewBox="0 0 184 188"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M108.092 130.021C126.258 128.003 143.385 118.323 152.815 102.167C148.349 142.128 104.653 167.385 68.9858 151.878C65.6992 150.453 62.8702 148.082 60.9288 145.034C52.9134 132.448 50.2786 116.433 54.0644 101.899C64.881 120.567 86.8748 132.01 108.092 130.021Z"
      fill="currentColor"
    />
    <path
      d="M53.4012 90.1735C46.0375 107.191 45.7186 127.114 54.7463 143.51C22.9759 119.608 23.3226 68.4578 54.358 44.7949C57.2286 42.6078 60.64 41.3097 64.2178 41.1121C78.9312 40.336 93.8804 46.0225 104.364 56.6193C83.0637 56.831 62.318 70.4756 53.4012 90.1735Z"
      fill="currentColor"
    />
    <path
      d="M114.637 61.8552C103.89 46.8701 87.0686 36.6684 68.6387 36.358C104.264 20.1876 148.085 46.4045 152.856 85.1654C153.3 88.7635 152.717 92.4322 151.122 95.6775C144.466 109.195 132.124 119.679 117.702 123.559C128.269 103.96 126.965 80.0151 114.637 61.8552Z"
      fill="currentColor"
    />
  </svg>
);

const techLogos: TechLogo[] = [
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "React", icon: <SiReact /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "Convex", icon: <ConvexLogo /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "Shadcn UI", icon: <SiShadcnui /> },
  { name: "Radix UI", icon: <SiRadixui /> },
  { name: "Amazon AWS", icon: <SiAwslambda /> },
  { name: "Vercel", icon: <SiVercel /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Redis", icon: <SiRedis /> },
  { name: "Docker", icon: <SiDocker /> },
  { name: "Python", icon: <SiPython /> },
  { name: "GraphQL", icon: <SiGraphql /> },
  { name: "Supabase", icon: <SiSupabase /> },
  { name: "Prisma", icon: <SiPrisma /> },
  { name: "Stripe", icon: <SiStripe /> },
  { name: "Figma", icon: <SiFigma /> },
  { name: "Git", icon: <SiGit /> },
];

export const TrustedBySection = () => {
  const t = useTranslations("TrustedBy");
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
        ".trusted-title",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: containerRef.current,
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
      ref={containerRef}
      className="section-padding-sm border-y border-border/50 bg-muted/30"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-6">
        <p className="trusted-title text-center text-sm text-muted-foreground mb-8 uppercase tracking-widest">
          {t("title")}
        </p>

        {/* Marquee container */}
        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div
            className={cn(
              "absolute top-0 bottom-0 w-20 z-10 pointer-events-none",
              isRtl
                ? "right-0 bg-gradient-to-l from-muted/30 to-transparent"
                : "left-0 bg-gradient-to-r from-muted/30 to-transparent"
            )}
          />
          <div
            className={cn(
              "absolute top-0 bottom-0 w-20 z-10 pointer-events-none",
              isRtl
                ? "left-0 bg-gradient-to-r from-muted/30 to-transparent"
                : "right-0 bg-gradient-to-l from-muted/30 to-transparent"
            )}
          />
          {/* Scrolling logos using react-fast-marquee */}
          <Marquee
            gradient={false}
            speed={30}
            pauseOnHover={true}
            className={cn(
              "items-center",
              isRtl ? "flex-row-reverse" : "flex-row"
            )}
            autoFill={true}
          >
            {techLogos.map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex items-center gap-3 text-muted-foreground/60 hover:text-foreground transition-colors duration-300 shrink-0 mx-8"
              >
                <span className="text-2xl">{logo.icon}</span>
                <span className="text-lg font-medium whitespace-nowrap">
                  {logo.name}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};
