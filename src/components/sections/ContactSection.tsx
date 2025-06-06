import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export const ContactSection = () => {
  const t = useTranslations("Contact");
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    // RTL detection
    setIsRtl(document.body.getAttribute("data-rtl") === "true");
    const observer = new MutationObserver(() => {
      setIsRtl(document.body.getAttribute("data-rtl") === "true");
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-rtl"],
    });
  }, []);

  return (
    <section id="contact" className="py-20 scroll-mt-24">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            {t("headlineStart")} <br /> {t("headlineBr")}
            <span className="gradient-text font-serif not-italic">
              {t("headlineSerif")}
            </span>
          </h2>

          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-3 hover:cursor-pointer"
            >
              <Link href="/contact">{t("startConversation")}</Link>
              {isRtl ? (
                <ArrowLeft className="ml-2 h-5 w-5" />
              ) : (
                <ArrowRight className="ml-2 h-5 w-5" />
              )}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-3 hover:cursor-pointer"
            >
              <Link href="/about">{t("meetTeam")}</Link>
            </Button>
          </div>

          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-muted-foreground font-mono">{t("footer")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
