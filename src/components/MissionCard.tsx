import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

type MissionCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export const MissionCard = ({ icon, title, description }: MissionCardProps) => (
  <Card className="glass-card hover:bg-card/70 transition-all duration-300 h-full">
    <CardContent className="p-8 text-center flex flex-col justify-start h-full">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
