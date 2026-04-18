"use client";

import type { UsersWithCountsResult } from "@/src/lib/getUserWithCount";

import { Pagination } from "@/src/components/table/Pagination";
import { ConfirmDeleteModal } from "@/src/components/modal/ConfirmDeleteModal";

import { useDeleteUser } from "../hooks/useDeleteUser";
import { UsersHeader } from "./UsersHeader";
import { UsersTable } from "./UsersTable";

type UserSectionProps = {
  data: UsersWithCountsResult;
};

export function UserSection({ data }: UserSectionProps) {
  const { users, target, setTarget, confirm } = useDeleteUser(data.users);

  return (
    <div className="space-y-6">
      <UsersHeader />

      <UsersTable users={users} onDelete={(user) => setTarget(user)} />

      <Pagination pagination={data.pagination} />

      <ConfirmDeleteModal
        open={!!target}
        onOpenChange={(open) => {
          if (!open) setTarget(null);
        }}
        onConfirm={confirm}
        title={target?.name ?? ""}
      />
    </div>
  );
}
