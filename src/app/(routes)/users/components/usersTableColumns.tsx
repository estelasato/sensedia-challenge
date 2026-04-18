import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";

import type { UserWithCounts } from "@/src/lib/getUserWithCount";
import { formatDateTimePtBr } from "@/src/lib/formatDateTime";

const col = createColumnHelper<UserWithCounts>();

export type UsersTableActions = {
  onDelete?: (user: UserWithCounts) => void;
};

export function getUsersTableColumns({
  onDelete,
}: UsersTableActions): ColumnDef<UserWithCounts, unknown>[] {
  return [
    col.accessor("name", {
      header: "Nome",
      cell: (info) => (
        <span className="font-medium">{info.getValue()}</span>
      ),
    }),
    col.accessor("email", {
      header: "E-mail",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    col.accessor("totalPosts", {
      header: "Posts",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    col.accessor("totalAlbums", {
      header: "Álbuns",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    col.accessor("created_at", {
      header: "Data de criação",
      cell: (info) => formatDateTimePtBr(info.getValue()),
    }),
    col.accessor("updated_at", {
      header: "Data de atualização",
      cell: (info) => formatDateTimePtBr(info.getValue()),
    }),
    col.display({
      id: "actions",
      header: () => <span className="sr-only">Ações</span>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <button
            type="button"
            aria-label={`Excluir ${row.original.name}`}
            onClick={() => onDelete?.(row.original)}
            className="text-gray-500 opacity-0 pointer-events-none transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 hover:text-red-600 focus-visible:pointer-events-auto focus-visible:opacity-100 hover:cursor-pointer"
          >
            <Trash2Icon className="h-4 w-4" aria-hidden />
          </button>
        </div>
      ),
    }),
  ] as ColumnDef<UserWithCounts, unknown>[];
}
