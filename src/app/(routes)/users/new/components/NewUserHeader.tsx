import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/src/components/ui/button";

type NewUserHeaderProps = {
  title: string;
  backHref: string;
};

export function NewUserHeader({ title, backHref }: NewUserHeaderProps) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <button className="cursor-pointer">
        <Link href={backHref} aria-label="Voltar para a lista de usuários">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
      </button>
      <h1 className="text-xl font-semibold tracking-tight text-text-primary">
        {title}
      </h1>
    </div>
  );
}
