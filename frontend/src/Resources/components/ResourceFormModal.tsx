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
      <DialogContent className="w-[95vw] sm:w-full max-w-5xl border border-slate-200/70 p-0 rounded-3xl overflow-hidden bg-white/95 backdrop-blur-md shadow-2xl [&>button]:hidden data-[state=open]:animate-none data-[state=closed]:animate-none transition-[opacity,scale] duration-300 ease-in-out opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100 data-[state=closed]:opacity-0 data-[state=closed]:scale-95">
        
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between px-8 py-6">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold tracking-tight text-[#0056A4]">
              {mode === "create" ? "Cadastrar Novo Recurso" : "Editar Recurso"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Gerencie as informações do recurso físico no sistema
            </p>
          </div>
          <button 
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700 disabled:opacity-50"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Formulário */}
        <div className="max-h-[calc(90vh-100px)] overflow-y-auto">
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
