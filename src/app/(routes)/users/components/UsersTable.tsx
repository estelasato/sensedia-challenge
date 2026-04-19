"use client";

import { useMemo } from "react";

import { DataTable } from "@/src/components/table/Table";
import type { UserWithCounts } from "@/src/lib/getUserWithCount";

import { getUsersTableColumns } from "./usersTableColumns";

export type UsersTableProps = {
  users: UserWithCounts[];
  loading?: boolean;
  error?: string | null;
  onDelete?: (user: UserWithCounts) => void;
};

export function UsersTable({
  users,
  loading = false,
  error = null,
  onDelete,
}: UsersTableProps) {
  const columns = useMemo(
    () => getUsersTableColumns({ onDelete }),
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
