"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { useIsRtl } from "@/hooks/use-rtl";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import LogoLink from "@/components/LogoLink";
import { ProjectInquiryTrigger } from "@/components/project-inquiry-modal";
import { site } from "@/lib/site";

const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
} as const;

export const Footer = () => {
  const t = useTranslations("Footer");
  const tBrand = useTranslations("Brand");
  const isRtl = useIsRtl();
  const containerRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(
        ".footer-content > *",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [] }
  );

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      toast.success(t("emailCopied"));
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.open(`mailto:${site.email}`, "_blank", "noopener,noreferrer");
    }
  };

  const menuLinks = [
    { label: t("links.features"), href: "/?scrollTo=features" },
    { label: t("links.projects"), href: "/?scrollTo=projects" },
    { label: t("links.about"), href: "/about" },
    { label: t("links.contact"), href: "/contact" },
  ];

  const resourceLinks = [
    { label: t("links.linksHub"), href: "/links" },
    { label: t("legal.privacy"), href: "/privacy" },
    {
      label: tBrand("studioName"),
      href: site.studioUrl,
      external: true,
    },
  ];

  return (
    <footer
      ref={containerRef}
      dir={isRtl ? "rtl" : "ltr"}
      className="border-t border-border/50 bg-muted/20 dark:bg-secondary/10"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="footer-content grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="mb-4">
              <LogoLink />
            </div>
            <p className="max-w-xs text-base leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {site.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.id];
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card/70 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
              {t("menuTitle")}
            </p>
            <ul className="mt-4 space-y-3">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
              {t("resourcesTitle")}
            </p>
            <ul className="mt-4 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-base text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-base text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Inquiry Block */}
          <div className="lg:col-span-4">
            <div className="surface-card rounded-2xl p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                {t("inquiryKicker")}
              </p>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {t("inquiryDesc")}
              </p>

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                <ProjectInquiryTrigger className="btn-animate inline-flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-colors hover:bg-primary/90">
                  <span>{t("inquiryCta")}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </ProjectInquiryTrigger>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-primary" />
                      <span>{t("copiedLabel")}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-muted-foreground" />
                      <span>{t("copyEmailLabel")}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/50 pt-7 text-sm text-muted-foreground sm:flex-row">
          <p>{t("copyright")}</p>
          <p>{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
};
