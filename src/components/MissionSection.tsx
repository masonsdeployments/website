import { Heart, Zap, Users } from "lucide-react";
import { MissionCard } from "./MissionCard";

const missionItems = [
  {
    icon: <Heart className="h-12 w-12 text-primary mx-auto" />,
    title: "Human-Centered",
    description:
      "Every decision starts with the people who will use our software.",
  },
  {
    icon: <Zap className="h-12 w-12 text-primary mx-auto" />,
    title: "Zero Bullshit",
    description: "We cut through the noise to build what actually matters.",
  },
  {
    icon: <Users className="h-12 w-12 text-primary mx-auto" />,
    title: "Collective Impact",
    description: "Together, we&apos;re stronger than the sum of our parts.",
  },
];

export const MissionSection = () => (
  <section id="mission" className="py-20 bg-card/30 scroll-mt-24">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">
          Built on{" "}
          <span className="gradient-text font-serif not-italic">empathy</span>
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
