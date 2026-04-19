import { BasicHeader } from "@/src/components/header/BasicHeader";

export default function UserDetailLoading() {
  return (
    <div className="mx-auto mt-10 max-w-md">
      <BasicHeader title="Dados do Usuário" backHref="/users" />
      <article
        className="w-full animate-pulse rounded-md border border-border bg-white p-6 shadow-sm"
        aria-label="Carregando dados do usuário"
      >
        <div className="mb-4 flex justify-center">
          <div className="size-24 rounded-full bg-muted" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 border-b border-border pb-3 last:border-b-0 sm:flex-row sm:justify-between"
            >
              <div className="h-3 w-24 rounded bg-muted" />
              <div className="h-4 w-full max-w-48 rounded bg-muted sm:ml-auto" />
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
