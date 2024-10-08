"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { updateStatus } from "@/server/actions/form";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

interface CancelFormDialogProps {
  id: string;
}

function CancelFormDialog({ id }: CancelFormDialogProps) {
  const [open, setOpen] = useState(false);

  const { executeAsync, isPending } = useAction(updateStatus, {
    onSettled: () => {
      setOpen(false);
    },
    onError: () => {
      toast("Survey could not be cancelled.");
    },
  });

  async function handleClick() {
    if (isPending) return;
    await executeAsync({ id, status: "CANCELLED" });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="relative" asChild>
        <Button variant="outline" size="sm">
          Cancel Survey
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This means people will no longer be able to answer your survey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            loading={isPending}
            onClick={handleClick}
            aria-disabled={isPending}
          >
            Proceed
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CancelFormDialog;
