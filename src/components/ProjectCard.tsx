import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type ProjectCardProps = {
  badge: string;
  title: string;
  description: string;
  href?: string;
};

export const ProjectCard = ({
  badge,
  title,
  description,
  href,
}: ProjectCardProps) => (
  <Card className="glass-card hover:bg-card/70 transition-all duration-300 h-full">
    <CardContent className="p-8 flex flex-col justify-between h-full">
      <div>
        <Badge variant="secondary" className="mb-4 font-mono">
          {badge}
        </Badge>
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>
      </div>
      {href && (
        <Button
          variant="outline"
          className="group w-fit hover:cursor-pointer" // bug here: cursor is not pointing...
          asChild
        >
          <a href={href}>
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      )}
    </CardContent>
  </Card>
);
