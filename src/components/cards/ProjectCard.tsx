import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

type ProjectCardProps = {
  badge: string;
  title: string;
  story: string;
  achievement?: string;
  winner?: boolean;
  testimonial?: {
    quote: string;
    author: string;
  };
  metrics?: {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
  demoHref?: string;
  codeHref?: string;
  caseStudyHref?: string;
};

export const ProjectCard = ({
  badge,
  title,
  story,
  achievement,
  winner,
  testimonial,
  metrics,
  demoHref,
  codeHref,
  caseStudyHref,
}: ProjectCardProps) => {
  const t = useTranslations("Projects.card");
  return (
    <Card className="glass-card hover:bg-card/70 transition-all duration-500 h-full group hover:shadow-2xl min-h-[500px] md:min-h-auto">
      <CardContent className="py-2 px-6 flex flex-col justify-between h-full">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <Badge variant="secondary" className="font-mono text-xs">
              {badge}
            </Badge>
            {winner && (
              <div className="flex items-center gap-1 text-primary">
                <Award className="h-4 w-4" />
                <span className="text-xs font-medium">{t("award")}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Story */}
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed text-sm">
              {story}
            </p>
          </div>

          {/* Metrics */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50">
              {metrics.map((metric, index) => (
                <div key={index} className="flex items-center gap-2">
                  {metric.icon || (
                    <TrendingUp className="h-4 w-4 text-primary" />
                  )}
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-primary">
                      {metric.value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {metric.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Achievement Badge */}
          {achievement && (
            <div className="bg-gradient-to-r from-primary/10 to-primary/10 border border-primary/20 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  {achievement}
                </span>
              </div>
            </div>
          )}

          {/* Testimonial */}
          {testimonial && (
            <blockquote className="border-l-4 border-primary/30 pl-4 italic text-sm text-muted-foreground">
              &quot;{testimonial.quote}&quot;
              <footer className="mt-2 text-xs font-medium text-primary">
                — {testimonial.author}
              </footer>
            </blockquote>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4 pt-4">
          {caseStudyHref && (
            <Button
              variant="default"
              size="sm"
              className="flex-1 group/btn cursor-pointer"
              asChild
            >
              <Link href={caseStudyHref}>
                <Users className="mr-2 h-4 w-4" />
                {t("cta1")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          )}

          {demoHref && (
            <Button
              variant="outline"
              size="sm"
              className={`group/btn cursor-pointer ${!caseStudyHref ? "flex-1" : "flex-1"}`}
              asChild
            >
              <Link href={demoHref}>
                {t("cta2")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          )}

          {codeHref && (
            <Button
              variant="outline"
              size="sm"
              className={`group/btn cursor-pointer ${!caseStudyHref ? "flex-1" : "flex-1"}`}
              asChild
            >
              <Link href={codeHref}>
                {t("cta3")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
