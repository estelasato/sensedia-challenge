import Link from "next/link";

import { StatusCard } from "@/src/components/card/StatusCard";
import { Button } from "@/src/components/ui/button";

export default function UserNotFound() {
  return (
    <StatusCard
      code="404"
      title="Usuário não encontrado"
      description="O usuário pode ter sido removido ou o link solicitado está incorreto."
    >
      <Button asChild variant="default">
        <Link href="/users">Voltar à lista</Link>
      </Button>
    </StatusCard>
  );
}
