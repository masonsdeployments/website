"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MessageSquare,
  Sparkles,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { useIsRtl } from "@/hooks/use-rtl";
import { useLenis } from "@/components/providers/LenisProvider";
import {
  buildMailtoHref,
  INQUIRY_OPTIONS,
  site,
  type InquiryOptionId,
} from "@/lib/site";
import { cn } from "@/lib/utils";

interface ProjectInquiryModalContextValue {
  isOpen: boolean;
  open: (defaultOption?: InquiryOptionId) => void;
  close: () => void;
}

const ProjectInquiryModalContext =
  createContext<ProjectInquiryModalContextValue>({
    isOpen: false,
    open: () => {},
    close: () => {},
  });

export function useProjectInquiryModal() {
  return useContext(ProjectInquiryModalContext);
}

export function ProjectInquiryModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<InquiryOptionId>("new-product");
  const [copied, setCopied] = useState(false);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const t = useTranslations("InquiryModal");
  const isRtl = useIsRtl();
  const prefersReducedMotion = useReducedMotion();
  const { stop, start } = useLenis();

  const open = useCallback((defaultOption?: InquiryOptionId) => {
    if (typeof document !== "undefined") {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
    }
    if (defaultOption) {
      setSelectedId(defaultOption);
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 20);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      start();
      lastFocusedRef.current?.focus();
    };
  }, [isOpen, stop, start]);

  const activeOption =
    INQUIRY_OPTIONS.find((item) => item.id === selectedId) ??
    INQUIRY_OPTIONS[0];
  const mailtoHref = buildMailtoHref(activeOption.subject);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      toast.success(t("copiedToast"));
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error(`${t("copyFallback")} ${site.email}`);
    }
  };

  return (
    <ProjectInquiryModalContext.Provider value={{ isOpen, open, close }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-inquiry-modal-title"
            dir={isRtl ? "rtl" : "ltr"}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              aria-hidden
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              onClick={close}
              className="fixed inset-0 bg-background/75 backdrop-blur-md"
            />

            <motion.div
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 16, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 10, scale: 0.98 }
              }
              transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
              data-lenis-prevent
              data-lenis-prevent-touch
              data-lenis-prevent-wheel
              className="glass-surface relative z-10 max-h-[88svh] w-full max-w-xl overflow-y-auto overscroll-contain rounded-2xl p-6 sm:p-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-border/50 pb-5">
                <div>
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    <span>{t("kickerLeft")}</span>
                    <span aria-hidden className="text-border">
                      /
                    </span>
                    <span className="text-primary">{t("kickerRight")}</span>
                  </p>
                  <h2
                    id="project-inquiry-modal-title"
                    className="mt-2 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                  >
                    {t("title")}
                  </h2>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
                    {t("subtitle")}
                  </p>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={close}
                  aria-label={t("closeLabel")}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scope options */}
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {t("scopeLabel")}
                </p>

                <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {INQUIRY_OPTIONS.map((option) => {
                    const selected = option.id === selectedId;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedId(option.id)}
                        aria-pressed={selected}
                        className={cn(
                          "group flex flex-col justify-between rounded-xl border p-4 text-start transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          selected
                            ? "border-primary bg-primary/10 text-foreground shadow-xs"
                            : "border-border/60 bg-background/55 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-foreground">
                            {t(`options.${option.id}.title`)}
                          </span>
                          <span className="text-xs font-medium text-primary">
                            {option.timeline}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {t(`options.${option.id}.description`)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-2.5 border-t border-border/50 pt-5">
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <a
                    href={mailtoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className="group btn-animate inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{t("emailAction")}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-border/70 bg-background/70 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-primary" />
                        <span>{t("copiedButton")}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-muted-foreground" />
                        <span>{t("copyButton")}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <Link
                    href="/contact"
                    onClick={close}
                    className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-border/60 bg-background/40 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span>{t("formAction")}</span>
                  </Link>

                  <a
                    href={site.studioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-border/60 bg-background/40 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span>{t("studioAction")}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                {t("responseNote")}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ProjectInquiryModalContext.Provider>
  );
}

export function ProjectInquiryTrigger({
  children,
  className,
  option,
}: {
  children: ReactNode;
  className?: string;
  option?: InquiryOptionId;
}) {
  const { open } = useProjectInquiryModal();

  return (
    <button
      type="button"
      onClick={() => open(option)}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </button>
  );
}
