"use client";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

function Signout() {
  return (
    <Button variant="ghost" onClick={() => signOut()}>
      <LogOut className="mr-2 size-5" />
      Signout
    </Button>
  );
}

export default Signout;
