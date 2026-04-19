import Link from "next/link";

import { Button } from "@/src/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto mt-10 max-w-md space-y-4 rounded-lg border border-border bg-white p-8 text-center shadow-sm">
      <h1>404</h1>
      <h1 className="text-lg font-semibold text-text-primary">
        Página não encontrada
      </h1>
      <p className="text-sm text-text-secondary">
        O endereço solicitado não existe ou foi movido.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button asChild variant="default">
          <Link href="/">Voltar ao início</Link>
        </Button>
      </div>
    </div>
  );
}
