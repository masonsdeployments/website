"use client";
import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function MdxLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground mt-8">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}
