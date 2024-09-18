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

interface PublishFormProps {
  id: string;
}

function PublishForm({ id }: PublishFormProps) {
  const [open, setOpen] = useState(false);

  const { executeAsync, isPending } = useAction(updateStatus, {
    onSettled: () => {
      setOpen(false);
    },
    onError: () => {
      toast("Survey could not be published.");
    },
  });

  async function handleClick() {
    if (isPending) return;
    await executeAsync({ id, status: "PUBLISHED" });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="relative" asChild>
        <Button variant="outline" size="sm">
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            After a survey has been published it can no longer be edited.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={handleClick}
            aria-disabled={isPending}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Publish
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishForm;
