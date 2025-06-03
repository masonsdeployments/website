"use client";
import { MissionSection } from "@/components/sections/MissionSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { StaggerTestimonials } from "@/components/sections/TestimonialsSection";

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const section = searchParams.get("scrollTo");
    if (section) {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Mission Section */}
      <MissionSection />

      {/* What We Build Section */}
      <ProjectsSection />

      {/* Approach Section */}
      <ApproachSection />

      <StaggerTestimonials />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
