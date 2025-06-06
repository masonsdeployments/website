"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useState, useEffect } from "react";
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
import { toast } from "sonner";
import { useTranslations } from "next-intl";

// RTL utility hook
const useRTL = () => {
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    setIsRtl(document.body.getAttribute("data-rtl") === "true");
    const observer = new MutationObserver(() => {
      setIsRtl(document.body.getAttribute("data-rtl") === "true");
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-rtl"],
    });

    return () => observer.disconnect();
  }, []);

  return isRtl;
};

interface ContactMethod {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  href?: string;
}

const ContactMethodCard = ({ method }: { method: ContactMethod }) => {
  const isRtl = useRTL();
  
  return (
  <Card className="p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg h-full min-h-[250px] md:min-h-auto">
    <CardContent className="p-0 space-y-4 text-center">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
        {method.icon}
      </div>
      <h3 className={`text-xl font-bold ${isRtl ? 'font-arabic' : ''}`}>{method.title}</h3>
      <p className={`text-muted-foreground ${isRtl ? 'font-arabic' : ''}`}>{method.description}</p>
      {method.href ? (
        <Button asChild variant="outline" className={`w-full ${isRtl ? 'font-arabic' : ''}`}>
          <a href={method.href}>{method.action}</a>
        </Button>
      ) : (
        <Button variant="outline" className={`w-full ${isRtl ? 'font-arabic' : ''}`}>
          {method.action}
        </Button>
      )}
    </CardContent>
  </Card>
  );
};

const ContactForm = () => {
  const t = useTranslations("ContactPage.form");
  const isRtl = useRTL();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, projectType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(t("successTitle"), {
          description: t("successDescription"),
        });
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "",
          message: "",
        });
      } else {
        toast.error(t("errorTitle"), {
          description: data.error || "Something went wrong.",
        });
      }
    } catch (error) {
      toast.error(t("networkErrorTitle"), {
        description: t("networkErrorDescription"),
      });
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <Card className="p-8" dir={isRtl ? "rtl" : "ltr"}>
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className={`${isRtl ? 'font-arabic text-right' : 'text-left'}`}>{t("nameLabel")}</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t("namePlaceholder")}
                className={`${isRtl ? 'font-arabic text-right' : 'text-left'}`}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className={`${isRtl ? 'font-arabic text-right' : 'text-left'}`}>{t("emailLabel")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t("emailPlaceholder")}
                className={`${isRtl ? 'font-arabic text-right' : 'text-left'}`}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className={`${isRtl ? 'font-arabic text-right' : 'text-left'}`}>{t("companyLabel")}</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder={t("companyPlaceholder")}
                className={`${isRtl ? 'font-arabic text-right' : 'text-left'}`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectType" className={`${isRtl ? 'font-arabic text-right' : 'text-left'}`}>{t("projectTypeLabel")}</Label>
              <Select
                value={formData.projectType}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className={`w-full ${isRtl ? 'font-arabic text-right' : 'text-left'}`}>
                  <SelectValue placeholder={t("projectTypePlaceholder")} />
                </SelectTrigger>
                <SelectContent className={`z-[100] ${isRtl ? 'font-arabic' : ''}`}>
                  <SelectItem value="web-development">
                    {t("projectTypes.webDevelopment")}
                  </SelectItem>
                  <SelectItem value="ai-integration">{t("projectTypes.aiIntegration")}</SelectItem>
                  <SelectItem value="system-architecture">
                    {t("projectTypes.systemArchitecture")}
                  </SelectItem>
                  <SelectItem value="product-design">{t("projectTypes.productDesign")}</SelectItem>
                  <SelectItem value="consulting">{t("projectTypes.consulting")}</SelectItem>
                  <SelectItem value="other">{t("projectTypes.other")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className={`${isRtl ? 'font-arabic text-right' : 'text-left'}`}>{t("messageLabel")}</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={t("messagePlaceholder")}
              className={`min-h-[120px] ${isRtl ? 'font-arabic text-right' : 'text-left'}`}
              required
            />
          </div>

          <Button type="submit" size="lg" className={`w-full ${isRtl ? 'font-arabic' : ''}`} disabled={true}>
            {loading ? t("submittingButton") : t("submitButton")}
          </Button>

          <p className={`text-sm text-muted-foreground text-center ${isRtl ? 'font-arabic' : ''}`}>
            {t("disclaimer")}
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

// Hero section component
const HeroSection = () => {
  const t = useTranslations("ContactPage");
  const isRtl = useRTL();
  
  return (
    <section className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto" dir={isRtl ? "rtl" : "ltr"}>
      <h1 className={`text-4xl md:text-6xl font-bold mb-12 ${isRtl ? 'font-arabic' : ''}`}>
        {t("heroHeadlineStart")}{" "}
        <span className="gradient-text font-serif not-italic">{t("heroHeadlineSerif")}</span>
      </h1>

      <p className={`text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 ${isRtl ? 'font-arabic' : ''}`}>
        {t("heroDescription1")}
      </p>

      <p className={`text-lg text-muted-foreground leading-relaxed ${isRtl ? 'font-arabic' : ''}`}>
        {t("heroDescription2")}
      </p>
    </section>
  );
};

// Contact methods section
const ContactMethodsSection = () => {
  const t = useTranslations("ContactPage");
  const isRtl = useRTL();
  
  const contactMethods: ContactMethod[] = [
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: t("contactMethods.email.title"),
      description: t("contactMethods.email.description"),
      action: t("contactMethods.email.action"),
      href: "mailto:wearemasonsteam@gmail.com",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      title: t("contactMethods.chat.title"),
      description: t("contactMethods.chat.description"),
      action: t("contactMethods.chat.action"),
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: t("contactMethods.visit.title"),
      description: t("contactMethods.visit.description"),
      action: t("contactMethods.visit.action"),
    },
  ];

  return (
    <section className="flex flex-col items-center" dir={isRtl ? "rtl" : "ltr"}>
      <h2 className={`text-3xl md:text-5xl font-bold mb-12 text-center ${isRtl ? 'font-arabic' : ''}`}>
        {t("contactMethodsHeadlineStart")}{" "}
        <span className="gradient-text font-serif not-italic">{t("contactMethodsHeadlineSerif")}</span>
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
  const t = useTranslations("ContactPage");
  const isRtl = useRTL();
  
  const projectTypes = [
    {
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      title: t("projectTypes.newProduct.title"),
      description: t("projectTypes.newProduct.description"),
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: t("projectTypes.teamAugmentation.title"),
      description: t("projectTypes.teamAugmentation.description"),
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      title: t("projectTypes.consulting.title"),
      description: t("projectTypes.consulting.description"),
    },
  ];

  return (
    <section className="bg-muted/30 rounded-2xl p-8 md:p-12" dir={isRtl ? "rtl" : "ltr"}>
      <h2 className={`text-2xl md:text-3xl font-bold mb-8 text-center ${isRtl ? 'font-arabic' : ''}`}>
        {t("projectTypesHeadline")}
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {projectTypes.map((type, i) => (
          <div key={i} className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              {type.icon}
            </div>
            <h3 className={`font-semibold ${isRtl ? 'font-arabic' : ''}`}>{type.title}</h3>
            <p className={`text-sm text-muted-foreground ${isRtl ? 'font-arabic' : ''}`}>{type.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Form headline component
const FormHeadline = () => {
  const t = useTranslations("ContactPage");
  const isRtl = useRTL();
  
  return (
    <span className={isRtl ? 'font-arabic' : ''}>
      {t("formHeadlineStart")}{" "}
      <span className="gradient-text font-serif not-italic">{t("formHeadlineSerif")}</span>
    </span>
  );
};

// FAQ Section component
const FAQSection = () => {
  const t = useTranslations("ContactPage");
  const isRtl = useRTL();
  
  return (
    <section className="max-w-4xl mx-auto" dir={isRtl ? "rtl" : "ltr"}>
      <h2 className={`text-3xl md:text-4xl font-bold mb-12 text-center ${isRtl ? 'font-arabic' : ''}`}>
        {t("faqHeadlineStart")}{" "}
        <span className="gradient-text font-serif not-italic">
          {t("faqHeadlineSerif")}
        </span>
      </h2>

      <div className="space-y-6">
        <Card className="p-6 min-h-[200px] md:min-h-auto">
          <CardContent className="p-0">
            <h3 className={`font-semibold mb-3 ${isRtl ? 'font-arabic text-right' : 'text-left'}`}>
              {t("faq.q1.question")}
            </h3>
            <p className={`text-muted-foreground ${isRtl ? 'font-arabic text-right' : 'text-left'}`}>
              {t("faq.q1.answer")}
            </p>
          </CardContent>
        </Card>

        <Card className="p-6 min-h-[200px] md:min-h-auto">
          <CardContent className="p-0">
            <h3 className={`font-semibold mb-3 ${isRtl ? 'font-arabic text-right' : 'text-left'}`}>
              {t("faq.q2.question")}
            </h3>
            <p className={`text-muted-foreground ${isRtl ? 'font-arabic text-right' : 'text-left'}`}>
              {t("faq.q2.answer")}
            </p>
          </CardContent>
        </Card>

        <Card className="p-6 min-h-[200px] md:min-h-auto">
          <CardContent className="p-0">
            <h3 className={`font-semibold mb-3 ${isRtl ? 'font-arabic text-right' : 'text-left'}`}>
              {t("faq.q3.question")}
            </h3>
            <p className={`text-muted-foreground ${isRtl ? 'font-arabic text-right' : 'text-left'}`}>
              {t("faq.q3.answer")}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

// Main contact page component
export default function ContactPage() {
  const isRtl = useRTL();

  return (
    <div className="min-h-screen bg-background text-foreground mt-24" dir={isRtl ? "rtl" : "ltr"}>
      <Navbar />

      <main className="container mx-auto px-6 py-12 md:py-20 space-y-16 md:space-y-24">
        <HeroSection />
        <ContactMethodsSection />

        <section className="max-w-4xl mx-auto" dir={isRtl ? "rtl" : "ltr"}>
          <h2 className={`text-3xl md:text-4xl font-bold mb-8 text-center ${isRtl ? 'font-arabic' : ''}`}>
            <FormHeadline />
          </h2>
          <ContactForm />
        </section>

        <ProjectTypesSection />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
