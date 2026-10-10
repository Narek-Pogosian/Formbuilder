"use client";

import type { FormStatusEnum } from "@/server/db/schema";
import * as Dropdown from "@/components/ui/dropdown";
import * as AlertDialog from "@/components/ui/alert-dialog";

import { toggleFormStatusAction, deleteFormAction } from "@/server/actions/forms";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toast } from "@base-ui/react";
import {
  AlertCircleIcon,
  MoreHorizontal,
  Loader2,
  Share2,
  Trash2,
  Globe,
  Copy,
} from "lucide-react";

// import type { GetResponsesType } from "@/app/api/responses/[id]/route";
// import { createCSVFile, downLoadCSVFile } from "@/lib/utils/csv";

interface Props {
  id: number;
  status: FormStatusEnum;
  hasReponses: boolean;
}

export default function FormCardActions({ id, status, hasReponses }: Props) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);

  return (
    <>
      <Dropdown.DropdownMenu>
        <Dropdown.DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
          <MoreHorizontal className="text-muted-foreground" />
          <span className="sr-only">Form actions</span>
        </Dropdown.DropdownMenuTrigger>

        <Dropdown.DropdownMenuContent align="end" className="w-50">
          {status === "published" && (
            <Dropdown.DropdownMenuSub>
              <Dropdown.DropdownMenuSubTrigger>
                <Share2 className="mr-2 h-4 w-4" />
                Share Form
              </Dropdown.DropdownMenuSubTrigger>

              <Dropdown.DropdownMenuPortal>
                <Dropdown.DropdownMenuSubContent className="w-44">
                  <CopyLinkMenuItem id={id} />
                </Dropdown.DropdownMenuSubContent>
              </Dropdown.DropdownMenuPortal>
            </Dropdown.DropdownMenuSub>
          )}

          <Dropdown.DropdownMenuItem onClick={() => setIsPublishOpen(true)}>
            <Globe className="mr-2 h-4 w-4" />
            {status === "published" ? "Unpublish" : "Publish"} Form
          </Dropdown.DropdownMenuItem>

          {/* {hasReponses && <ExportCSVMenuItem id={id} />} */}

          <Dropdown.DropdownMenuItem variant="danger" onClick={() => setIsDeleteOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Form
          </Dropdown.DropdownMenuItem>
        </Dropdown.DropdownMenuContent>
      </Dropdown.DropdownMenu>

      <AlertDialog.AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialog.AlertDialogContent>
          <DeleteFormDialogContent id={id} />
        </AlertDialog.AlertDialogContent>
      </AlertDialog.AlertDialog>

      <AlertDialog.AlertDialog open={isPublishOpen} onOpenChange={setIsPublishOpen}>
        <AlertDialog.AlertDialogContent>
          <PublishFormDialogContent id={id} status={status} setIsOpen={setIsPublishOpen} />
        </AlertDialog.AlertDialogContent>
      </AlertDialog.AlertDialog>
    </>
  );
}

function CopyLinkMenuItem({ id }: { id: number }) {
  const toastManager = Toast.useToastManager();

  async function handleClick() {
    const formUrl = `${window.location.origin}/form/${id}`;

    try {
      await navigator.clipboard.writeText(formUrl);
      toastManager.add({
        title: "Link copied",
        description: "The form link has been copied to your clipboard.",
        timeout: 2000,
      });
    } catch (_) {
      toastManager.add({
        title: "Copy failed",
        description: "Unable to copy the form link. Please try again.",
      });
    }
  }

  return (
    <Dropdown.DropdownMenuItem onClick={handleClick}>
      <Copy className="mr-2 h-4 w-4" />
      Copy Link
    </Dropdown.DropdownMenuItem>
  );
}

// function ExportCSVMenuItem({ id }: { id: number }) {
//   const toastManager = Toast.useToastManager();

//   async function handleCSVDownload() {
//     const res = await fetch(`/api/responses/${id}`, { cache: "no-cache" });
//     if (!res.ok) throw new Error("Something went wrong");

//     const data = (await res.json()) as GetResponsesType;

//     const csv = createCSVFile(data);
//     downLoadCSVFile(csv, data.fileName);
//   }

//   function handleClick() {
//     toastManager.promise(handleCSVDownload(), {
//       loading: "Proccessing data...",
//       success: "Success, CSV file is downloaded",
//       error: "Something went wrong, cannot export CSV",
//     });
//   }

//   return (
//     <DropdownMenuItem onClick={handleClick}>
//       <Download className="mr-2 h-4 w-4" />
//       Export Responses (CSV)
//     </DropdownMenuItem>
//   );
// }

function DeleteFormDialogContent({ id }: { id: number }) {
  const { execute, isPending, result } = useAction(deleteFormAction);

  function handleClick() {
    if (isPending) return;

    execute(id);
  }

  return (
    <>
      <AlertDialog.AlertDialogHeader>
        <AlertDialog.AlertDialogTitle>Are you absolutely sure?</AlertDialog.AlertDialogTitle>
        <AlertDialog.AlertDialogDescription>
          This action cannot be undone. This will permanently delete the form and all the responses
          from our servers.
        </AlertDialog.AlertDialogDescription>
      </AlertDialog.AlertDialogHeader>

      {result.serverError && (
        <Alert variant="danger">
          <AlertCircleIcon />
          <AlertTitle>{result.serverError}</AlertTitle>
        </Alert>
      )}

      <AlertDialog.AlertDialogFooter>
        <AlertDialog.AlertDialogAction variant="danger" onClick={handleClick}>
          {isPending && <Loader2 className="animate-spin" />}
          Delete
        </AlertDialog.AlertDialogAction>
        <AlertDialog.AlertDialogCancel>Cancel</AlertDialog.AlertDialogCancel>
      </AlertDialog.AlertDialogFooter>
    </>
  );
}

function PublishFormDialogContent({
  id,
  status,
  setIsOpen,
}: {
  id: number;
  status: FormStatusEnum;
  setIsOpen: (v: boolean) => void;
}) {
  const { execute, isPending, result } = useAction(toggleFormStatusAction, {
    onSuccess: () => {
      setIsOpen(false);
    },
  });

  function handleClick() {
    if (isPending) return;

    execute(id);
  }

  const isPublished = status === "published";

  return (
    <>
      <AlertDialog.AlertDialogHeader>
        <AlertDialog.AlertDialogTitle>Are you absolutely sure?</AlertDialog.AlertDialogTitle>
        <AlertDialog.AlertDialogDescription>
          {isPublished
            ? "This will unpublish the form and you will not be able to collect reponses any more."
            : "This will publish the form and you can now share it again to collect reponses."}
        </AlertDialog.AlertDialogDescription>
      </AlertDialog.AlertDialogHeader>

      {result.serverError && (
        <Alert variant="danger">
          <AlertCircleIcon />
          <AlertTitle>{result.serverError}</AlertTitle>
        </Alert>
      )}

      <AlertDialog.AlertDialogFooter>
        <AlertDialog.AlertDialogAction
          variant={isPublished ? "danger" : "default"}
          onClick={handleClick}
        >
          {isPending && <Loader2 className="animate-spin" />}
          {isPublished ? "Unpublish" : "Publish"}
        </AlertDialog.AlertDialogAction>
        <AlertDialog.AlertDialogCancel>Cancel</AlertDialog.AlertDialogCancel>
      </AlertDialog.AlertDialogFooter>
    </>
  );
}
