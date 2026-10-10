"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackgroundBlur from "@/components/ui/background-blur";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6">
      <BackgroundBlur className="top-10 h-[40rem] w-[min(95vw,56rem)] bg-primary/3" />

      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">Some error occurred. Please try again.</p>

        <Button onClick={unstable_retry} className="mt-8">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try again
        </Button>

        {process.env.NODE_ENV === "development" && (
          <p className="mt-6 text-xs break-all text-muted-foreground">{error.message}</p>
        )}
      </div>
    </div>
  );
}
