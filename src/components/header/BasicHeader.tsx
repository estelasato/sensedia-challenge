import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "../lib/utils";

type BasicHeaderProps = {
  title: string;
  backHref: string;
  classNameTitle?: string;
};

export function BasicHeader({ title, backHref, classNameTitle }: BasicHeaderProps) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <button className="cursor-pointer">
        <Link href={backHref} aria-label="Voltar para a lista de usuários">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
      </button>
      <h2 className={cn("text-xl font-semibold tracking-tight text-text-primary", classNameTitle)}>
        {title}
      </h2>
    </div>
  );
}