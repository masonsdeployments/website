"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useIsRtl } from "@/hooks/use-rtl";
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
  SiGo,
} from "react-icons/si";
import Marquee from "react-fast-marquee";

type TechLogo = {
  name: string;
  icon: React.ReactNode;
};

const ConvexLogo = () => (
  <svg
    width="1.35em"
    height="1.35em"
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
  { name: "Go", icon: <SiGo /> },
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
  const isRtl = useIsRtl();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".trusted-title",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
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
      dir={isRtl ? "rtl" : "ltr"}
      className="section-padding-sm border-y border-border/50 bg-muted/20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <p className="trusted-title mb-7 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {t("title")}
        </p>

        <div className="relative overflow-hidden" dir="ltr">
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute top-0 bottom-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

          <Marquee
            gradient={false}
            speed={28}
            pauseOnHover={true}
            direction={isRtl ? "right" : "left"}
            className="items-center"
            autoFill={true}
          >
            {techLogos.map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className={cn(
                  "mx-7 flex shrink-0 items-center gap-2.5 text-muted-foreground/75 transition-colors duration-300 hover:text-foreground"
                )}
              >
                <span className="text-xl">{logo.icon}</span>
                <span className="whitespace-nowrap text-sm font-medium tracking-tight">
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
