"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

export type DataTableProps<TData, TValue = unknown> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  emptyMessage?: string;
  error?: string | null;
  minWidth?: string;
  className?: string;
};

function TableSpinner({ label = "Carregando…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <span
        className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary"
        aria-hidden
      />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading = false,
  emptyMessage = "Nenhum registro encontrado.",
  error = null,
  minWidth = "720px",
  className = "",
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (error) {
    return (
      <div
        className={`rounded-lg border border-red-200 bg-red-50 p-6 text-center text-sm text-red-800 ${className}`}
        role="alert"
      >
        {error}
      </div>
    );
  }

  if (loading && data.length === 0) {
    return (
      <div
        className={`overflow-hidden rounded-lg border border-border bg-white shadow-sm ${className}`}
      >
        <TableSpinner />
      </div>
    );
  }

  if (!loading && data.length === 0) {
    return (
      <p
        className={`rounded-md border border-border bg-white p-8 text-center text-sm ${className}`}
      >
        {emptyMessage}
      </p>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-border bg-white shadow-sm ${className}`}
    >
      {loading ? (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center bg-white/75 backdrop-blur-[1px]"
          aria-busy="true"
          aria-live="polite"
        >
          <div className="flex items-center gap-2 rounded-md border border-border bg-white px-4 py-2 shadow-sm">
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-primary"
              aria-hidden
            />
            <span className="text-sm  text-text-secondary">Atualizando…</span>
          </div>
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse text-left text-sm"
          style={{ minWidth }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-border bg-surface"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className="whitespace-nowrap px-4 py-3 font-semibold text-text-primary"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="group bg-white hover:bg-surface/60"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 align-middle"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
