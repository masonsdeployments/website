"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useIsRtl } from "@/hooks/use-rtl";
import { useLenis } from "@/components/providers/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const isRtl = useIsRtl();
  const { scrollTo } = useLenis();

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      toast.success(t("contactMethods.email.copiedToast"));
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.open(`mailto:${site.email}`, "_blank", "noopener,noreferrer");
    }
  };

  const handleJumpToForm = (presetType?: string) => {
    if (presetType) {
      setFormData((prev) => ({ ...prev, projectType: presetType }));
    }
    const el = document.getElementById("contact-form");
    if (el) {
      scrollTo(el, { offset: -96 });
    }
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
        toast.success(t("form.successTitle"), {
          description: t("form.successDescription"),
        });
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "",
          message: "",
        });
      } else {
        toast.error(t("form.errorTitle"), {
          description: data.error || "Failed to send message.",
        });
      }
    } catch (error) {
      toast.error(t("form.networkErrorTitle"), {
        description: t("form.networkErrorDescription"),
      });
      console.error(error);
    }

    setLoading(false);
  };

  const projectTypes = [
    {
      index: "01",
      icon: Briefcase,
      title: t("projectTypes.newProduct.title"),
      description: t("projectTypes.newProduct.description"),
    },
    {
      index: "02",
      icon: Users,
      title: t("projectTypes.teamAugmentation.title"),
      description: t("projectTypes.teamAugmentation.description"),
    },
    {
      index: "03",
      icon: MessageCircle,
      title: t("projectTypes.consulting.title"),
      description: t("projectTypes.consulting.description"),
    },
  ];

  const faqs = [
    { index: "01", q: t("faq.q1.question"), a: t("faq.q1.answer") },
    { index: "02", q: t("faq.q2.question"), a: t("faq.q2.answer") },
    { index: "03", q: t("faq.q3.question"), a: t("faq.q3.answer") },
  ];

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-background text-foreground"
    >
      <Navbar />

      <main
        id="main-content"
        className="mx-auto max-w-7xl px-5 pt-28 pb-20 sm:px-6 sm:pt-36 sm:pb-24 lg:px-8"
      >
        {/* Hero */}
        <header className="grid grid-cols-1 gap-5 border-b border-border/50 pb-10 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <span className="font-mono text-[11px] text-primary">01</span>
              <span aria-hidden className="text-border">
                /
              </span>
              <span>{t("kicker")}</span>
            </p>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.03] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
              {t("heroHeadlineStart")}{" "}
              <span className="gradient-text font-serif">
                {t("heroHeadlineSerif")}
              </span>
            </h1>
          </div>

          <div
            className={cn(
              "max-w-md space-y-2 text-base leading-relaxed text-muted-foreground md:col-span-5 md:justify-self-end",
              isRtl ? "md:text-left" : "md:text-right"
            )}
          >
            <p>{t("heroDescription1")}</p>
            <p>{t("heroDescription2")}</p>
          </div>
        </header>

        {/* Contact Methods */}
        <section className="mt-12 grid gap-5 md:grid-cols-3">
          {/* Email card */}
          <article className="glass-card-hover flex flex-col justify-between rounded-2xl p-6 sm:p-7">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="font-mono text-[11px] text-muted-foreground/80">
                  01
                </span>
              </div>
              <h2 className="mt-5 font-serif text-xl font-bold text-foreground">
                {t("contactMethods.email.title")}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {t("contactMethods.email.description")}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-border/50 pt-4">
              <a
                href={`mailto:${site.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-colors hover:bg-primary/90"
              >
                <span>{t("contactMethods.email.openAction")}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label={t("contactMethods.email.copyAction")}
                className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </article>

          {/* Quick Call card */}
          <article className="glass-card-hover flex flex-col justify-between rounded-2xl p-6 sm:p-7">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <span className="font-mono text-[11px] text-muted-foreground/80">
                  02
                </span>
              </div>
              <h2 className="mt-5 font-serif text-xl font-bold text-foreground">
                {t("contactMethods.chat.title")}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {t("contactMethods.chat.description")}
              </p>
            </div>

            <div className="mt-6 border-t border-border/50 pt-4">
              <button
                type="button"
                onClick={() => handleJumpToForm("consulting")}
                className="inline-flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <span>{t("contactMethods.chat.action")}</span>
              </button>
            </div>
          </article>

          {/* Location card */}
          <article className="glass-card-hover flex flex-col justify-between rounded-2xl p-6 sm:p-7">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="font-mono text-[11px] text-muted-foreground/80">
                  03
                </span>
              </div>
              <h2 className="mt-5 font-serif text-xl font-bold text-foreground">
                {t("contactMethods.visit.title")}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {t("contactMethods.visit.description")}
              </p>
            </div>

            <div className="mt-6 border-t border-border/50 pt-4">
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <span>{t("contactMethods.visit.action")}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </article>
        </section>

        {/* Form Section */}
        <section
          id="contact-form"
          className="mt-20 scroll-mt-28 border-t border-border/50 pt-16 sm:mt-24 sm:pt-20"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <span className="font-mono text-[11px] text-primary">02</span>
                <span aria-hidden className="text-border">
                  /
                </span>
                <span>{t("formKicker")}</span>
              </p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-[1.03] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
                {t("formHeadlineStart")}{" "}
                <span className="gradient-text font-serif">
                  {t("formHeadlineSerif")}
                </span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                {t("form.disclaimer")}
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="surface-card rounded-2xl p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-foreground"
                      >
                        {t("form.nameLabel")}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t("form.namePlaceholder")}
                        className="h-11 rounded-xl bg-background/75 text-base"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-foreground"
                      >
                        {t("form.emailLabel")}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t("form.emailPlaceholder")}
                        className="h-11 rounded-xl bg-background/75 text-base"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="company"
                        className="text-sm font-medium text-foreground"
                      >
                        {t("form.companyLabel")}
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder={t("form.companyPlaceholder")}
                        className="h-11 rounded-xl bg-background/75 text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="projectType"
                        className="text-sm font-medium text-foreground"
                      >
                        {t("form.projectTypeLabel")}
                      </Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={handleSelectChange}
                      >
                        <SelectTrigger
                          id="projectType"
                          className="h-11 w-full rounded-xl bg-background/75 text-base"
                        >
                          <SelectValue
                            placeholder={t("form.projectTypePlaceholder")}
                          />
                        </SelectTrigger>
                        <SelectContent className="glass-surface z-[100] rounded-xl">
                          <SelectItem value="web-development">
                            {t("form.projectTypes.webDevelopment")}
                          </SelectItem>
                          <SelectItem value="ai-integration">
                            {t("form.projectTypes.aiIntegration")}
                          </SelectItem>
                          <SelectItem value="system-architecture">
                            {t("form.projectTypes.systemArchitecture")}
                          </SelectItem>
                          <SelectItem value="product-design">
                            {t("form.projectTypes.productDesign")}
                          </SelectItem>
                          <SelectItem value="consulting">
                            {t("form.projectTypes.consulting")}
                          </SelectItem>
                          <SelectItem value="other">
                            {t("form.projectTypes.other")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium text-foreground"
                    >
                      {t("form.messageLabel")}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t("form.messagePlaceholder")}
                      className="min-h-[140px] rounded-xl bg-background/75 text-base"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="btn-animate min-h-[48px] w-full cursor-pointer rounded-full text-sm font-medium shadow-md shadow-primary/20"
                  >
                    {loading ? t("form.submittingButton") : t("form.submitButton")}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* How We Help */}
        <section className="mt-20 border-t border-border/50 pt-16 sm:mt-24 sm:pt-20">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <span className="font-mono text-[11px] text-primary">03</span>
            <span aria-hidden className="text-border">
              /
            </span>
            <span>{t("projectTypesKicker")}</span>
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-[1.03] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
            {t("projectTypesHeadline")}
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {projectTypes.map((type) => {
              const Icon = type.icon;
              return (
                <article
                  key={type.index}
                  className="glass-card-hover rounded-2xl p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground/80">
                      {type.index}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-foreground">
                    {type.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {type.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20 border-t border-border/50 pt-16 sm:mt-24 sm:pt-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <span className="font-mono text-[11px] text-primary">04</span>
                <span aria-hidden className="text-border">
                  /
                </span>
                <span>{t("faqKicker")}</span>
              </p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-[1.03] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
                {t("faqHeadlineStart")}{" "}
                <span className="gradient-text font-serif">
                  {t("faqHeadlineSerif")}
                </span>
              </h2>
            </div>

            <div className="space-y-4 lg:col-span-7">
              {faqs.map((item) => (
                <article
                  key={item.index}
                  className="surface-card rounded-2xl p-6"
                >
                  <p className="font-mono text-[11px] text-primary">
                    {item.index}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-semibold text-foreground">
                    {item.q}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
