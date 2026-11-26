"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Check,
  Copy,
  Github,
  Globe,
  Linkedin,
  Mail,
  Sparkles,
  Twitter,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { useIsRtl } from "@/hooks/use-rtl";
import { LogoSvg } from "@/components/LogoSvg";
import { DarkModeToggle } from "@/components/layout/DarkModeToggle";
import { LocaleToggle } from "@/components/layout/LocaleToggle";
import { ProjectInquiryTrigger } from "@/components/project-inquiry-modal";
import { site } from "@/lib/site";

const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
} as const;

export function LinksHub() {
  const t = useTranslations("LinksPage");
  const tBrand = useTranslations("Brand");
  const isRtl = useIsRtl();
  const [copied, setCopied] = useState(false);
  const [cairoTime, setCairoTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        setCairoTime(
          new Intl.DateTimeFormat("en-GB", {
            timeZone: site.timeZone,
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(new Date())
        );
      } catch {
        setCairoTime("");
      }
    };
    updateTime();
    const timer = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      toast.success(t("copiedToast"));
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.open(`mailto:${site.email}`, "_blank", "noopener,noreferrer");
    }
  };

  const featuredLinks = [
    {
      title: t("featured.studio.title"),
      subtitle: t("featured.studio.subtitle"),
      meta: "studio.wearemasons.com",
      href: site.studioUrl,
      external: true,
      highlight: true,
      icon: <Sparkles className="h-5 w-5 text-primary" />,
    },
    {
      title: t("featured.website.title"),
      subtitle: t("featured.website.subtitle"),
      meta: "wearemasons.com",
      href: "/",
      external: false,
      highlight: false,
      icon: <Globe className="h-5 w-5 text-primary" />,
    },
    {
      title: t("featured.contact.title"),
      subtitle: t("featured.contact.subtitle"),
      meta: "/contact",
      href: "/contact",
      external: false,
      highlight: false,
      icon: <Briefcase className="h-5 w-5 text-primary" />,
    },
    {
      title: t("featured.team.title"),
      subtitle: t("featured.team.subtitle"),
      meta: "/about",
      href: "/about",
      external: false,
      highlight: false,
      icon: <Users className="h-5 w-5 text-primary" />,
    },
  ] as const;

  const focusTags = [t("tags.t1"), t("tags.t2"), t("tags.t3"), t("tags.t4")];

  return (
    <main
      id="main-content"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-hidden bg-background pt-8 pb-20 text-foreground sm:pt-12 sm:pb-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 studio-grid opacity-45" />
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-gradient" />

      <div className="relative z-10 mx-auto max-w-xl px-5 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="group inline-flex min-h-[36px] items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {isRtl ? (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            ) : (
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            )}
            <span>{t("backHome")}</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:inline-flex">
              <span className="font-medium text-foreground">{t("city")}</span>
              {cairoTime ? (
                <>
                  <span aria-hidden className="text-border">
                    ·
                  </span>
                  <span
                    dir="ltr"
                    className="font-mono text-[11px] tabular-nums"
                  >
                    {cairoTime}
                  </span>
                </>
              ) : null}
            </div>
            <LocaleToggle />
            <DarkModeToggle />
          </div>
        </div>

        {/* Studio Identity Card */}
        <section className="surface-card mt-6 rounded-2xl p-6 backdrop-blur-md sm:mt-8 sm:p-7">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-5 sm:text-start">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-background/85">
              <LogoSvg className="text-primary" width={54} height={54} />
            </div>

            <div className="mt-4 min-w-0 sm:mt-0">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                {t("kicker")}
              </p>
              <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {tBrand("name")}
              </h1>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {t("bio")}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-1.5 border-t border-border/50 pt-4 sm:justify-start">
            {focusTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Direct contact actions */}
          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <a
              href={`mailto:${site.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-animate inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-colors hover:bg-primary/90"
            >
              <Mail className="h-4 w-4" />
              <span>{t("emailButton")}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-border/70 bg-background/70 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-primary" />
                  <span>{t("copiedButton")}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-muted-foreground" />
                  <span>{t("copyButton")}</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Primary Destinations */}
        <section aria-label="Featured destinations" className="mt-7">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <span className="font-mono text-[11px] text-primary">01</span>
            <span aria-hidden className="text-border">
              /
            </span>
            <span>{t("featuredHeading")}</span>
          </p>

          <div className="mt-3 flex flex-col gap-3">
            {featuredLinks.map((item) => {
              const cardClass = `group flex items-center justify-between gap-4 rounded-2xl border p-4 transition-all duration-200 sm:p-5 ${
                item.highlight
                  ? "border-primary/45 bg-card/85 shadow-sm hover:border-primary"
                  : "border-border/60 bg-card/60 hover:border-primary/40 hover:bg-card/85"
              }`;

              const inner = (
                <>
                  <div className="flex min-w-0 items-center gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-background/85">
                      {item.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <span className="font-serif text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                          {item.title}
                        </span>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {item.meta}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm leading-snug text-muted-foreground">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </>
              );

              return item.external ? (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {inner}
                </a>
              ) : (
                <Link key={item.title} href={item.href} className={cardClass}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Live Products */}
        <section aria-label="Products" className="mt-7">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <span className="font-mono text-[11px] text-primary">02</span>
            <span aria-hidden className="text-border">
              /
            </span>
            <span>{t("productsHeading")}</span>
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {site.products.map((product) => (
              <a
                key={product.id}
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-hover group flex flex-col justify-between rounded-2xl p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-serif text-lg font-bold text-foreground group-hover:text-primary">
                    {product.title}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <p className="mt-2 truncate font-mono text-[11px] text-muted-foreground">
                  {product.domain}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Socials */}
        <section aria-label="Social links" className="mt-7">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <span className="font-mono text-[11px] text-primary">03</span>
            <span aria-hidden className="text-border">
              /
            </span>
            <span>{t("socialsHeading")}</span>
          </p>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {site.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.id];
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card-hover group flex flex-col justify-between rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-4 w-4 text-foreground group-hover:text-primary" />
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <div className="mt-4">
                    <p className="font-serif text-base font-semibold text-foreground group-hover:text-primary">
                      {social.label}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {social.handle}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Quick Inquiry Trigger */}
        <div className="mt-7">
          <ProjectInquiryTrigger className="surface-card group flex min-h-[52px] w-full items-center justify-between gap-3 rounded-2xl px-5 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary">
            <span className="inline-flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>{t("quickBriefLabel")}</span>
            </span>
            <span className="text-xs text-muted-foreground">
              {t("quickBriefMeta")}
            </span>
          </ProjectInquiryTrigger>
        </div>
      </div>
    </main>
  );
}
