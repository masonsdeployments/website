import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Lock, ShieldCheck, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectInquiryTrigger } from "@/components/project-inquiry-modal";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy | Masons",
  description:
    "How Masons handles project briefs, contact inquiries, browser preferences, and client confidentiality.",
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isRtl = locale === "ar";
  const t = await getTranslations({ locale, namespace: "PrivacyPage" });

  const highlights = [
    {
      icon: ShieldCheck,
      title: t("highlights.h1.title"),
      desc: t("highlights.h1.desc"),
    },
    {
      icon: Lock,
      title: t("highlights.h2.title"),
      desc: t("highlights.h2.desc"),
    },
    {
      icon: SlidersHorizontal,
      title: t("highlights.h3.title"),
      desc: t("highlights.h3.desc"),
    },
  ];

  const sections = [
    {
      id: "collect",
      index: "01",
      title: t("s1.title"),
      body: t("s1.body"),
      points: [t("s1.p1"), t("s1.p2"), t("s1.p3")],
    },
    {
      id: "use",
      index: "02",
      title: t("s2.title"),
      body: t("s2.body"),
      points: [t("s2.p1"), t("s2.p2"), t("s2.p3")],
    },
    {
      id: "confidentiality",
      index: "03",
      title: t("s3.title"),
      body: t("s3.body"),
      points: [],
    },
    {
      id: "storage",
      index: "04",
      title: t("s4.title"),
      body: t("s4.body"),
      points: [],
    },
    {
      id: "cookies",
      index: "05",
      title: t("s5.title"),
      body: t("s5.body"),
      points: [],
    },
    {
      id: "rights",
      index: "06",
      title: t("s6.title"),
      body: t("s6.body"),
      points: [t("s6.p1"), t("s6.p2"), t("s6.p3")],
    },
    {
      id: "updates",
      index: "07",
      title: t("s7.title"),
      body: t("s7.body"),
      points: [],
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
        {/* Editorial Header */}
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
              {t("title")}
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("updated")} · {t("scopeNote")}
            </p>
          </div>

          <p
            className={cn(
              "max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5 md:justify-self-end",
              isRtl ? "md:text-left" : "md:text-right"
            )}
          >
            {t("intro")}
          </p>
        </header>

        {/* At-a-glance trust commitments */}
        <section
          aria-label={t("highlightsLabel")}
          className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="surface-card rounded-2xl p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-serif text-lg font-bold text-foreground">
                  {item.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </section>

        {/* Main 3-col policy document (TOC matches left card width above) */}
        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {/* Sticky Table of Contents — visually left on desktop in both LTR and RTL */}
          <aside
            className={cn(
              "lg:sticky lg:top-28 lg:col-span-1",
              isRtl ? "lg:order-2" : "lg:order-1"
            )}
          >
            <div className="surface-card rounded-2xl p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                {t("tocTitle")}
              </p>

              <nav aria-label={t("tocTitle")} className="mt-4 flex flex-col">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="group flex items-baseline gap-3 border-b border-border/40 py-2.5 text-sm font-medium text-muted-foreground transition-colors last:border-b-0 hover:text-foreground"
                  >
                    <span className="font-mono text-[11px] text-primary/80 group-hover:text-primary">
                      {section.index}
                    </span>
                    <span>{section.title}</span>
                  </a>
                ))}
              </nav>

              <div className="mt-5 border-t border-border/50 pt-5">
                <p className="text-xs font-medium text-muted-foreground">
                  {t("tocEmailLabel")}
                </p>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent("Privacy or NDA Request")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-1.5 inline-flex items-center gap-1 break-all text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  <span>{site.email}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </a>
              </div>
            </div>
          </aside>

          {/* Policy Clauses */}
          <div
            className={cn(
              "space-y-6 lg:col-span-2",
              isRtl ? "lg:order-1" : "lg:order-2"
            )}
          >
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="surface-card scroll-mt-28 rounded-2xl p-6 sm:p-8"
              >
                <p className="font-mono text-[11px] text-primary">
                  {section.index}
                </p>
                <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-foreground">
                  {section.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {section.body}
                </p>

                {section.points.length > 0 && (
                  <ul className="mt-4 space-y-2.5 border-t border-border/50 pt-4">
                    {section.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-base leading-relaxed text-muted-foreground"
                      >
                        <span
                          aria-hidden
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Closing Privacy & NDA Contact Card */}
            <div className="surface-card flex flex-col items-start justify-between gap-5 rounded-2xl p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  {t("contactKicker")}
                </p>
                <h2 className="mt-1.5 font-serif text-2xl font-bold text-foreground">
                  {t("contactTitle")}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {t("contactDesc")}{" "}
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent("Privacy or NDA Request")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
                  >
                    {site.email}
                  </a>
                </p>
              </div>

              <ProjectInquiryTrigger className="btn-animate inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-colors hover:bg-primary/90">
                <span>{t("contactCta")}</span>
                <ArrowUpRight className="h-4 w-4" />
              </ProjectInquiryTrigger>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
