import BackButton from "./_components/back-button";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate min-h-screen content-center px-4 py-8 lg:col-span-2">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 top-1/2 left-1/2 -z-10 size-[min(85vw,44rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-primary/5 blur-3xl"
      />

      <BackButton />
      <div className="card relative mx-auto max-w-xl p-6 lg:px-12 lg:py-9">{children}</div>
    </div>
  );
}
