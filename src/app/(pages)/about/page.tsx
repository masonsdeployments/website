"use client";

import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
  gh?: string;
  fb?: string;
  ig?: string;
  x?: string;
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
      Masons started in a coffee shop at 2AM. Three teenage devs sat huddled
      over half-dead laptops, half-full cups of bitter Turkish coffee, and fully
      charged dreams.
    </p>
    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
      Back then, they were barely 16. Still figuring out what a for loop was,
      still learning to walk in the dev world without tripping over syntax
      errors. They had an idea: an app that could actually help people. So they
      mapped it out, picked a stack they barely knew, and dove in headfirst. For
      three months, they learned, built, dreamed. Everything felt like it was
      lining up.
    </p>
    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
      Then one random day, just opening the Play Store to update Clash of Clans
      like any other normal teenager... bam. There it was. The exact same app.
      Built by someone else. Shipped. Polished. Everywhere. And it was good.
      Like, damn, hats-off kind of good. It crushed in Egypt. That sting? Yeah,
      it hurt. But respect where it&apos;s due. They got beat fair and square.
    </p>
    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
      After that, life kicked in. One dev dipped. School got hectic. The dream
      went into deep freeze for a while. Third secondary, finals, the chaos of
      teenhood. Masons went quiet.
    </p>
    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
      But legends don&apos;t stay dormant forever.
    </p>
    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
      They graduated highschool. Life shifted. Seif crossed paths with two
      powerhouses: Ahmed Khalid, better known as Z3ln, and Sherif Lotfy, aka
      Sizif. Meanwhile, Abdelaziz met Omar Waleed in a different corner of the
      college cosmos. And just like that, the universe tossed a new challenge
      their way: NASA Space Apps Cairo 2023. That was the spark.
    </p>
    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
      Seif called in the cavalry: his cousin Omar Ellaban. The puzzle pieces
      locked in. Six minds, six stories, one wild idea. For the first time, the
      Mighty Founding Six stood assembled.
    </p>
    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
      When Rafiqi came into view, something shifted. The mission got real. They
      searched, reached out, brought new people into the fold. Each one brought
      a different background, a new way of thinking, skills the OGs didn&apos;t
      have. And that&apos;s what made the team powerful as hell. Not clones, but
      a crew of misfits with heart, grit, and range. Every one of them unique as
      hell.
    </p>
    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
      From there, it was never about the hype. Not about slapping
      &quot;AI-powered&quot; on a landing page just to raise eyebrows. They
      weren&apos;t here for billion-dollar nothings.
    </p>
    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
      They were here to build real stuff that mattered. Sometimes that meant AI
      that actually understood the context of a conversation, not just spit out
      buzzwords. Other times it was about infrastructure that didn&apos;t fall
      apart when 50,000 users showed up at once. Always, always, it was about
      putting people before ego.
    </p>
    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
      This wasn&apos;t just a startup. This was Masons.
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
      "Just a guy who loves shipping apps that actually works. Deep in code, big on clarity, always chasing better systems.",
    focus: "Pretending it's simple until it actually is",
    image: "https://avatar.iran.liara.run/public/boy?username=mason",
    href: "https://seifzellaban.work/",
  },
  {
    name: "Abdelaziz Amr",
    role: "Backend Dev & Co-Founder of Masons",
    description:
      "Turns user pain into elegant solutions. Has strong opinions about whitespace.",
    focus: "Design that respects humans",
    image: "https://avatar.iran.liara.run/public/boy?username=Zizo",
  },
  {
    name: "Ahmed Khaled (Z3ln)",
    role: "Fullstack Dev & CTO of Masons",
    description:
      "Turns user pain into elegant solutions. Has strong opinions about whitespace.",
    focus: "Design that respects humans",
    image: "https://avatar.iran.liara.run/public/boy?username=Z3ln",
  },
  {
    name: "Sherif Lotfy (Sizif)",
    role: "Fullstack Dev & VP of Frontend Team",
    description:
      "Turns user pain into elegant solutions. Has strong opinions about whitespace.",
    focus: "Design that respects humans",
    image: "https://avatar.iran.liara.run/public/boy?username=Sizif",
    href: "https://sizif.wearemasons.com/",
  },
  {
    name: "Omar Ellaban (Ktlr)",
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
