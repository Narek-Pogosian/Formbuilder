"use client";

import Link from "next/link";
import { Book, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { publishFormAction } from "@/server/actions/forms";
import { useBuilderStore } from "../store";
import { authClient } from "@/server/auth/client";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PublishDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = authClient.useSession();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button size="sm" />}>
        <Book /> Publish
      </DialogTrigger>

      <DialogContent>
        {!data ? <UnauthenticatedHeader /> : <Header />}
        {!data ? <UnauthenticatedContent /> : <Content />}
      </DialogContent>
    </Dialog>
  );
}

function UnauthenticatedHeader() {
  return (
    <DialogHeader>
      <DialogTitle>Sign in to publish</DialogTitle>
      <DialogDescription>
        Publishing is only available to signed-in users. Sign in to save and manage your forms from
        the dashboard.
      </DialogDescription>
    </DialogHeader>
  );
}

function Header() {
  return (
    <DialogHeader>
      <DialogTitle>Publish</DialogTitle>
      <DialogDescription>Review your form details before publishing.</DialogDescription>
    </DialogHeader>
  );
}

function UnauthenticatedContent() {
  return (
    <DialogFooter>
      <Button nativeButton={false} render={<Link href="/login" />}>
        Sign in
      </Button>
      <DialogClose render={<Button variant="secondary" />}>Close</DialogClose>
    </DialogFooter>
  );
}

function Content() {
  const router = useRouter();
  const fields = useBuilderStore((state) => state.fields);
  const settings = useBuilderStore((state) => state.settings);
  const resetFields = useBuilderStore((state) => state.resetFields);
  const resetSettings = useBuilderStore((state) => state.resetSettings);

  const title = settings.title.trim();
  const hasTitle = title.length > 0;
  const hasFields = fields.length > 0;
  const canPublish = hasFields && hasTitle;

  const { execute, hasErrored, isPending } = useAction(publishFormAction, {
    onSuccess: () => {
      setTimeout(() => {
        resetFields();
        resetSettings();
      }, 1000);
      router.push("/");
    },
  });

  function handlePublish() {
    if (!canPublish || isPending) return;

    execute({
      title,
      description: settings.description,
      content: JSON.stringify(fields),
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1 text-xs font-semibold text-muted-foreground uppercase">Title</p>
        <p className="text-sm">
          {hasTitle ? title : <span className="text-danger-text">Untitled form</span>}
        </p>
      </div>

      <div>
        <p className="mb-1 text-xs font-semibold text-muted-foreground uppercase">Description</p>
        <p className="text-sm">{settings.description || "No description"}</p>
      </div>

      {!canPublish && (
        <Alert variant="danger">
          <AlertDescription>
            {!hasFields && <p>Add at least one field to publish your form.</p>}
            {!hasTitle && <p>Please add a title to your form.</p>}
          </AlertDescription>
        </Alert>
      )}

      {hasErrored && (
        <Alert variant="danger">
          <AlertTitle>Sorry, we were unable to publish your form. Please try again</AlertTitle>
        </Alert>
      )}

      <DialogFooter>
        <Button aria-disabled={!canPublish} onClick={handlePublish}>
          {isPending && <Loader2 className="animate-spin" />} Publish
        </Button>
        <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
      </DialogFooter>
    </div>
  );
}
