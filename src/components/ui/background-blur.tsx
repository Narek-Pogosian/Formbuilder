import { cn } from "@/lib/utils";

export default function BackgroundBlur({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed left-1/2 -z-20 -translate-x-1/2 rounded-full blur-3xl",
        className
      )}
    />
  );
}
