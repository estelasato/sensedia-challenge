import { Modal } from "@/src/components/modal/Modal";
import { Button } from "@/src/components/ui/button";

export type DeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  isLoading?: boolean;
}

export function DeleteModal({ open, onOpenChange, onConfirm, title, isLoading }: DeleteModalProps) {
  return (
    <Modal className="md:max-w-[20rem]" open={open} onOpenChange={onOpenChange} title="Confirmar exclusão">
      <p>Tem certeza que deseja remover <span className="font-bold">{title}</span>?</p>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
        <Button 
        isLoading={isLoading}
        variant="destructive" onClick={onConfirm}>Remover</Button>
      </div>
    </Modal>
  )
}