import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { ResourceForm } from "./ResourceForm";
import type { Resource } from "../services/resource.types";
import type { ResourceFormValues } from "../schemas/resourceForm.schema";
import { X } from "lucide-react";

interface ResourceFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: Resource | null;
  onSubmit: (data: ResourceFormValues) => Promise<void>;
  isSubmitting: boolean;
  mode: "create" | "edit";
}

export function ResourceFormModal({ 
  open, 
  onOpenChange, 
  initialData, 
  onSubmit, 
  isSubmitting,
  mode 
}: ResourceFormModalProps) {
  
  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/30 backdrop-blur-sm data-[state=open]:animate-none data-[state=closed]:animate-none transition-opacity duration-300 ease-in-out opacity-0 data-[state=open]:opacity-100 data-[state=closed]:opacity-0" />
      <DialogContent className="max-w-4xl border-2 border-[#0056A4] p-0 sm:rounded-2xl overflow-hidden [&>button]:hidden data-[state=open]:animate-none data-[state=closed]:animate-none transition-[opacity,scale] duration-300 ease-in-out opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100 data-[state=closed]:opacity-0 data-[state=closed]:scale-95">
        
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
          <h2 className="text-xl font-bold text-[#0056A4]">
            {mode === "create" ? "Cadastrar Novo Recurso" : "Editar Recurso"}
          </h2>
          <button 
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-full p-1 transition-colors hover:bg-zinc-100 disabled:opacity-50"
          >
            <X className="h-6 w-6 text-zinc-500" />
          </button>
        </div>

        {/* Formulário */}
        <div className="bg-white h-[600px] max-h-[80vh]">
          <ResourceForm 
            initialData={initialData} 
            onSubmit={onSubmit} 
            onCancel={handleClose}
            isSubmitting={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
