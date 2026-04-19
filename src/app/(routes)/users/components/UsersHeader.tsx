"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { Button } from "@/src/components/ui/button";
import { useUrlNavigation } from "@/src/hooks/useUrlNavigation";

import { SearchInput } from "./SearchInput";

type UsersHeaderProps = {
  startRouterTransition: (fn: () => void) => void;
};

export function UsersHeader({ startRouterTransition }: UsersHeaderProps) {
  const searchParams = useSearchParams();
  const navigate = useUrlNavigation(startRouterTransition);

  const applySearch = useCallback(
    (search: string) => {
      navigate((params) => {
        const q = search.trim();
        if (q) params.set("search", q);
        else params.delete("search");
        params.delete("page");
      });
    },
    [navigate],
  );

  return (
    <header className="flex items-end justify-between gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold tracking-tight text-text-primary">Usuários</h1>
        <SearchInput
          defaultSearch={searchParams.get("search") ?? ""}
          onSearch={applySearch}
        />
      </div>

      <Button className="rounded-lg" asChild>
        <Link href="/users/new">+ Adicionar</Link>
      </Button>
    </header>
  );
}
