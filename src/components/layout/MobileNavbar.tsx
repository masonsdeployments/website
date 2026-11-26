"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useIsRtl } from "@/hooks/use-rtl";
import { useLenis } from "@/components/providers/LenisProvider";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogoSvg } from "@/components/LogoSvg";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Navbar");
  const tBrand = useTranslations("Brand");
  const isRtl = useIsRtl();
  const { scrollTo, stop, start } = useLenis();

  useEffect(() => {
    if (isOpen) {
      stop();
    } else {
      start();
    }
    return () => start();
  }, [isOpen, stop, start]);

  const handleNav = (sectionId: string) => {
    setIsOpen(false);
    if (pathname === "/") {
      window.setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          scrollTo(el, { offset: -88 });
        }
      }, 120);
    } else {
      router.push(`/?scrollTo=${sectionId}`);
    }
  };

  const handleRouteClick = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  const items = [
    { index: "01", label: t("features"), action: () => handleNav("features") },
    { index: "02", label: t("projects"), action: () => handleNav("projects") },
    {
      index: "03",
      label: t("howItWorks"),
      action: () => handleNav("how-it-works"),
    },
    {
      index: "04",
      label: t("testimonials"),
      action: () => handleNav("testimonials"),
    },
    {
      index: "05",
      label: t("about"),
      action: () => handleRouteClick("/about"),
    },
    {
      index: "06",
      label: t("links"),
      action: () => handleRouteClick("/links"),
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open navigation menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/60 text-foreground backdrop-blur-md transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Menu className="h-4 w-4" />
        </button>
      </SheetTrigger>

      <SheetContent
        side={isRtl ? "left" : "right"}
        dir={isRtl ? "rtl" : "ltr"}
        className="glass flex flex-col justify-between border-border/60 p-6 sm:max-w-sm"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

        <div>
          <div className="flex items-center gap-3 border-b border-border/50 pb-5">
            <LogoSvg className="text-primary" width={36} height={36} />
            <div>
              <p className="font-serif text-lg font-bold leading-none text-foreground">
                {tBrand("name")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {site.location}
              </p>
            </div>
          </div>

          <nav aria-label="Mobile navigation" className="mt-6 flex flex-col">
            {items.map((item) => (
              <button
                key={item.index}
                type="button"
                onClick={item.action}
                className={cn(
                  "group flex items-center justify-between border-b border-border/40 py-3.5 text-start transition-colors hover:text-primary",
                  isRtl && "font-arabic"
                )}
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-muted-foreground group-hover:text-primary">
                    {item.index}
                  </span>
                  <span className="text-base font-medium text-foreground group-hover:text-primary">
                    {item.label}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 space-y-2.5 border-t border-border/50 pt-5">
          <button
            type="button"
            onClick={() => handleRouteClick("/contact")}
            className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-colors hover:bg-primary/90"
          >
            <span>{t("contactShort")}</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>

          <a
            href={site.studioUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-border/70 bg-background/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <span>{tBrand("studioName")}</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
