"use client";

import { Modal } from "./Modal";
import { Button } from "../ui/button";

export type ConfirmDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
};

export function ConfirmDeleteModal({
  open,
  onOpenChange,
  onConfirm,
  title,
  confirmLabel = "Remover",
  cancelLabel = "Cancelar",
  loading = false,
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      className="md:max-w-[20rem]"
      open={open}
      onOpenChange={onOpenChange}
      title="Confirmar exclusão"
    >
      <p>
        Tem certeza que deseja remover <span className="font-bold">{title}</span>?
      </p>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={loading}
        >
          {cancelLabel}
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
          isLoading={loading}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
