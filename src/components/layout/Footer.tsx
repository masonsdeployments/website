import { useTranslations } from "next-intl";
import LogoLink from "../LogoLink";

export const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="py-12 bg-muted dark:bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold font-mono mb-4 md:mb-0">
            <span className="gradient-text flex flex-row justify-center items-center gap-3 text-primary font-sans">
              <LogoLink />
            </span>
          </div>
          <p className="text-muted-foreground text-center md:text-right">
            {t("text")}
          </p>
        </div>
      </div>
    </footer>
  );
};
