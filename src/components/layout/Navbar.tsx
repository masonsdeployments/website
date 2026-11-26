"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useIsRtl } from "@/hooks/use-rtl";
import { useLenis } from "@/components/providers/LenisProvider";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import LogoLink from "@/components/LogoLink";
import MobileNav from "@/components/layout/MobileNavbar";
import { DarkModeToggle } from "@/components/layout/DarkModeToggle";
import { LocaleToggle } from "@/components/layout/LocaleToggle";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const t = useTranslations("Navbar");
  const isRtl = useIsRtl();
  const { scrollTo } = useLenis();
  const router = useRouter();
  const pathname = usePathname();

  useGSAP(
    () => {
      if (navRef.current) {
        gsap.fromTo(
          navRef.current,
          { y: -32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.08 }
        );
      }
    },
    { dependencies: [] }
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (sectionId: string) => {
    if (pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        scrollTo(el, { offset: -88 });
      }
    } else {
      router.push(`/?scrollTo=${sectionId}`);
    }
  };

  const navLinks = [
    { id: "features", label: t("features") },
    { id: "projects", label: t("projects") },
    { id: "how-it-works", label: t("howItWorks") },
    { id: "testimonials", label: t("testimonials") },
  ];

  return (
    <header
      ref={navRef}
      dir={isRtl ? "rtl" : "ltr"}
      className={cn(
        "fixed top-0 inset-x-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "glass border-x-0 border-t-0 py-2.5 shadow-sm"
          : "bg-background/55 backdrop-blur-md border-b border-border/30 py-3.5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <div className="shrink-0">
          <LogoLink />
        </div>

        {/* Desktop Nav */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-1 rounded-full border border-border/50 bg-card/45 px-1.5 py-1 backdrop-blur-md"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNav(link.id)}
              className="whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-background/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </button>
          ))}

          <Link
            href="/about"
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:bg-background/80 hover:text-foreground",
              pathname === "/about"
                ? "bg-background/90 text-foreground shadow-xs"
                : "text-muted-foreground"
            )}
          >
            {t("about")}
          </Link>

          <Link
            href="/links"
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:bg-background/80 hover:text-foreground",
              pathname === "/links"
                ? "bg-background/90 text-foreground shadow-xs"
                : "text-muted-foreground"
            )}
          >
            {t("links")}
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex shrink-0 items-center gap-2.5">
          <LocaleToggle />
          <DarkModeToggle />
          <Link
            href="/contact"
            className="group btn-animate inline-flex min-h-[40px] items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>{t("cta")}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden shrink-0 items-center gap-2">
          <Link
            href="/contact"
            className="inline-flex min-h-[36px] items-center gap-1 whitespace-nowrap rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
          >
            <span>{t("contactShort")}</span>
          </Link>
          <LocaleToggle />
          <DarkModeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
