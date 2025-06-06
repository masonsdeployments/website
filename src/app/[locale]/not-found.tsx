import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <p className="text-xl text-muted-foreground">
          Damn. This page doesn&apos;t exist. Maybe it&apos;s hiding with the
          secrets of the universe.
        </p>

        <p className="text-muted-foreground">
          Or maybe you just took a wrong turn. No shame in that. Happens to the
          best of us.
        </p>

        <Button asChild variant="outline" className="mt-4">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </main>
  );
}
