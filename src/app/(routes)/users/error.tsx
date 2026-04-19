"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

import { StatusCard } from "@/src/components/card/StatusCard";
import { Button } from "@/src/components/ui/button";

export default function UsersError() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <StatusCard
      title="Não foi possível carregar a lista"
      description="Ocorreu um erro ao buscar os dados. Tente novamente mais tarde."
    >
      <Button
        type="button"
        variant="default"
        disabled={isPending}
        onClick={() => startTransition(() => router.refresh())}
      >
        {isPending ? "Carregando..." : "Tentar novamente"}
      </Button>
    </StatusCard>
  );
}
