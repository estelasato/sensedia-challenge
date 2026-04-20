"use client";

import { useOptimistic, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { deleteUserAction } from "@/src/lib/userActions";
import type { UserWithCounts } from "@/src/lib/getUserWithCount";

export function useDeleteUser(initialUsers: UserWithCounts[]) {
  const router = useRouter();
  const [target, setTarget] = useState<UserWithCounts | null>(null);
  const [, startTransition] = useTransition();
  const [optimisticUsers, removeOptimistic] = useOptimistic(
    initialUsers,
    (state, userId: string) => state.filter((u) => u.id !== userId),
  );

  const confirm = () => {
    if (!target) return;

    const user = target;
    setTarget(null);

    startTransition(async () => {
      removeOptimistic(user.id);
      try {
        await deleteUserAction(user.id);
        toast.success(`${user.name} removido com sucesso.`);
        router.refresh();
      } catch (err) {
        toast.error("Não foi possível remover o usuário.");
        router.refresh();
      }
    });
  };

  return {
    users: optimisticUsers,
    target,
    setTarget,
    confirm,
  };
}
