"use client";

import { useCallback, useMemo } from "react";

import { DataTable } from "@/src/components/table/Table";
import type { UserWithCounts } from "@/src/lib/getUserWithCount";

import { getUsersTableColumns } from "./usersTableColumns";
import { useBreadcrumb } from "@/src/hooks/useBreadcrumb";
import { useUrlNavigation } from "@/src/hooks/useUrlNavigation";
import { useSearchParams } from "next/navigation";

export type UsersTableProps = {
  users: UserWithCounts[];
  loading?: boolean;
  error?: string | null;
  onDelete?: (user: UserWithCounts) => void;
  startRouterTransition: (fn: () => void) => void;
};

export function UsersTable({
  users,
  loading = false,
  error = null,
  onDelete,
  startRouterTransition,
}: UsersTableProps) {
  const searchParams = useSearchParams();
  const { setMapSegments } = useBreadcrumb();
  const onSelectUser = (user: UserWithCounts) => {
    setMapSegments({
      [user.id]: {
        label: user.name ?? "Usuário",
        href: `/user/${user.id}`,
      },
    });
  };

  const navigate = useUrlNavigation(startRouterTransition);
  const onSort = useCallback(
    (column: string) => {
      const currentSort = searchParams.get("sort");
      const currentOrder = searchParams.get("order");
      navigate((params) => {
        if (currentSort !== column) {
          params.set("sort", column);
          params.set("order", "asc");
        }
        params.set("order", currentOrder === "asc" ? "desc" : "asc");
        params.delete("page");
      });
    },
    [navigate, searchParams],
  );

  const columns = useMemo(
    () => getUsersTableColumns({ onDelete, onSelectUser, onSort }),
    [onDelete],
  );

  return (
    <DataTable
      columns={columns}
      data={users}
      loading={loading}
      error={error}
      emptyMessage="Nenhum usuário encontrado."
      minWidth="720px"
      aria-label="Lista de usuários"
    />
  );
}
