"use client";

import { useIsTouchDevice } from "@/hooks/use-is-touch-device";

function FormBuilderWrapper({ children }: { children: React.ReactNode }) {
  const isTouch = useIsTouchDevice();

  if (isTouch)
    return (
      <div className="mx-auto max-w-sm pt-16 text-center font-semibold">
        This feature is blocked on touch devices for now as it won&apos;t work
        properly.
      </div>
    );

  return <>{children}</>;
}

export default FormBuilderWrapper;
