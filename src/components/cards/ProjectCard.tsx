"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useIsRtl } from "@/hooks/use-rtl";

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectCardProps = {
  index: string;
  year: string;
  badge: string;
  title: string;
  story: string;
  imageSrc: string;
  imageAlt: string;
  recognition?: string;
  metrics: [ProjectMetric, ProjectMetric];
  demoHref?: string;
  codeHref?: string;
  caseStudyHref?: string;
};

export const ProjectCard = ({
  index,
  year,
  badge,
  title,
  story,
  imageSrc,
  imageAlt,
  recognition,
  metrics,
  demoHref,
  codeHref,
  caseStudyHref,
}: ProjectCardProps) => {
  const t = useTranslations("Projects.card");
  const isRtl = useIsRtl();

  const imageFrame = (
    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/50 bg-muted/40">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        unoptimized={imageSrc.endsWith(".svg")}
        sizes="(min-width: 1024px) 46vw, (min-width: 768px) 48vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15"
      />

      {/* Quiet top-start index & year overlay */}
      <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
        <span
          dir="ltr"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-3 py-1 font-mono text-[11px] font-medium text-white/90 backdrop-blur-md"
        >
          <span>{index}</span>
          <span aria-hidden className="text-white/40">
            ·
          </span>
          <span>{year}</span>
        </span>

        {recognition ? (
          <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md">
            {recognition}
          </span>
        ) : null}
      </div>
    </div>
  );

  return (
    <article className="surface-card group flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
      {/* Visual Preview Stage */}
      {caseStudyHref ? (
        <Link
          href={caseStudyHref}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          aria-label={`${title}: ${t("cta1")}`}
        >
          {imageFrame}
        </Link>
      ) : (
        imageFrame
      )}

      {/* Editorial Body */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            {badge}
          </p>

          <h3 className="mt-2 font-serif text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-[1.75rem]">
            {caseStudyHref ? (
              <Link
                href={caseStudyHref}
                className="focus-visible:outline-none focus-visible:underline"
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </h3>

          <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">
            {story}
          </p>
        </div>

        <div className="mt-6">
          {/* Uniform 2-Point Editorial Highlights */}
          <dl className="grid grid-cols-2 gap-4 border-t border-border/50 pt-5">
            {metrics.map((metric, idx) => (
              <div
                key={metric.label}
                className={idx === 1 ? "border-s border-border/50 ps-4" : undefined}
              >
                <dd
                  dir={/[\u0600-\u06FF]/.test(metric.value) ? "rtl" : "ltr"}
                  className="inline-block font-serif text-xl font-bold tracking-tight text-foreground sm:text-2xl"
                >
                  {metric.value}
                </dd>
                <dt className="mt-0.5 text-xs font-medium text-muted-foreground">
                  {metric.label}
                </dt>
              </div>
            ))}
          </dl>

          {/* Quiet Editorial Links */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border/50 pt-4">
            {caseStudyHref ? (
              <Link
                href={caseStudyHref}
                className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>{t("cta1")}</span>
                {isRtl ? (
                  <ArrowLeft className="h-4 w-4 text-primary transition-transform group-hover/link:-translate-x-0.5" />
                ) : (
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover/link:translate-x-0.5" />
                )}
              </Link>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-4">
              {demoHref ? (
                <a
                  href={demoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/ext inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span>{t("cta2")}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/ext:-translate-y-0.5 group-hover/ext:translate-x-0.5" />
                </a>
              ) : null}

              {codeHref ? (
                <a
                  href={codeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/ext inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span>{t("cta3")}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/ext:-translate-y-0.5 group-hover/ext:translate-x-0.5" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
