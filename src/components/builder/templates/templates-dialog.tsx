"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PanelsTopLeft } from "lucide-react";
import { useState } from "react";
import TemplatesContent from "./templates-content";

export default function TemplatesDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button size="sm" variant="ghost" className="w-fit justify-start pl-1!" />}
      >
        <PanelsTopLeft className="size-4.5" /> Use a template
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Explore form templates</DialogTitle>
          <DialogDescription>Choose a template to get started with your form.</DialogDescription>
        </DialogHeader>
        <TemplatesContent setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
