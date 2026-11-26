"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/layout/ThemeProvider";

export function DarkModeToggle() {
  const { toggleTheme } = useTheme();

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX: x, clientY: y } = event;
    toggleTheme({ x, y });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className="relative h-9 w-9 overflow-hidden rounded-full border-border/60 bg-background/60 backdrop-blur-md hover:border-primary/50 hover:bg-card/80 hover:cursor-pointer"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
