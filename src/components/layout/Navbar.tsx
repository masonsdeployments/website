"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/layout/DarkModeToggle";
import { useRouter, usePathname } from "next/navigation";
import LogoLink from "../LogoLink";
import MobileNav from "./MobileNavbar";
import { useTranslations } from "next-intl";
import { LocaleToggle } from "./LocaleToggle";
import { useLenis } from "@/components/providers/LenisProvider";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const t = useTranslations("Navbar");
  const { scrollTo } = useLenis();
  const router = useRouter();
  const pathname = usePathname();

  // GSAP entrance animation
  useGSAP(
    () => {
      if (navRef.current) {
        gsap.fromTo(
          navRef.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
        );
      }
    },
    { dependencies: [] }
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    // RTL detection
    setIsRtl(document.body.getAttribute("data-rtl") === "true");
    const observer = new MutationObserver(() => {
      setIsRtl(document.body.getAttribute("data-rtl") === "true");
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-rtl"],
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNav = (sectionId: string) => {
    const localePrefix = pathname.split("/")[1];
    const isRoot = pathname === `/${localePrefix}` || pathname === "/";

    if (isRoot) {
      const el = document.getElementById(sectionId);
      if (el) {
        scrollTo(el, { offset: -80 });
      }
    } else {
      router.push(`/${localePrefix}?scrollTo=${sectionId}`);
    }
  };

  const navLinks = [
    { id: "features", label: t("features") },
    { id: "projects", label: t("projects") },
    { id: "how-it-works", label: t("howItWorks") },
    { id: "testimonials", label: t("testimonials") },
  ];

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "py-2 glass border-b border-border/50 shadow-lg"
          : "py-4 bg-transparent"
      )}
      dir={isRtl ? "rtl" : undefined}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className={cn(
              "text-2xl font-bold transition-transform duration-300 hover:scale-105",
              isRtl ? "ml-0 mr-4" : "mr-0 ml-4"
            )}
          >
            <LogoLink />
          </div>

          {/* Desktop Nav */}
          <div
            className={cn(
              "hidden lg:flex items-center gap-1",
              isRtl ? "font-arabic" : ""
            )}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50"
                )}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => router.push("/about")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {t("about")}
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <LocaleToggle />
            <DarkModeToggle />
            <Button
              onClick={() => router.push("/contact")}
              className={cn(
                "btn-animate bg-primary text-primary-foreground hover:bg-primary/90",
                "font-medium px-6",
                isRtl ? "font-arabic" : ""
              )}
            >
              {t("cta")}
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-3">
            <DarkModeToggle />
            <LocaleToggle />
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
