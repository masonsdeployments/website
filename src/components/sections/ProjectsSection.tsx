"use client";

import { useRef, useEffect, useState } from "react";
import { TrendingUp, Users } from "lucide-react";
import { ProjectCard } from "../cards/ProjectCard";
import { useTranslations } from "next-intl";
import { useGSAP, gsap } from "@/hooks/useGSAP";

export const ProjectsSection = () => {
  const t = useTranslations("Projects");
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

  const projects = [
    {
      badge: t("rafiqi.badge"),
      title: t("rafiqi.title"),
      story: t("rafiqi.story"),
      demoHref: "https://rafiqi.wearemasons.com/",
      caseStudyHref: "/case-studies/rafiqi",
    },
    {
      badge: t("repai.badge"),
      title: t("repai.title"),
      story: t("repai.story"),
      achievement: t("repai.achievement"),
      winner: true,
      demoHref: "https://repai.wearemasons.com/",
      caseStudyHref: "/case-studies/repai",
    },
    {
      badge: t("orbit.badge"),
      title: t("orbit.title"),
      story: t("orbit.story"),
      achievement: t("orbit.achievement"),
      metrics: [
        {
          label: t("orbit.metrics.0.label"),
          value: t("orbit.metrics.0.value"),
          icon: <TrendingUp className="h-4 w-4 text-purple-500" />,
        },
        {
          label: t("orbit.metrics.1.label"),
          value: t("orbit.metrics.1.value"),
          icon: <Users className="h-4 w-4 text-blue-500" />,
        },
      ],
      demoHref: "https://orbit.wearemasons.com/",
      caseStudyHref: "/case-studies/orbit",
    },
    {
      badge: t("naveris.badge"),
      title: t("naveris.title"),
      story: t("naveris.story"),
      achievement: t("naveris.achievement"),
      metrics: [
        {
          label: t("naveris.metrics.0.label"),
          value: t("naveris.metrics.0.value"),
          icon: <TrendingUp className="h-4 w-4 text-red-500" />,
        },
        {
          label: t("naveris.metrics.1.label"),
          value: t("naveris.metrics.1.value"),
          icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
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
        ".project-card",
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
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
      className="section-padding bg-background scroll-mt-24"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-6">
        <div className="projects-header text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t("headlineStart")}{" "}
            <span className="gradient-text font-serif not-italic">
              {t("headlineSerif")}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="projects-grid grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <div key={i} className="project-card">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
