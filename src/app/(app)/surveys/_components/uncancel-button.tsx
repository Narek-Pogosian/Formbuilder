"use client";

import { Button } from "@/components/ui/button";
import { unCancelForm } from "@/server/actions/form";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

function UncancelButton({ id }: { id: string }) {
  const { executeAsync, isPending } = useAction(unCancelForm, {
    onError: () => {
      toast("Survey could not be uncancelled.");
    },
  });

  async function handleClick() {
    if (isPending) return;
    await executeAsync({ id });
  }

  return (
    <Button
      size="sm"
      className="relative"
      onClick={handleClick}
      aria-disabled={isPending}
    >
      Uncancel
    </Button>
  );
}

export default UncancelButton;
