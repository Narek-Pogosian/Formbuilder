"use client";

import { Button } from "@/components/ui/button";
import { unCancelForm } from "@/server/actions/form";

function UncancelButton({ id }: { id: string }) {
  return (
    <Button
      size="sm"
      variant="outline"
      className="relative"
      onClick={async () => unCancelForm({ id })}
    >
      Uncancel
    </Button>
  );
}

export default UncancelButton;
