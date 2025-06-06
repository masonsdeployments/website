import { Heart, Zap, Users } from "lucide-react";
import { MissionCard } from "../cards/MissionCard";
import { useTranslations } from "next-intl";

export const MissionSection = () => {
  const t = useTranslations("Mission");

  const missionItems = [
    {
      icon: <Heart className="h-12 w-12 text-primary mx-auto" />,
      title: t("humanFirstTitle"),
      description: t("humanFirstDesc"),
    },
    {
      icon: <Zap className="h-12 w-12 text-primary mx-auto" />,
      title: t("zeroWasteTitle"),
      description: t("zeroWasteDesc"),
    },
    {
      icon: <Users className="h-12 w-12 text-primary mx-auto" />,
      title: t("collectiveTitle"),
      description: t("collectiveDesc"),
    },
  ];

  return (
    <section
      id="mission"
      className="py-20 bg-secondary dark:bg-secondary/30 scroll-mt-24"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            {t("headlineStart")} <br />
            <span className="gradient-text font-serif not-italic">
              {t("headlineSerif")}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
            {t("description")}
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {missionItems.map((item, index) => (
              <MissionCard key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
