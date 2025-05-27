"use client";
import { Suspense } from "react";
import { MissionSection } from "@/components/MissionSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ApproachSection } from "@/components/ApproachSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { StaggerTestimonials } from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
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
