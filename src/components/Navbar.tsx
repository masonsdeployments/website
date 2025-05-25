"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { LogoSvg } from "./LogoSvg";

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);

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
            <span className="gradient-text">
              <LogoSvg className="text-primary" width={60} height={60} />
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("mission")}
              className="hover:text-primary transition-colors hover:cursor-pointer"
            >
              Mission
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="hover:text-primary transition-colors hover:cursor-pointer"
            >
              What We Build
            </button>
            <button
              onClick={() => scrollToSection("approach")}
              className="hover:text-primary transition-colors hover:cursor-pointer"
            >
              Approach
            </button>
            <DarkModeToggle />
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:cursor-pointer"
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <DarkModeToggle />
            {/* Future: MobileNav toggle button here */}
          </div>
        </div>

        {/* Mobile Navigation (to be added) */}
        {/* <MobileNav /> */}
      </div>
    </nav>
  );
};

export default Navbar;
