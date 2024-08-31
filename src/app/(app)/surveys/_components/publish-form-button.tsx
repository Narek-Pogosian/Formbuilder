"use client";

import { Button } from "@/components/ui/button";
import { publishForm } from "@/server/actions/form";

// TODO: Turn into alet dialog and warn that the survey can no longer be edited.
function PublishFormButton({ id }: { id: string }) {
  return (
    <Button
      size="sm"
      className="relative"
      onClick={async () => publishForm({ id })}
    >
      Publish
    </Button>
  );
}

export default PublishFormButton;
