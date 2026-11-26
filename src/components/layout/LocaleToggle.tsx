"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const locales = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "fr", label: "Français" },
] as const;

export function LocaleToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const handleLocaleChange = (locale: string) => {
    if (locale === currentLocale) return;
    router.replace(pathname, { locale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative h-9 w-9 rounded-full border-border/60 bg-background/60 backdrop-blur-md hover:border-primary/50 hover:bg-card/80 hover:cursor-pointer"
        >
          <Globe className="h-4 w-4" />
          <span className="sr-only">Toggle locale</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="glass-surface rounded-xl border-border/70 p-1.5"
      >
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onClick={() => handleLocaleChange(locale.code)}
            className={
              locale.code === currentLocale
                ? "rounded-lg font-semibold text-primary"
                : "rounded-lg"
            }
          >
            {locale.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
