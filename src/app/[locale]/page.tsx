"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLenis } from "@/components/providers/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/Hero";
import { TrustedBySection } from "@/components/sections/TrustedBySection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { StaggerTestimonials } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  const searchParams = useSearchParams();
  const { scrollTo } = useLenis();

  useEffect(() => {
    const section = searchParams.get("scrollTo");
    if (section) {
      const timer = window.setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          scrollTo(el, { offset: -88 });
        }
      }, 120);
      return () => window.clearTimeout(timer);
    }
  }, [searchParams, scrollTo]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <TrustedBySection />
        <FeaturesSection />
        <ProjectsSection />
        <HowItWorksSection />
        <StaggerTestimonials />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
