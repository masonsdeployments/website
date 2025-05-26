"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import {
  Mail,
  MapPin,
  // Clock,
  MessageCircle,
  Briefcase,
  Users,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Contact method card component
interface ContactMethod {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  href?: string;
}

const ContactMethodCard = ({ method }: { method: ContactMethod }) => (
  <Card className="p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg h-full">
    <CardContent className="p-0 space-y-4 text-center">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
        {method.icon}
      </div>
      <h3 className="text-xl font-bold">{method.title}</h3>
      <p className="text-muted-foreground">{method.description}</p>
      {method.href ? (
        <Button asChild variant="outline" className="w-full">
          <a href={method.href}>{method.action}</a>
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          {method.action}
        </Button>
      )}
    </CardContent>
  </Card>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, projectType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Card className="p-8">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your company (optional)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectType">Project Type</Label>
              <Select
                value={formData.projectType}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  <SelectItem value="web-development">
                    Web Development
                  </SelectItem>
                  <SelectItem value="ai-integration">AI Integration</SelectItem>
                  <SelectItem value="system-architecture">
                    System Architecture
                  </SelectItem>
                  <SelectItem value="product-design">Product Design</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your project, timeline, and what you're hoping to achieve..."
              className="min-h-[120px]"
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            Start the Conversation
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            We typically respond within 24 hours. No spam, no pushy sales calls.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

// Hero section component
const HeroSection = () => (
  <section className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
    <h1 className="text-4xl md:text-6xl font-bold mb-12">
      Let&apos;s start a{" "}
      <span className="gradient-text font-serif not-italic">conversation</span>
    </h1>

    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
      Got an idea that needs building? A problem that needs solving? Or just
      want to chat about what&apos;s possible?
    </p>

    <p className="text-lg text-muted-foreground leading-relaxed">
      We believe the best projects start with genuine conversations. No pitch
      decks, no lengthy proposals—just real talk about real solutions.
    </p>
  </section>
);

// Contact methods section
const ContactMethodsSection = () => {
  const contactMethods: ContactMethod[] = [
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email Us",
      description: "Drop us a line anytime. We read every message personally.",
      action: "wearemasonsteam@gmail.com",
      href: "mailto:wearemasonsteam@gmail.com",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      title: "Quick Chat",
      description: "Schedule a 15-minute call to discuss your project.",
      action: "Book a Call",
      href: "#", // You'd replace this with your actual booking link
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Visit Us",
      description: "We're based in Cairo, but work with teams globally.",
      action: "Get Directions",
    },
  ];

  return (
    <section className="flex flex-col items-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
        Ways to{" "}
        <span className="gradient-text font-serif not-italic">connect</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto mb-16">
        {contactMethods.map((method, i) => (
          <ContactMethodCard key={i} method={method} />
        ))}
      </div>
    </section>
  );
};

// Project types section
const ProjectTypesSection = () => {
  const projectTypes = [
    {
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      title: "New Product Development",
      description:
        "From concept to launch, we help bring your ideas to life with thoughtful technology choices.",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Team Augmentation",
      description:
        "Need extra hands? We integrate seamlessly with your existing team and processes.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      title: "Technical Consulting",
      description:
        "Architecture reviews, technology audits, and strategic guidance for your tech decisions.",
    },
  ];

  return (
    <section className="bg-muted/20 rounded-2xl p-8 md:p-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        How we typically help
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {projectTypes.map((type, i) => (
          <div key={i} className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              {type.icon}
            </div>
            <h3 className="font-semibold">{type.title}</h3>
            <p className="text-sm text-muted-foreground">{type.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Main contact page component
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground mt-24">
      <Navbar />

      <main className="container mx-auto px-6 py-12 md:py-20 space-y-16 md:space-y-24">
        <HeroSection />
        <ContactMethodsSection />

        <section className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Tell us about your{" "}
            <span className="gradient-text font-serif not-italic">project</span>
          </h2>
          <ContactForm />
        </section>

        <ProjectTypesSection />

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Common{" "}
            <span className="gradient-text font-serif not-italic">
              questions
            </span>
          </h2>

          <div className="space-y-6">
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="font-semibold mb-3">
                  How do you typically work with clients?
                </h3>
                <p className="text-muted-foreground">
                  We start with a discovery conversation to understand your
                  goals, then propose a collaborative approach. We believe in
                  transparent communication, regular check-ins, and building
                  solutions together rather than in isolation.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="font-semibold mb-3">
                  What&apos;s your typical project timeline?
                </h3>
                <p className="text-muted-foreground">
                  It depends on scope, but most projects range from 6-16 weeks.
                  We prefer working in focused sprints so you can see progress
                  quickly and provide feedback along the way.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="font-semibold mb-3">
                  Do you work with early-stage startups?
                </h3>
                <p className="text-muted-foreground">
                  Absolutely. We love working with founders who are solving real
                  problems. We can help validate ideas, build MVPs, and scale
                  when you&apos;re ready to grow.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
