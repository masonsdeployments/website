"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LenisProvider, useLenis } from "@/components/providers/LenisProvider";

// Layout components
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Section components
import { HeroSection } from "@/components/sections/Hero";
import { TrustedBySection } from "@/components/sections/TrustedBySection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { StaggerTestimonials } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";

function HomeContent() {
  const searchParams = useSearchParams();
  const { scrollTo } = useLenis();

  useEffect(() => {
    const section = searchParams.get("scrollTo");
    if (section) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          scrollTo(el, { offset: -80 });
        }
      }, 100);
    }
  }, [searchParams, scrollTo]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Trusted By / Social Proof */}
      <TrustedBySection />

      {/* Features Section (Why Choose Us) */}
      <FeaturesSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Testimonials - Kept as-is */}
      <section id="testimonials" className="scroll-mt-24">
        <StaggerTestimonials />
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <LenisProvider>
      <HomeContent />
    </LenisProvider>
  );
}
