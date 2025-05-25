import { LogoSvg } from "./LogoSvg";

export const Footer = () => {
  return (
    <footer className="py-12 bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold font-mono mb-4 md:mb-0">
            <span className="gradient-text flex flex-row justify-center items-center gap-3 text-primary font-sans">
              <LogoSvg className="text-primary" width={60} height={60} />
              Masons
            </span>
          </div>
          <p className="text-muted-foreground text-center md:text-right">
            © 2025 Masons. Built with empathy, deployed with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
};
