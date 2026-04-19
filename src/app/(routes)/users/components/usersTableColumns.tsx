import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon, Trash2Icon } from "lucide-react";

import type { UserWithCounts } from "@/src/lib/getUserWithCount";
import { formatDateTimePtBr } from "@/src/utils/formatDateTime";
import Link from "next/link";
import { DAYS_OF_WEEK, cityLabel } from "@/src/utils/optionsCatalog";

const col = createColumnHelper<UserWithCounts>();

export type UsersTableActions = {
  onDelete?: (user: UserWithCounts) => void;
  onSelectUser?: (user: UserWithCounts) => void;
  onSort?: (column: string) => void;
};

export function getUsersTableColumns({
  onDelete,
  onSelectUser,
  onSort,
}: UsersTableActions): ColumnDef<UserWithCounts, unknown>[] {


  const buttonSort = (column: string, label: string) => (
    <button className="cursor-pointer flex items-center gap-1" type="button" onClick={() => onSort?.(column)} aria-label="Ordenar por nome">
      <span>{label}</span>
      <ArrowUpDownIcon className="w-4 h-4" />
    </button>
  );
  return [
    col.accessor("name", {
      header: ({ column }) => (
        buttonSort(column.id ?? "", "Nome")
      ),
      cell: (info) => (
        <Link onClick={() => onSelectUser?.(info.row.original)} href={`/user/${info.row.original.id}`} className="hover:underline cursor-pointer">
          <span className="font-medium">{info.getValue()}</span>
        </Link>
      ),
    }),
    col.accessor("email", {
      header: "E-mail",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    col.accessor("cities", {
      header: "Cidades",
      size: 220,
      cell: (info) => {
        const values = info.getValue() ?? [];
        const list = Array.isArray(values) ? values : [];
        if (list.length === 0) return <span>—</span>;
        return <span>{list.map((c) => cityLabel(String(c))).join(", ")}</span>;
      },
    }),
    col.accessor("days_of_week", {
      header: "Dias da semana",
      cell: (info) => {
        const values = info.getValue() ?? [];
        const list = Array.isArray(values) ? values : [];
        if (list.length === 0) return <span>—</span>;
        const map = new Map(DAYS_OF_WEEK.map((d) => [d.value, d.short]));
        return (
          <span>
            {list
              .slice()
              .sort((a, b) => Number(a) - Number(b))
              .map((v) => map.get(Number(v)) ?? String(v))
              .join(", ")}
          </span>
        );
      },
    }),
    col.accessor("total_posts", {
      header: "Posts",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    col.accessor("total_albums", {
      header: "Álbuns",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    col.accessor("created_at", {
      header: ({ column }) => (
        buttonSort(column.id ?? "", "Data de criação")
      ),
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
