import { Heart, Zap, Users } from "lucide-react";
import { MissionCard } from "../cards/MissionCard";

const missionItems = [
  {
    icon: <Heart className="h-12 w-12 text-primary mx-auto" />,
    title: "Human-First Engineering",
    description:
      "We start with empathy, not algorithms. Every system we design begins with deep user research and ends with measurable human impact.",
  },
  {
    icon: <Zap className="h-12 w-12 text-primary mx-auto" />,
    title: "Zero-Waste Development",
    description:
      "No bloated features. No technical debt. We build lean, powerful systems that solve actual problems, not imaginary ones.",
  },
  {
    icon: <Users className="h-12 w-12 text-primary mx-auto" />,
    title: "Collective Intelligence",
    description:
      "Our distributed team thinks like a single, brilliant mind. We combine diverse perspectives to create solutions no individual could imagine alone.",
  },
];

export const MissionSection = () => (
  <section id="mission" className="py-20 bg-secondary/30 scroll-mt-24">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">
          While Others Build Features,{" "}
          <span className="gradient-text font-serif not-italic">
            We Build Futures
          </span>
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
          We believe great products start with understanding people. Empathy is
          the foundation that underlies all we do, including development,
          interface design, and system architecture.
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
