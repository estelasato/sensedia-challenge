import Link from "next/link";

import { Button } from "@/src/components/ui/button";

export default function UserNotFound() {
  return (
    <div className="mx-auto mt-10 max-w-md space-y-4 rounded-lg border border-border bg-white p-8 text-center shadow-sm">
      <p className="text-sm font-medium text-text-secondary">404</p>
      <h1 className="text-lg font-semibold text-text-primary">
        Usuário não encontrado
      </h1>
      <p className="text-sm text-text-secondary">
        O usuário pode ter sido removido ou o link está incorreto.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button asChild variant="default">
          <Link href="/users">Voltar à lista</Link>
        </Button>
      </div>
    </div>
  );
}
