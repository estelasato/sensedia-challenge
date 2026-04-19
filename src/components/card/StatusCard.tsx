import type { ReactNode } from "react";

import { cn } from "@/src/components/lib/utils";

export type StatusCardProps = {
  code?: string;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
};

export function StatusCard({
  code,
  title,
  description,
  children,
  className,
}: StatusCardProps) {
  return (
    <div
      className={cn(
        "mx-auto mt-10 max-w-md space-y-4 rounded-lg border border-border bg-white p-8 text-center shadow-sm",
        className,
      )}
    >
      {code != null && code !== "" ? (
        <h1 className="font-medium text-text-secondary">{code}</h1>
      ) : null}
      <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
      <p className="text-sm text-text-secondary">{description}</p>
      {children != null ? (
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
          {children}
        </div>
      ) : null}
    </div>
  );
}
