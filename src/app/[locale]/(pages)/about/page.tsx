"use client";

import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

// RTL utility hook
const useRTL = () => {
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

  return isRtl;
};

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
  const [isLoading, setIsLoading] = useState(true);

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

  // Reset error state when image prop changes
  React.useEffect(() => {
    if (image) {
      setImageError(false);
      setIsLoading(true);
    }
  }, [image]);

  if (image && !imageError) {
    // Use regular img tag for external URLs for better compatibility
    if (image.startsWith("http")) {
      return (
        <img
          src={image}
          alt={name}
          onLoad={() => {
            setIsLoading(false);
            setImageError(false);
          }}
          onError={() => {
            setIsLoading(false);
            setImageError(true);
          }}
          className={`w-16 h-16 rounded-full object-cover ${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        />
      );
    }

    // Use Next.js Image for local images
    return (
      <div
        className={`relative w-16 h-16 rounded-full overflow-hidden ${className}`}
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          onLoad={() => {
            setIsLoading(false);
            setImageError(false);
          }}
          onError={() => {
            setIsLoading(false);
            setImageError(true);
          }}
          sizes="64px"
        />
        {isLoading && (
          <div
            className={`absolute inset-0 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-bold text-lg animate-pulse`}
          >
            {initials}
          </div>
        )}
      </div>
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

const TeamMemberCard = ({
  member,
  portfolioText,
}: {
  member: TeamMember;
  portfolioText: string;
}) => {
  const isRtl = useRTL();

  return (
    <Card className="p-6 transition-all duration-300 hover:opacity-80 hover:shadow-lg h-full min-h-[400px] md:min-h-auto">
      <CardContent className="p-0 space-y-4">
        <div className={`flex items-center space-x-4 ml-2`}>
          <Avatar name={member.name} image={member.image} />
          <div className={isRtl ? "text-right" : "text-left"}>
            <h3 className={`text-xl font-bold ${isRtl ? "font-arabic" : ""}`}>
              {member.name}
            </h3>
            <p className={`text-primary ${isRtl ? "font-arabic" : ""}`}>
              {member.role}
            </p>
          </div>
        </div>
        <p
          className={`text-muted-foreground ${isRtl ? "text-right font-arabic" : "text-left"}`}
        >
          {member.description}
        </p>
        <p
          className={`text-sm mt-4 bg-primary/5 py-3 px-4 rounded-md ${isRtl ? "border-r-4 border-primary text-right font-arabic" : "border-l-4 border-primary text-left"}`}
        >
          {member.focus}
        </p>
        {member.href && (
          <Button
            variant="outline"
            className={`group w-fit hover:cursor-pointer ${isRtl ? "font-arabic" : ""}`}
            asChild
          >
            <a href={member.href} className="flex items-center">
              {isRtl ? (
                <>
                  {portfolioText}
                  <ArrowLeft className="ml-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                  {portfolioText}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const HeroSection = () => {
  const t = useTranslations("About");
  const isRtl = useRTL();

  return (
    <section
      className={`flex flex-col items-center justify-center max-w-4xl mx-auto ${isRtl ? "text-center font-arabic" : "text-center"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <p
        className={`text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 ${isRtl ? "font-arabic" : ""}`}
      >
        {t("heroIntro")}
      </p>
      <p
        className={`text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 ${isRtl ? "font-arabic" : ""}`}
      >
        {t("heroStory1")}
      </p>
      <p
        className={`text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 ${isRtl ? "font-arabic" : ""}`}
      >
        {t("heroStory2")}
      </p>
      <p
        className={`text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 ${isRtl ? "font-arabic" : ""}`}
      >
        {t("heroStory3")}
      </p>
      <p
        className={`text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 ${isRtl ? "font-arabic" : ""}`}
      >
        {t("heroStory4")}
      </p>
      <p
        className={`text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 ${isRtl ? "font-arabic" : ""}`}
      >
        {t("heroStory5")}
      </p>
      <p
        className={`text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 ${isRtl ? "font-arabic" : ""}`}
      >
        {t("heroStory6")}
      </p>
      <p
        className={`text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 ${isRtl ? "font-arabic" : ""}`}
      >
        {t("heroStory7")}
      </p>
      <p
        className={`text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 ${isRtl ? "font-arabic" : ""}`}
      >
        {t("heroStory8")}
      </p>
      <p
        className={`text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 ${isRtl ? "font-arabic" : ""}`}
      >
        {t("heroStory9")}
      </p>
      <p
        className={`text-xl md:text-2xl text-muted-foreground leading-relaxed ${isRtl ? "font-arabic" : ""}`}
      >
        {t("heroStory10")}
      </p>
    </section>
  );
};

const TeamSection = ({ teamMembers }: { teamMembers: TeamMember[] }) => {
  const t = useTranslations("About");
  const isRtl = useRTL();

  return (
    <section className="flex flex-col items-center" dir={isRtl ? "rtl" : "ltr"}>
      <h2
        className={`text-3xl md:text-5xl font-bold mb-12 text-center ${isRtl ? "font-arabic" : ""}`}
      >
        {t("teamHeadlineStart")}{" "}
        <span className="gradient-text font-serif not-italic">
          {t("teamHeadlineSerif")}
        </span>
      </h2>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
        {teamMembers.map((member, i) => (
          <TeamMemberCard
            key={i}
            member={member}
            portfolioText={t("team.seif.portfolioButton")}
          />
        ))}
      </div>
    </section>
  );
};

const CallToActionSection = () => {
  const t = useTranslations("About");
  const isRtl = useRTL();

  return (
    <section
      className="max-w-4xl mx-auto text-center"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <h2
        className={`text-3xl md:text-5xl font-bold mb-8 ${isRtl ? "font-arabic" : ""}`}
      >
        {t("ctaHeadlineStart")}{" "}
        <span className="gradient-text font-serif not-italic">
          {t("ctaHeadlineSerif")}
        </span>
      </h2>

      <p
        className={`text-xl text-muted-foreground mb-12 ${isRtl ? "font-arabic" : ""}`}
      >
        {t("ctaDescription")}
      </p>

      <Button
        asChild
        size="lg"
        className={`text-lg hover:scale-[1.02] transition-transform ${isRtl ? "font-arabic" : ""}`}
      >
        <Link href="/contact">{t("ctaButton")}</Link>
      </Button>
    </section>
  );
};

export default function AboutPage() {
  const t = useTranslations("About");
  const isRtl = useRTL();

  const teamMembers: TeamMember[] = [
    {
      name: t("team.seif.name"),
      role: t("team.seif.role"),
      description: t("team.seif.description"),
      focus: t("team.seif.focus"),
      image: "/images/team/seif.jpeg",
      href: "https://seifzellaban.work/",
    },
    {
      name: t("team.abdelaziz.name"),
      role: t("team.abdelaziz.role"),
      description: t("team.abdelaziz.description"),
      focus: t("team.abdelaziz.focus"),
      image: "/images/team/abdelaziz.jpeg",
    },
    {
      name: t("team.ahmed.name"),
      role: t("team.ahmed.role"),
      description: t("team.ahmed.description"),
      focus: t("team.ahmed.focus"),
      image: "https://avatar.iran.liara.run/public/boy?username=Z3ln",
    },
    {
      name: t("team.sherif.name"),
      role: t("team.sherif.role"),
      description: t("team.sherif.description"),
      focus: t("team.sherif.focus"),
      image: "https://avatar.iran.liara.run/public/boy?username=Sizif",
      href: "https://sizif.wearemasons.com/",
    },
    {
      name: t("team.omar.name"),
      role: t("team.omar.role"),
      description: t("team.omar.description"),
      focus: t("team.omar.focus"),
      image: "https://avatar.iran.liara.run/public/boy?username=Ktlr",
    },
    {
      name: t("team.omarWaleed.name"),
      role: t("team.omarWaleed.role"),
      description: t("team.omarWaleed.description"),
      focus: t("team.omarWaleed.focus"),
      image: "https://avatar.iran.liara.run/public/boy?username=y3gob",
    },
  ];

  return (
    <div
      className="min-h-screen bg-background text-foreground mt-24"
      dir={isRtl ? "rtl" : "ltr"}
    >
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
