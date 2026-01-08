"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseGSAPOptions {
  scope?: React.RefObject<HTMLElement | null>;
  dependencies?: unknown[];
}

/**
 * Custom hook for GSAP animations with automatic cleanup
 */
export function useGSAP(
  callback: (gsap: typeof import("gsap").gsap) => void,
  options: UseGSAPOptions = {}
) {
  const { scope, dependencies = [] } = options;
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // Create a GSAP context for automatic cleanup
    ctx.current = gsap.context(() => {
      callback(gsap);
    }, scope?.current || undefined);

    return () => {
      ctx.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

/**
 * Preset animation: Fade up on scroll
 */
export function fadeUpOnScroll(
  element: string | HTMLElement | HTMLElement[],
  options: {
    delay?: number;
    duration?: number;
    y?: number;
    stagger?: number;
    start?: string;
  } = {}
) {
  const {
    delay = 0,
    duration = 0.8,
    y = 60,
    stagger = 0.1,
    start = "top 85%",
  } = options;

  gsap.fromTo(
    element,
    {
      opacity: 0,
      y,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none reverse",
      },
    }
  );
}

/**
 * Preset animation: Staggered children reveal
 */
export function staggerChildren(
  container: string | HTMLElement,
  childSelector: string,
  options: {
    delay?: number;
    duration?: number;
    y?: number;
    stagger?: number;
    start?: string;
  } = {}
) {
  const {
    delay = 0,
    duration = 0.6,
    y = 40,
    stagger = 0.1,
    start = "top 80%",
  } = options;

  gsap.fromTo(
    `${container instanceof HTMLElement ? "" : container} ${childSelector}`,
    {
      opacity: 0,
      y,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: "play none none reverse",
      },
    }
  );
}

/**
 * Preset animation: Scale in on scroll
 */
export function scaleInOnScroll(
  element: string | HTMLElement,
  options: {
    delay?: number;
    duration?: number;
    scale?: number;
    start?: string;
  } = {}
) {
  const { delay = 0, duration = 0.8, scale = 0.8, start = "top 85%" } = options;

  gsap.fromTo(
    element,
    {
      opacity: 0,
      scale,
    },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none reverse",
      },
    }
  );
}

/**
 * Preset animation: Parallax effect
 */
export function parallax(
  element: string | HTMLElement,
  options: {
    yPercent?: number;
    start?: string;
    end?: string;
  } = {}
) {
  const { yPercent = -20, start = "top bottom", end = "bottom top" } = options;

  gsap.to(element, {
    yPercent,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: true,
    },
  });
}

/**
 * Preset animation: Text reveal character by character
 */
export function textReveal(
  element: string | HTMLElement,
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  } = {}
) {
  const {
    delay = 0,
    duration = 0.05,
    stagger = 0.02,
    start = "top 85%",
  } = options;

  // Split text into spans for each character
  const el =
    typeof element === "string" ? document.querySelector(element) : element;
  if (!el) return;

  const text = el.textContent || "";
  el.innerHTML = text
    .split("")
    .map(
      (char) => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`
    )
    .join("");

  gsap.fromTo(
    el.querySelectorAll(".char"),
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none reverse",
      },
    }
  );
}

export { gsap, ScrollTrigger };
