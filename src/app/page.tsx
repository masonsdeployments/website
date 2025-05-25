"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Users, Zap, ChevronDown } from "lucide-react";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { LogoSvg } from "@/components/LogoSvg";

export default function Home() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NAV_HEIGHT = 72; // px, adjust if your nav height changes
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y =
        el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT - 8; // 8px extra space
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 60
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : ""
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold font-mono">
              <span className="gradient-text">
                <LogoSvg className="text-primary" width={60} height={60} />
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("mission")}
                className="hover:text-primary transition-colors"
              >
                Mission
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="hover:text-primary transition-colors"
              >
                What We Build
              </button>
              <button
                onClick={() => scrollToSection("approach")}
                className="hover:text-primary transition-colors"
              >
                Approach
              </button>
              <DarkModeToggle />
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get in Touch
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <DarkModeToggle />
            </div>
          </div>

          {/* Mobile Navigation */}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative hero-gradient">
        <div className="container mx-auto px-6 text-center">
          <Badge variant="secondary" className="mb-6 font-mono">
            Tech that gives a damn
          </Badge>

          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
            We build tools that
            <br />
            <span className="gradient-text font-serif not-italic">
              solve real problems
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            A collective of builders, thinkers, and makers creating technology
            with zero bullshit and full intention. From AI-driven mental health
            to human-centered platforms — we craft systems that empower people.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("services")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-3"
            >
              Explore Our Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("mission")}
              className="text-lg px-8 py-3"
            >
              Our Mission
            </Button>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("mission")}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </button>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 bg-card/30 scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Built on{" "}
              <span className="gradient-text font-serif not-italic">
                empathy
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
              We believe great products start with understanding people. Every
              line of code we write, every interface we design, every system we
              architect — it all begins with empathy.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <Card className="glass-card">
                <CardContent className="p-8 text-center">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Human-Centered</h3>
                  <p className="text-muted-foreground">
                    Every decision starts with the people who will use our
                    creations.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-8 text-center">
                  <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Zero Bullshit</h3>
                  <p className="text-muted-foreground">
                    We cut through the noise to build what actually matters.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">
                    Collective Impact
                  </h3>
                  <p className="text-muted-foreground">
                    Together, we&apos;re stronger than the sum of our parts.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What We Build Section */}
      <section id="services" className="py-20 bg-background scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              What we{" "}
              <span className="gradient-text font-serif not-italic">build</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From concept to deployment, we create technology that makes a
              meaningful difference in people&apos;s lives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="glass-card hover:bg-card/70 transition-all duration-300">
              <CardContent className="p-8">
                <Badge variant="secondary" className="mb-4 font-mono">
                  AI & Mental Health
                </Badge>
                <h3 className="text-2xl font-semibold mb-4">
                  Empathetic AI Systems
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We develop AI-driven mental health platforms that understand
                  context, emotion, and individual needs. Our systems provide
                  support that feels genuinely human.
                </p>
                <Button variant="outline" className="group">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card hover:bg-card/70 transition-all duration-300">
              <CardContent className="p-8">
                <Badge variant="secondary" className="mb-4 font-mono">
                  Human-Centered Platforms
                </Badge>
                <h3 className="text-2xl font-semibold mb-4">
                  Intuitive Interfaces
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We design and build platforms that feel natural to use. Every
                  interaction is crafted to reduce friction and increase
                  understanding between humans and technology.
                </p>
                <Button variant="outline" className="group">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card hover:bg-card/70 transition-all duration-300">
              <CardContent className="p-8">
                <Badge variant="secondary" className="mb-4 font-mono">
                  Systems Architecture
                </Badge>
                <h3 className="text-2xl font-semibold mb-4">
                  Scalable Infrastructure
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We architect systems that grow with your needs while
                  maintaining performance and reliability. Built for the long
                  term, designed for real-world usage.
                </p>
                <Button variant="outline" className="group">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card hover:bg-card/70 transition-all duration-300">
              <CardContent className="p-8">
                <Badge variant="secondary" className="mb-4 font-mono">
                  Product Strategy
                </Badge>
                <h3 className="text-2xl font-semibold mb-4">
                  Thoughtful Development
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We help you navigate from idea to impact. Our strategic
                  approach ensures every feature serves a purpose and every
                  launch creates genuine value.
                </p>
                <Button variant="outline" className="group">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="py-20 bg-card/30 scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Our{" "}
              <span className="gradient-text font-serif not-italic">
                approach
              </span>
            </h2>

            <div className="text-left mt-16 space-y-12">
              <div className="border-l-4 border-primary pl-8">
                <h3 className="text-2xl font-semibold mb-4 font-mono">
                  01. Listen First
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Before we write a single line of code, we listen. We
                  understand your users, your challenges, and your vision. This
                  foundation shapes everything that follows.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-8">
                <h3 className="text-2xl font-semibold mb-4 font-mono">
                  02. Design with Intent
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Every feature exists for a reason. We design systems that
                  solve real problems, not just showcase cool technology.
                  Purpose drives every decision.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-8">
                <h3 className="text-2xl font-semibold mb-4 font-mono">
                  03. Build to Last
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We craft code like we&apos;re building cathedrals — with
                  attention to detail, structural integrity, and the
                  understanding that others will inherit our work.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-8">
                <h3 className="text-2xl font-semibold mb-4 font-mono">
                  04. Iterate with Empathy
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We test, learn, and improve. But we never lose sight of the
                  humans using our creations. Every iteration brings us closer
                  to meaningful impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 scroll-mt-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Ready to build something that{" "}
              <span className="gradient-text font-serif not-italic">
                matters?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Whether you have a clear vision or just a burning problem that
              needs solving, we&apos;d love to hear from you. Let&apos;s create
              technology that makes a difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-3"
              >
                Start a Conversation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                View Our Work
              </Button>
            </div>

            <div className="mt-16 pt-8 border-t border-border">
              <p className="text-muted-foreground font-mono">
                seifzellaban@gmail.com • We&apos;re not just writing code —
                we&apos;re building systems that empower people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card/50 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold font-mono mb-4 md:mb-0">
              <span className="gradient-text flex flex-row justify-center items-center gap-3 text-primary font-serif">
                <LogoSvg className="text-primary" width={60} height={60} />
                Masons
              </span>
            </div>
            <p className="text-muted-foreground text-center md:text-right">
              © 2024 Masons. Built with empathy, deployed with purpose.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
