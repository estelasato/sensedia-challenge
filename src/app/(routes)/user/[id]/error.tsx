"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/src/components/ui/button";

type Props = {
  error: Error & { digest?: string };
};

export default function UserDetailError({ error }: Props) {
  useEffect(() => {
    console.error("[user/[id]]", error);
  }, [error]);

  return (
    <div className="mx-auto mt-10 max-w-md space-y-4 rounded-lg border border-border bg-white p-8 text-center shadow-sm">
      <h1 className="text-lg font-semibold text-text-primary">
        Erro ao buscar dados
      </h1>
      <p className="text-sm text-text-secondary">
        Ocorreu um erro ao buscar as informações. Tente novamente mais tarde.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button asChild variant="default">
          <Link href="/users">Voltar à lista</Link>
        </Button>
      </div>
    </div>
  );
}
