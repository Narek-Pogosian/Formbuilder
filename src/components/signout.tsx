"use client";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

function Signout() {
  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={() => signOut()}
      className="rounded-full"
    >
      <span className="sr-only">Signout</span>
      <LogOut className="size-5" />
    </Button>
  );
}

export default Signout;
