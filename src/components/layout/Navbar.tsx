"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/layout/DarkModeToggle";
import { useRouter, usePathname } from "next/navigation";
import LogoLink from "../LogoLink";
import MobileNav from "./MobileNavbar";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);

  const t = useTranslations("Navbar");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NAV_HEIGHT = 72; // px, adjust if your nav height changes
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y =
        el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT - 8; // 8px extra space
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const router = useRouter();
  const pathname = usePathname();

  const handleNav = (sectionId: string) => {
    if (pathname !== "/") {
      router.push(`/?scrollTo=${sectionId}`);
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 60
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : ""
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold font-mono">
            <LogoLink />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => handleNav("mission")}
              className="hover:text-primary transition-colors hover:cursor-pointer"
            >
              {t("mission")}
            </button>
            <button
              onClick={() => handleNav("projects")}
              className="hover:text-primary transition-colors hover:cursor-pointer"
            >
              {t("projects")}
            </button>
            <button
              onClick={() => handleNav("approach")}
              className="hover:text-primary transition-colors hover:cursor-pointer"
            >
              {t("approach")}
            </button>
            <button
              onClick={() => router.push(`/about`)}
              className="hover:text-primary transition-colors hover:cursor-pointer"
            >
              {t("about")}
            </button>
            <DarkModeToggle />
            <Button
              onClick={() => router.push(`/contact`)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:cursor-pointer"
            >
              {t("contact")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <DarkModeToggle />
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
