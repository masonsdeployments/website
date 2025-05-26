"use client";

import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const Avatar = ({
  name,
  image,
  className = "",
}: {
  name: string;
  image?: string;
  className?: string;
}) => {
  const [imageError, setImageError] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];

  const colorIndex =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;

  if (image && !imageError) {
    return (
      <Image
        src={image}
        alt={name}
        onError={() => setImageError(true)}
        width={50}
        height={50}
        className={`w-16 h-16 rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`w-16 h-16 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-bold text-lg ${className}`}
    >
      {initials}
    </div>
  );
};

interface TeamMember {
  name: string;
  role: string;
  description: string;
  focus: string;
  image?: string;
  href?: string;
}

const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <Card className="p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg h-full">
    <CardContent className="p-0 space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar name={member.name} image={member.image} />
        <div>
          <h3 className="text-xl font-bold">{member.name}</h3>
          <p className="text-primary">{member.role}</p>
        </div>
      </div>
      <p className="text-muted-foreground">{member.description}</p>
      <p className="text-sm border-l-2 border-primary pl-4 mt-4 bg-primary/5 py-2">
        {member.focus}
      </p>
      {member.href && (
        <Button
          variant="outline"
          className="group w-fit hover:cursor-pointer" // bug here: cursor is not pointing...
          asChild
        >
          <a href={member.href}>
            Visit Portfolio
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      )}
    </CardContent>
  </Card>
);

const HeroSection = () => (
  <section className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
      Masons started in a coffee shop at 2am. Three devs, tired of building
      flashy tech that didn&apos;t actually help anyone, decided to do things
      differently.
    </p>
    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
      We&apos;re not here to chase hype or build the next billion-dollar
      nothing. We&apos;re here to craft technology that makes life genuinely
      better for the humans who use it. Sometimes that means AI that actually
      understands context. Sometimes it&apos;s infrastructure that doesn&apos;t
      fall apart at scale. Always, it&apos;s about putting people before ego.
    </p>
  </section>
);

const TeamSection = ({ teamMembers }: { teamMembers: TeamMember[] }) => (
  <section className="flex flex-col items-center">
    <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
      Meet the{" "}
      <span className="gradient-text font-serif not-italic">builders</span>
    </h2>

    <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
      {teamMembers.map((member, i) => (
        <TeamMemberCard key={i} member={member} />
      ))}
    </div>
  </section>
);

const CallToActionSection = () => (
  <section className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl md:text-5xl font-bold mb-8">
      Let&apos;s build something that{" "}
      <span className="gradient-text font-serif not-italic">matters</span>
    </h2>

    <p className="text-xl text-muted-foreground mb-12">
      Whether you need help bringing an idea to life, or want to join a team
      that gives a damn — we&apos;d love to talk. No pitch decks needed. Just
      real conversations about real problems worth solving.
    </p>

    <Button
      asChild
      size="lg"
      className="text-lg hover:scale-[1.02] transition-transform"
    >
      <a href="/contact">Start a Conversation</a>
    </Button>
  </section>
);

const teamMembers: TeamMember[] = [
  {
    name: "Seif Zakaria",
    role: "Founder & CEO of Masons",
    description:
      "Just a guy who loves building shit that actually works. Deep in code, big on clarity, always chasing better systems.",
    focus: "Pretending it's simple until it actually is",
    image: "https://avatar.iran.liara.run/public/boy?username=Seif",
    href: "https://seifzellaban.work/",
  },
  {
    name: "Abdelaziz",
    role: "Backend Dev & Co-Founder of Masons",
    description:
      "Turns user pain into elegant solutions. Has strong opinions about whitespace.",
    focus: "Design that respects humans",
    image: "https://avatar.iran.liara.run/public/boy?username=Zizo",
  },
  {
    name: "Z3ln",
    role: "Fullstack Dev & CTO of Masons",
    description:
      "Turns user pain into elegant solutions. Has strong opinions about whitespace.",
    focus: "Design that respects humans",
    image: "https://avatar.iran.liara.run/public/boy?username=Z3ln",
  },
  {
    name: "Sizif",
    role: "Fullstack Dev & VP of Frontend Team",
    description:
      "Turns user pain into elegant solutions. Has strong opinions about whitespace.",
    focus: "Design that respects humans",
    image: "https://avatar.iran.liara.run/public/boy?username=Sizif",
    href: "https://sizif.wearemasons.com/",
  },
  {
    name: "Omar Ellaban",
    role: "Backend Engineer",
    description:
      "Builds APIs you actually want to use. Once fixed a critical bug from a moving taxi.",
    focus: "Rock-solid foundations",
    image: "https://avatar.iran.liara.run/public/boy?username=Ktlr",
  },
  {
    name: "Omar Waleed",
    role: "AI Engineer",
    description:
      "Teaches machines empathy. Writes algorithms that actually understand context.",
    focus: "Humanizing artificial intelligence",
    image: "https://avatar.iran.liara.run/public/boy?username=y3gob",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground mt-24">
      <Navbar />
      <main className="container mx-auto px-6 py-12 md:py-20 space-y-16 md:space-y-24">
        <HeroSection />
        <TeamSection teamMembers={teamMembers} />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}
