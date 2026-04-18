"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

import { Button } from "@/src/components/ui/button";

import { SearchInput } from "./SearchInput";

export function UsersHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const applySearch = useCallback(
    (search: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const q = search.trim();
      if (q) params.set("search", q);
      else params.delete("search");
      params.delete("page");

      const qs = params.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [pathname, router, searchParams],
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
