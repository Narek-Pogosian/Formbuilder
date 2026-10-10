import BackButton from "./_components/back-button";
import BackgroundBlur from "@/components/ui/background-blur";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate min-h-screen content-center px-4 py-8 lg:col-span-2">
      <BackgroundBlur className="top-1/2 size-[min(85vw,44rem)] -translate-y-1/2 bg-primary/4" />

      <BackButton />
      <div className="card relative mx-auto max-w-xl p-6 lg:px-12 lg:py-9">{children}</div>
    </div>
  );
}
