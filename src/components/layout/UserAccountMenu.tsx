"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { cn } from "@/src/components/lib/utils";
import { getUserInitials } from "@/src/lib/getCurrentUser";
import { ChevronDownIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { Avatar } from "../avatar/Avatar";

export function UserAccountMenu() {
  const { user, isLoading } = useAuth();
  const [open, setOpen] = useState(false);

  const initials = getUserInitials(user?.name ?? "N/A");

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal>
      <DropdownMenuTrigger
        type="button"
        className={cn(
          "flex max-w-[min(100vw-6rem,14rem)] items-center gap-2 rounded-lg py-1.5 pr-2 pl-1 outline-none cursor-pointer",
          "text-left text-sm text-gray-900",

        )}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="min-w-0 flex-1 truncate font-medium">
          {user.name}
        </span>

        <Avatar
          src={user.image ?? null}
          alt={user.name}
          initials={initials}
        />

        <ChevronDownIcon
          className={cn(
            "h-4 w-4 shrink-0 text-gray-500 transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="z-200 w-64 p-0"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel className="px-3 py-3 font-normal">
          <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-1">
          <DropdownMenuItem asChild>
            <Link href="/users" className="cursor-pointer">
              <UserIcon className="size-4" />
              Minha conta
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/users" className="cursor-pointer">
              <SettingsIcon className="size-4" />
              Configurações
            </Link>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <div className="p-1">
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onSelect={() => setOpen(false)}
          >
            <LogOutIcon className="size-4" />
            Sair
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
