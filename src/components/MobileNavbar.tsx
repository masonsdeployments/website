"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
// import { LogoSvg } from "./LogoSvg";

const NAV_HEIGHT = 72;

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y =
        el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT - 8;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleNav = (sectionId: string) => {
    setIsOpen(false);
    if (pathname !== "/") {
      router.push(`/?scrollTo=${sectionId}`);
    } else {
      scrollToSection(sectionId);
    }
  };

  const handleRouteClick = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  const handleClickHome = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);

    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex justify-center items-center">
        <Menu className="text-[48px] text-primary" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

        {/* <div className="pl-3 pt-3">
          <Link href="/">
            <span className="text-primary">
              <LogoSvg />
            </span>
          </Link>
        </div> */}
        <div className="mt-32 mb-40 text-center text-2xl">
          <nav className="flex flex-col justify-center items-center gap-8">
            <button
              onClick={handleClickHome}
              className="text-xl hover:text-accent-hover transition-all"
            >
              Home
            </button>
            <button
              onClick={() => handleNav("mission")}
              className="text-xl hover:text-accent-hover transition-all"
            >
              Mission
            </button>
            <button
              onClick={() => handleNav("services")}
              className="text-xl hover:text-accent-hover transition-all"
            >
              What We Build
            </button>
            <button
              onClick={() => handleNav("approach")}
              className="text-xl hover:text-accent-hover transition-all"
            >
              Approach
            </button>
            <button
              onClick={() => handleRouteClick("/about")}
              className="text-xl hover:text-accent-hover transition-all"
            >
              About Us
            </button>
            <Button
              onClick={() => handleRouteClick("/contact")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Contact
            </Button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
