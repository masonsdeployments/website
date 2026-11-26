"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Code2,
  Layers,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useIsRtl } from "@/hooks/use-rtl";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectInquiryTrigger } from "@/components/project-inquiry-modal";
import { cn } from "@/lib/utils";

type CaseStudySlug = "rafiqi" | "repai" | "orbit" | "naveris";

interface TocItem {
  id: string;
  text: string;
  index: string;
}

const CASE_STUDY_META: Record<
  CaseStudySlug,
  {
    href: string;
    domain: string;
    isCode?: boolean;
  }
> = {
  rafiqi: {
    href: "https://rafiqi.wearemasons.com/",
    domain: "rafiqi.wearemasons.com",
  },
  repai: {
    href: "https://repai.wearemasons.com/",
    domain: "repai.wearemasons.com",
  },
  orbit: {
    href: "https://orbit.wearemasons.com/",
    domain: "orbit.wearemasons.com",
  },
  naveris: {
    href: "https://github.com/wearemasons/NAVERIS",
    domain: "github.com/wearemasons/NAVERIS",
    isCode: true,
  },
};

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function MdxLayout({ children }: { children: ReactNode }) {
  const t = useTranslations("CaseStudy");
  const isRtl = useIsRtl();
  const pathname = usePathname();
  const articleRef = useRef<HTMLElement>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  const rawSlug = pathname.split("/").filter(Boolean).pop() ?? "";
  const slug = (
    rawSlug in CASE_STUDY_META ? rawSlug : null
  ) as CaseStudySlug | null;
  const meta = slug ? CASE_STUDY_META[slug] : null;

  useEffect(() => {
    const container = articleRef.current;
    if (!container) return;

    const headings = Array.from(container.querySelectorAll("h2"));
    const usedIds = new Set<string>();
    const items: TocItem[] = [];

    headings.forEach((heading, idx) => {
      const text = heading.textContent?.trim() ?? "";
      if (!text) return;

      let id = heading.id || slugifyHeading(text) || `section-${idx + 1}`;
      if (usedIds.has(id)) {
        id = `${id}-${idx + 1}`;
      }
      usedIds.add(id);
      heading.id = id;

      items.push({
        id,
        text,
        index: String(idx + 1).padStart(2, "0"),
      });
    });

    const rafId = window.requestAnimationFrame(() => {
      setToc(items);
      if (items.length > 0) {
        setActiveId(items[0].id);
      }
    });

    if (headings.length === 0) {
      return () => window.cancelAnimationFrame(rafId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible.length > 0 && visible[0].target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -65% 0px", threshold: 0 }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [pathname]);

  const highlights = slug
    ? [
        {
          icon: Layers,
          title: t(`items.${slug}.h1.title`),
          desc: t(`items.${slug}.h1.desc`),
        },
        {
          icon: Award,
          title: t(`items.${slug}.h2.title`),
          desc: t(`items.${slug}.h2.desc`),
        },
        {
          icon: Code2,
          title: t(`items.${slug}.h3.title`),
          desc: t(`items.${slug}.h3.desc`),
        },
      ]
    : [];

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="flex min-h-screen flex-col bg-background text-foreground"
    >
      <Navbar />

      <main
        id="main-content"
        className="mx-auto w-full max-w-7xl flex-1 px-5 pt-28 pb-20 sm:px-6 sm:pt-36 sm:pb-24 lg:px-8"
      >
        {/* Top editorial breadcrumb bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-5">
          <Link
            href="/?scrollTo=projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {isRtl ? (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            ) : (
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            )}
            <span>{t("backToWork")}</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {t("kicker")}
            </span>
            {meta && (
              <a
                href={meta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/70 px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <span>{meta.isCode ? t("sourceCode") : t("liveDemo")}</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>

        {/* 3-card At-a-Glance Highlights row */}
        {highlights.length > 0 && (
          <section
            aria-label={t("highlightsLabel")}
            className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3"
          >
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="surface-card rounded-2xl p-6">
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
        )}

        {/* Main 3-col grid: Left sticky TOC matches width of card 1 above */}
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

              {toc.length > 0 && (
                <nav aria-label={t("tocTitle")} className="mt-4 flex flex-col">
                  {toc.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={cn(
                          "group flex items-baseline gap-3 border-b border-border/40 py-2.5 text-sm font-medium transition-colors last:border-b-0",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span
                          className={cn(
                            "font-mono text-[11px]",
                            isActive
                              ? "text-primary font-semibold"
                              : "text-primary/70 group-hover:text-primary"
                          )}
                        >
                          {item.index}
                        </span>
                        <span>{item.text}</span>
                      </a>
                    );
                  })}
                </nav>
              )}

              {meta && (
                <div className="mt-5 border-t border-border/50 pt-5">
                  <p className="text-xs font-medium text-muted-foreground">
                    {meta.isCode ? t("repoLabel") : t("liveLabel")}
                  </p>
                  <a
                    href={meta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-1.5 inline-flex items-center gap-1 break-all font-mono text-xs text-foreground transition-colors hover:text-primary"
                  >
                    <span>{meta.domain}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </a>
                </div>
              )}
            </div>
          </aside>

          {/* Article Body + Closing CTA */}
          <div
            className={cn(
              "space-y-6 lg:col-span-2",
              isRtl ? "lg:order-1" : "lg:order-2"
            )}
          >
            <article
              ref={articleRef}
              dir="ltr"
              className="surface-card rounded-2xl p-6 text-left sm:p-8 lg:p-10"
            >
              {children}
            </article>

            <section className="surface-card rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                    {t("ctaKicker")}
                  </p>
                  <h2 className="mt-1.5 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                    {t("ctaTitle")}
                  </h2>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
                    {t("ctaDesc")}
                  </p>
                </div>

                <ProjectInquiryTrigger className="btn-animate inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-colors hover:bg-primary/90">
                  <span>{t("ctaButton")}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </ProjectInquiryTrigger>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
