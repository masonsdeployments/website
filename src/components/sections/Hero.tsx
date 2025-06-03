import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-svh flex items-center justify-center relative hero-gradient"
    >
      <div className="container mx-auto px-6 text-center rounded-md">
        <Badge variant="secondary" className="mb-6 font-mono">
          Impact Without Compromise
        </Badge>
        <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
          We Turn Problems Into
          <span className="gradient-text font-serif not-italic">
            &nbsp;Possibilities
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          We&apos;re the collective behind AI systems that understand emotion,
          platforms that prevent disasters, and tools that turn recycling into
          profit. No vanity metrics. No empty promises. Just technology that
          solves problems that matter.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => scrollToSection("services")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-3 hover:cursor-pointer"
          >
            See Our Impact
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("contact")}
            className="text-lg px-8 py-3 hover:cursor-pointer"
          >
            Start Your Project
          </Button>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("mission")}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:cursor-pointer"
      >
        <ChevronDown className="h-8 w-8 text-muted-foreground" />
      </button>
    </section>
  );
};
