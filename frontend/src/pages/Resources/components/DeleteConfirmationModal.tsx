import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  itemName: string;
  isDeleting: boolean;
}

export function DeleteConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  itemName,
  isDeleting,
}: DeleteConfirmationModalProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm z-[60]" />
        <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-none rounded-3xl z-[60] shadow-2xl">
          <div className="p-8 flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            
            <DialogHeader className="p-0 mb-2">
              <DialogTitle className="text-2xl font-bold text-slate-800">
                Confirmar Exclusão
              </DialogTitle>
            </DialogHeader>
            
            <p className="text-slate-500 leading-relaxed">
              Tem certeza que deseja excluir o recurso <span className="font-semibold text-slate-700">"{itemName}"</span>? Esta ação não poderá ser desfeita.
            </p>
          </div>

          <DialogFooter className="bg-slate-50 p-6 flex flex-col-reverse sm:flex-row gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isDeleting}
              className="flex-1 h-12 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-all font-semibold"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={isDeleting}
              className="flex-1 h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-all shadow-lg shadow-red-500/20 font-semibold"
            >
              {isDeleting ? "Excluindo..." : "Sim, Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
