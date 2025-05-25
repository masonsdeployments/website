import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ContactSection = () => {
  return (
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
            Whether you have a clear vision or just a burning problem that needs
            solving, we&apos;d love to hear from you. Let&apos;s create
            technology that makes a difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-3 hover:cursor-pointer"
              disabled={true}
            >
              Start a Conversation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              disabled={true}
              size="lg"
              className="text-lg px-8 py-3 hover:cursor-pointer"
            >
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
  );
};
