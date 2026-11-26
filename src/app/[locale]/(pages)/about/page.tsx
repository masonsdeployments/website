"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useIsRtl } from "@/hooks/use-rtl";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectInquiryTrigger } from "@/components/project-inquiry-modal";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const MemberPortrait = ({
  name,
  image,
  solidColor,
  size = "md",
}: {
  name: string;
  image?: string;
  solidColor?: string;
  size?: "md" | "lg";
}) => {
  const [imageError, setImageError] = useState(false);

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const dimensions = size === "lg" ? "h-16 w-16" : "h-14 w-14";

  if (solidColor) {
    return (
      <div
        role="img"
        aria-label={name}
        style={{ backgroundColor: solidColor }}
        className={cn(
          "shrink-0 rounded-2xl border border-border/70 shadow-xs",
          dimensions
        )}
      />
    );
  }

  if (image && !imageError) {
    return (
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-2xl border border-border/70 bg-muted shadow-xs",
          dimensions
        )}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes={size === "lg" ? "64px" : "56px"}
          className="object-cover object-top"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-gradient-to-br from-primary/15 via-card to-muted font-serif text-lg font-semibold tracking-tight text-foreground shadow-xs",
        dimensions
      )}
    >
      {initials}
    </div>
  );
};

interface TeamMember {
  key: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  image?: string;
  solidColor?: string;
  href?: string;
  linkLabel?: string;
}

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <article className="glass-card-hover flex h-full flex-col justify-between rounded-2xl p-6 sm:p-7">
      <div>
        <div className="flex items-center gap-4">
          <MemberPortrait
            name={member.name}
            image={member.image}
            solidColor={member.solidColor}
            size="md"
          />
          <div className="min-w-0">
            <h3 className="font-serif text-xl font-bold leading-snug text-foreground">
              {member.name}
            </h3>
            <p className="mt-0.5 text-sm font-medium text-primary">
              {member.role}
            </p>
          </div>
        </div>

        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          {member.bio}
        </p>
      </div>

      <div className="mt-6 space-y-4 border-t border-border/50 pt-5">
        <div className="flex flex-wrap gap-2">
          {member.specialties.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>

        {member.href && member.linkLabel && (
          <div>
            <a
              href={member.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <span dir="ltr" className="font-mono text-xs">
                {member.linkLabel}
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </a>
          </div>
        )}
      </div>
    </article>
  );
};

export default function AboutPage() {
  const t = useTranslations("About");
  const tBrand = useTranslations("Brand");
  const isRtl = useIsRtl();

  const proofMetrics = [
    { value: "2020", label: t("stats.founded") },
    { value: "20+", label: t("stats.builds") },
    { value: "10M+", label: t("stats.volume") },
    { value: "24h", label: t("stats.reply") },
  ];

  const dossierRows = [
    {
      label: t("dossier.studioLabel"),
      value: tBrand("studioName"),
      href: site.studioUrl,
    },
    { label: t("dossier.basedLabel"), value: t("dossier.basedValue") },
    { label: t("dossier.modelLabel"), value: t("dossier.modelValue") },
    { label: t("dossier.stackLabel"), value: t("dossier.stackValue") },
    {
      label: t("dossier.contactLabel"),
      value: site.email,
      href: `mailto:${site.email}`,
    },
  ];

  const coFoundersTop: TeamMember[] = [
    {
      key: "seif",
      name: t("team.seif.name"),
      role: t("team.seif.role"),
      bio: t("team.seif.bio"),
      specialties: [
        t("team.seif.tags.0"),
        t("team.seif.tags.1"),
        t("team.seif.tags.2"),
      ],
      image: "/images/team/seif.webp",
      href: "https://seifzellaban.com/",
      linkLabel: "seifzellaban.com",
    },
    {
      key: "sherif",
      name: t("team.sherif.name"),
      role: t("team.sherif.role"),
      bio: t("team.sherif.bio"),
      specialties: [
        t("team.sherif.tags.0"),
        t("team.sherif.tags.1"),
        t("team.sherif.tags.2"),
      ],
      image: "/images/team/sizif.jpg",
      href: "https://www.sheriflotfy.dev/",
      linkLabel: "sheriflotfy.dev",
    },
  ];

  const coFoundersBottom: TeamMember[] = [
    {
      key: "ahmed",
      name: t("team.ahmed.name"),
      role: t("team.ahmed.role"),
      bio: t("team.ahmed.bio"),
      specialties: [
        t("team.ahmed.tags.0"),
        t("team.ahmed.tags.1"),
        t("team.ahmed.tags.2"),
      ],
      solidColor: "#000000",
      href: "https://ahmedk.dev/",
      linkLabel: "ahmedk.dev",
    },
    {
      key: "abdelaziz",
      name: t("team.abdelaziz.name"),
      role: t("team.abdelaziz.role"),
      bio: t("team.abdelaziz.bio"),
      specialties: [
        t("team.abdelaziz.tags.0"),
        t("team.abdelaziz.tags.1"),
        t("team.abdelaziz.tags.2"),
      ],
      image: "/images/team/abdelaziz.jpeg",
    },
    {
      key: "omar",
      name: t("team.omar.name"),
      role: t("team.omar.role"),
      bio: t("team.omar.bio"),
      specialties: [
        t("team.omar.tags.0"),
        t("team.omar.tags.1"),
        t("team.omar.tags.2"),
      ],
    },
  ];

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-background text-foreground"
    >
      <Navbar />

      <main
        id="main-content"
        className="mx-auto max-w-7xl px-5 pt-28 pb-20 sm:px-6 sm:pt-36 sm:pb-24 lg:px-8"
      >
        {/* Story & Trust Overview */}
        <section>
          <header className="grid grid-cols-1 gap-5 border-b border-border/50 pb-10 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-7">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <span className="font-mono text-[11px] text-primary">01</span>
                <span aria-hidden className="text-border">
                  /
                </span>
                <span>{t("kicker")}</span>
              </p>
              <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.03] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
                {t("headlineStart")}{" "}
                <span className="gradient-text font-serif">
                  {t("headlineSerif")}
                </span>
              </h1>
            </div>

            <p
              className={cn(
                "max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5 md:justify-self-end",
                isRtl ? "md:text-left" : "md:text-right"
              )}
            >
              {t("subtitle")}
            </p>
          </header>

          <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
            {/* Warm, trust-building studio narrative */}
            <div className="space-y-6 lg:col-span-8">
              <p className="font-serif text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
                {t("storyLead")}
              </p>

              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>{t("storyP1")}</p>
                <p>{t("storyP2")}</p>
                <p>{t("storyP3")}</p>
              </div>

              {/* Verified Studio Proof Strip */}
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-y border-border/50 py-7 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-border/50">
                {proofMetrics.map((metric, idx) => (
                  <div
                    key={metric.label}
                    className={cn(
                      idx === 0
                        ? "sm:pe-5"
                        : idx === proofMetrics.length - 1
                          ? "sm:ps-5"
                          : "sm:px-5"
                    )}
                  >
                    <dd
                      dir="ltr"
                      className="inline-block font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                    >
                      {metric.value}
                    </dd>
                    <dt className="mt-1.5 text-xs font-medium text-muted-foreground">
                      {metric.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            {/* Studio Overview Sidebar */}
            <aside className="lg:sticky lg:top-28 lg:col-span-4">
              <div className="surface-card rounded-2xl p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  {t("dossier.title")}
                </p>

                <dl className="mt-5 divide-y divide-border/50">
                  {dossierRows.map((row) => (
                    <div key={row.label} className="py-3.5 first:pt-0 last:pb-0">
                      <dt className="text-xs font-medium text-muted-foreground">
                        {row.label}
                      </dt>
                      <dd className="mt-1 text-base font-medium text-foreground">
                        {row.href ? (
                          <a
                            href={row.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1 break-all transition-colors hover:text-primary"
                          >
                            <span>{row.value}</span>
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </section>

        {/* Team Section */}
        <section className="mt-20 border-t border-border/50 pt-16 sm:mt-24 sm:pt-20">
          <header className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-7">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <span className="font-mono text-[11px] text-primary">02</span>
                <span aria-hidden className="text-border">
                  /
                </span>
                <span>{t("teamKicker")}</span>
              </p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-[1.03] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
                {t("teamHeadlineStart")}{" "}
                <span className="gradient-text font-serif">
                  {t("teamHeadlineSerif")}
                </span>
              </h2>
            </div>

            <p
              className={cn(
                "max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5 md:justify-self-end",
                isRtl ? "md:text-left" : "md:text-right"
              )}
            >
              {t("teamSubtitle")}
            </p>
          </header>

          {/* Co-Founders (2-up + 3-up symmetrical layout) */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {coFoundersTop.map((member) => (
              <TeamMemberCard key={member.key} member={member} />
            ))}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {coFoundersBottom.map((member) => (
              <TeamMemberCard key={member.key} member={member} />
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="mt-20 border-t border-border/50 pt-16 sm:mt-24 sm:pt-20">
          <div className="surface-card rounded-3xl p-8 sm:p-12 lg:p-14">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="font-mono text-[11px] text-primary">03</span>
                  <span aria-hidden className="text-border">
                    /
                  </span>
                  <span>{t("ctaKicker")}</span>
                </p>
                <h2 className="mt-4 font-serif text-4xl font-bold leading-[1.03] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
                  {t("ctaHeadlineStart")}{" "}
                  <span className="gradient-text font-serif">
                    {t("ctaHeadlineSerif")}
                  </span>
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {t("ctaDescription")}
                </p>
              </div>

              <div className="flex flex-col gap-2.5 sm:flex-row lg:col-span-5 lg:justify-end">
                <Link
                  href="/contact"
                  className="group btn-animate inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-colors hover:bg-primary/90"
                >
                  <span>{t("ctaButton")}</span>
                  {isRtl ? (
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                  ) : (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                </Link>

                <ProjectInquiryTrigger className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-border/70 bg-background/70 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{t("ctaQuickBrief")}</span>
                </ProjectInquiryTrigger>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
