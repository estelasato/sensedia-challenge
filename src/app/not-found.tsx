import Link from "next/link";

import { StatusCard } from "@/src/components/card/StatusCard";
import { Button } from "@/src/components/ui/button";

export default function NotFound() {
  return (
    <StatusCard
      code="404"
      title="Página não encontrada"
      description="O endereço solicitado não existe ou foi movido."
    >
      <Button asChild variant="default">
        <Link href="/">Voltar ao início</Link>
      </Button>
    </StatusCard>
  );
}
