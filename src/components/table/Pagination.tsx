"use client";

import { Pagination as PaginationType } from "@/src/types/pagination";

import {
  Pagination as PaginationNav,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { cn } from "@/src/components/lib/utils";
import { useUrlNavigation } from "@/src/hooks/useUrlNavigation";

export type PaginationProps = {
  pagination: PaginationType;
  siblingCount?: number;
  className?: string;
  startRouterTransition: (fn: () => void) => void;
  isRouterPending: boolean;
};

function getPageNumbers(
  current: number,
  totalPages: number,
  sibling: number,
): (number | "ellipsis")[] {
  if (totalPages <= 5 + sibling * 2) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | "ellipsis")[] = [];
  const start = Math.max(2, current - sibling);
  const end = Math.min(totalPages - 1, current + sibling);

  pages.push(1);
  if (start > 2) pages.push("ellipsis");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push("ellipsis");
  pages.push(totalPages);

  return pages;
}

export function Pagination({
  pagination,
  siblingCount = 1,
  className = "",
  startRouterTransition,
  isRouterPending,
}: PaginationProps) {
  const navigate = useUrlNavigation(startRouterTransition);

  const { page, limit, pageCount, total } = pagination;
  const totalPages = Math.max(1, pageCount);

  const goTo = (target: number) => {
    const next = Math.min(totalPages, Math.max(1, target));
    if (next === page) return;

    navigate((params) => {
      if (next === 1) params.delete("page");
      else params.set("page", String(next));
    });
  };

  if (totalPages <= 1) return null;

  const pages = getPageNumbers(page, totalPages, siblingCount);
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div
      className={cn(
        "flex flex-col items-start justify-between gap-2 text-sm sm:flex-row sm:items-center",
        className,
      )}
    >
      <p className="text-text-secondary text-nowrap">
        {from}–{to} de {total}
      </p>

      <PaginationNav className="" aria-label="Paginação">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={page === 1 || isRouterPending}
              onClick={() => goTo(page - 1)}
            />
          </PaginationItem>

          {pages.map((p, idx) =>
            p === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={p === page}
                  disabled={isRouterPending}
                  onClick={() => goTo(p)}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              disabled={page === totalPages || isRouterPending}
              onClick={() => goTo(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationNav>
    </div>
  );
}
