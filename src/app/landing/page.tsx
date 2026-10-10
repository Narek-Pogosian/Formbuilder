import LandingSignInButton from "./_components/sign-in-button";
import Header from "@/components/ui/header";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import BackgroundBlur from "@/components/ui/background-blur";

export default function LandingPage() {
  return (
    <div className="container">
      <Header>
        <Logo />
        <LandingSignInButton />
      </Header>

      <section className="relative pt-20 lg:pt-40">
        <BackgroundBlur className="top-10 size-[280px] bg-primary/8 md:size-[500px]" />

        <div className="text-center">
          <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Build Forms <span className="text-primary-text">Effortlessly</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl md:text-lg">
            Try out this form builder built with React, DnD-Kit, Zod, React-Hook-Form, Zustand and
            Tailwind CSS.
          </p>

          <Button size="lg" nativeButton={false} render={<Link href="/editor" />}>
            Try it out
            <MoveRight className="ml-3" />
          </Button>
        </div>
      </section>
    </div>
  );
}
