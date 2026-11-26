"use client";

import { useRef } from "react";
import { ArrowUpRight, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { useIsRtl } from "@/hooks/use-rtl";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import {
  ProjectCard,
  type ProjectCardProps,
} from "@/components/cards/ProjectCard";
import { ProjectInquiryTrigger } from "@/components/project-inquiry-modal";
import { cn } from "@/lib/utils";

/**
 * Shared placeholder visual for all project cards until final case-study
 * artwork and client projects are swapped in. Replace each item's `imageSrc`
 * below with a project-specific asset when ready.
 */
const PLACEHOLDER_PROJECT_IMAGE = "/images/projects/placeholder.svg";

export const ProjectsSection = () => {
  const t = useTranslations("Projects");
  const isRtl = useIsRtl();
  const containerRef = useRef<HTMLDivElement>(null);

  const projects: ProjectCardProps[] = [
    {
      index: "01",
      year: t("rafiqi.year"),
      badge: t("rafiqi.badge"),
      title: t("rafiqi.title"),
      story: t("rafiqi.story"),
      recognition: t("rafiqi.recognition"),
      imageSrc: PLACEHOLDER_PROJECT_IMAGE,
      imageAlt: `${t("rafiqi.title")} ${t("card.previewSuffix")}`,
      metrics: [
        {
          label: t("rafiqi.metrics.0.label"),
          value: t("rafiqi.metrics.0.value"),
        },
        {
          label: t("rafiqi.metrics.1.label"),
          value: t("rafiqi.metrics.1.value"),
        },
      ],
      demoHref: "https://rafiqi.wearemasons.com/",
      caseStudyHref: "/case-studies/rafiqi",
    },
    {
      index: "02",
      year: t("repai.year"),
      badge: t("repai.badge"),
      title: t("repai.title"),
      story: t("repai.story"),
      recognition: t("repai.recognition"),
      imageSrc: PLACEHOLDER_PROJECT_IMAGE,
      imageAlt: `${t("repai.title")} ${t("card.previewSuffix")}`,
      metrics: [
        {
          label: t("repai.metrics.0.label"),
          value: t("repai.metrics.0.value"),
        },
        {
          label: t("repai.metrics.1.label"),
          value: t("repai.metrics.1.value"),
        },
      ],
      demoHref: "https://repai.wearemasons.com/",
      caseStudyHref: "/case-studies/repai",
    },
    {
      index: "03",
      year: t("orbit.year"),
      badge: t("orbit.badge"),
      title: t("orbit.title"),
      story: t("orbit.story"),
      recognition: t("orbit.recognition"),
      imageSrc: PLACEHOLDER_PROJECT_IMAGE,
      imageAlt: `${t("orbit.title")} ${t("card.previewSuffix")}`,
      metrics: [
        {
          label: t("orbit.metrics.0.label"),
          value: t("orbit.metrics.0.value"),
        },
        {
          label: t("orbit.metrics.1.label"),
          value: t("orbit.metrics.1.value"),
        },
      ],
      demoHref: "https://orbit.wearemasons.com/",
      caseStudyHref: "/case-studies/orbit",
    },
    {
      index: "04",
      year: t("naveris.year"),
      badge: t("naveris.badge"),
      title: t("naveris.title"),
      story: t("naveris.story"),
      recognition: t("naveris.recognition"),
      imageSrc: PLACEHOLDER_PROJECT_IMAGE,
      imageAlt: `${t("naveris.title")} ${t("card.previewSuffix")}`,
      metrics: [
        {
          label: t("naveris.metrics.0.label"),
          value: t("naveris.metrics.0.value"),
        },
        {
          label: t("naveris.metrics.1.label"),
          value: t("naveris.metrics.1.value"),
        },
      ],
      codeHref: "https://github.com/wearemasons/NAVERIS",
      caseStudyHref: "/case-studies/naveris",
    },
  ];

  useGSAP(
    () => {
      gsap.fromTo(
        ".projects-header",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".projects-grid",
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
      id="projects"
      ref={containerRef}
      dir={isRtl ? "rtl" : "ltr"}
      className="section-padding scroll-mt-24 border-t border-border/50 bg-background"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <header className="projects-header grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <span className="font-mono text-[11px] text-primary">02</span>
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

        {/* 2x2 Editorial Project Gallery */}
        <div className="projects-grid mt-12 grid grid-cols-1 gap-7 sm:mt-14 md:grid-cols-2 lg:gap-8">
          {projects.map((project) => (
            <div key={project.index} className="project-card">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        {/* Private Client Work / NDA Walkthrough Strip */}
        <div className="surface-card mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl px-6 py-5 sm:flex-row sm:items-center sm:px-8 sm:py-6">
          <div className="flex items-start gap-4">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <Lock className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                {t("privateWork.kicker")}
              </p>
              <p className="mt-1 font-serif text-lg font-bold tracking-tight text-foreground sm:text-xl">
                {t("privateWork.title")}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {t("privateWork.description")}
              </p>
            </div>
          </div>

          <ProjectInquiryTrigger className="group inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border border-border/70 bg-background/80 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span>{t("privateWork.cta")}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </ProjectInquiryTrigger>
        </div>
      </div>
    </section>
  );
};
