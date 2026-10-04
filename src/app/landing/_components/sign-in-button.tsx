"use client";

import { authClient } from "@/server/auth/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingSignInButton() {
  const { data } = authClient.useSession();

  if (!data) {
    return (
      <Button
        size="lg"
        variant="secondary"
        className="rounded-full"
        nativeButton={false}
        render={<Link href="/login" />}
      >
        Sign in
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      variant="secondary"
      className="rounded-full"
      nativeButton={false}
      render={<Link href="/" />}
    >
      Dashboard
    </Button>
  );
}
