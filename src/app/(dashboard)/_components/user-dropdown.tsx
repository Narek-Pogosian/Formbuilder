"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { LogOut, UserCircle2 } from "lucide-react";
import { authClient } from "@/server/auth/client";

export default function UserDropdown({ showPending = false }: { showPending?: boolean }) {
  const { data, isPending } = authClient.useSession();

  if (showPending && isPending) {
    return <div className="flex size-8.5 items-center justify-center rounded-full bg-muted" />;
  }

  if (!data) return null;

  async function handleSignOut() {
    await authClient.signOut();
    location.reload();
  }

  const displayName = data.user.name || data.user.email || "Account";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            size="icon"
            variant="ghost"
            className="size-8.5 overflow-hidden rounded-full bg-muted"
          />
        }
      >
        {initials || <UserCircle2 className="size-4" />}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-2">
        <div className="px-2 py-1.5">
          <p className="text-sm font-semibold">{displayName}</p>
          <p className="text-sm text-muted-foreground">{data.user.email}</p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="justify-start" onClick={handleSignOut}>
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
