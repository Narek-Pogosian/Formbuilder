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
import { deleteForm } from "@/server/actions/form";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteFormDialogProps {
  id: string;
}

function DeleteFormDialog({ id }: DeleteFormDialogProps) {
  const [open, setOpen] = useState(false);

  const { executeAsync, isPending } = useAction(deleteForm, {
    onSettled: () => {
      setOpen(false);
    },
    onError: () => {
      toast("Survey could not be deleted.");
    },
  });

  async function handleClick() {
    if (isPending) return;
    await executeAsync({ id });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="relative" asChild>
        <Button variant="dangerOutline" size="sm">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the form
            and all related stats will be removed from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="danger"
            loading={isPending}
            aria-disabled={isPending}
            onClick={handleClick}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteFormDialog;
