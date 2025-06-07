"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFoundPage() {
  const pathname = usePathname();
  const t = useTranslations("NotFound");
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    setIsRtl(document.body.getAttribute("data-rtl") === "true");
    const obs = new MutationObserver(() =>
      setIsRtl(document.body.getAttribute("data-rtl") === "true")
    );
    obs.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-rtl"],
    });
    return () => obs.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <p className="text-xl text-muted-foreground">{t("line1")}</p>
        <p className="text-muted-foreground">{t("line2")}</p>
        <Button asChild variant="outline" className="mt-4">
          <Link
            href={`/${pathname.split("/")[1]}`}
            className="flex items-center gap-2"
          >
            {t("cta")}
            {isRtl ? (
              <ArrowLeft className="h-4 w-4" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </Link>
        </Button>
      </div>
    </main>
  );
}
