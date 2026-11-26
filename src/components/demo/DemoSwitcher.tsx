"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function DemoSwitcher() {
  const pathname = usePathname();

  const tabs = [
    { href: "/", label: "Current", active: pathname === "/" },
    { href: "/demo/1", label: "Demo 1", active: pathname === "/demo/1" },
    { href: "/demo/2", label: "Demo 2", active: pathname === "/demo/2" },
  ];

  return (
    <div
      dir="ltr"
      className="glass-surface fixed right-5 bottom-5 z-50 flex items-center gap-1 rounded-full p-1.5"
    >
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
            tab.active
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
