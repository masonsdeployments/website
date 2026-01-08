"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import LogoLink from "../LogoLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Footer = () => {
  const t = useTranslations("Footer");
  const containerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
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

  useGSAP(
    () => {
      gsap.fromTo(
        ".footer-content > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [] }
  );

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setEmail("");
  };

  const menuLinks = [
    { label: t("links.features"), href: "/#features" },
    { label: t("links.projects"), href: "/#projects" },
    { label: t("links.about"), href: "/about" },
    { label: t("links.contact"), href: "/contact" },
  ];

  const legalLinks = [
    { label: t("legal.privacy"), href: "/privacy" },
    { label: t("legal.terms"), href: "/terms" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/wearemasons", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/wearemasons",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/wearemasons",
      label: "Twitter",
    },
  ];

  return (
    <footer
      ref={containerRef}
      className="border-t border-border/50 bg-muted/30 dark:bg-secondary/20"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-6 py-16">
        <div className="footer-content grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <LogoLink />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {t("tagline")}
            </p>
            {/* Social Links */}
            <div
              className={cn(
                "flex gap-3",
                isRtl && "flex-row-reverse justify-end"
              )}
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-background border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Menu Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("menuTitle")}</h4>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("legalTitle")}</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">{t("newsletterTitle")}</h4>
            <p className="text-muted-foreground text-sm mb-4">
              {t("newsletterDesc")}
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className={cn("flex gap-2", isRtl && "flex-row-reverse")}
            >
              <Input
                type="email"
                placeholder={t("newsletterPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background"
                required
              />
              <Button type="submit" size="icon" className="shrink-0">
                <ArrowRight className={cn("w-4 h-4", isRtl && "rotate-180")} />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={cn(
            "mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4",
            isRtl && "md:flex-row-reverse"
          )}
        >
          <p className="text-muted-foreground text-sm">{t("copyright")}</p>
          <p className="text-muted-foreground text-sm">{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
};
