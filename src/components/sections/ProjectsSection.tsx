import { TrendingUp, Users } from "lucide-react";
import { ProjectCard } from "../cards/ProjectCard";
import { useTranslations } from "next-intl";

export const ProjectsSection = () => {
  const t = useTranslations("Projects");
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

  return (
    <section id="projects" className="py-20 bg-background scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
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

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};
