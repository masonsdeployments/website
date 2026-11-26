"use client";

import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroDemo2 } from "@/components/sections/HeroDemo2";
import { TrustedBySection } from "@/components/sections/TrustedBySection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { StaggerTestimonials } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { DemoSwitcher } from "@/components/demo/DemoSwitcher";

export default function Demo2Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="main-content">
        <HeroDemo2 />
        <TrustedBySection />
        <FeaturesSection />
        <ProjectsSection />
        <HowItWorksSection />
        <StaggerTestimonials />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <DemoSwitcher />
    </div>
  );
}
