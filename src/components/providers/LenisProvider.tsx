"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LenisContextType {
  getLenis: () => Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: object) => void;
  stop: () => void;
  start: () => void;
}

const LenisContext = createContext<LenisContextType>({
  getLenis: () => null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useLenis = () => useContext(LenisContext);

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.length > 1 && href.startsWith("#")) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: -88,
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: object) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset: -88,
          ...options,
        });
        return;
      }

      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else if (target instanceof HTMLElement) {
        const y = target.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    []
  );

  const getLenis = useCallback(() => lenisRef.current, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const value = useMemo(
    () => ({ getLenis, scrollTo, stop, start }),
    [getLenis, scrollTo, stop, start]
  );

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}
