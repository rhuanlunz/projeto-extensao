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
  defaultCategoryId?: number | null;
}

export function ResourceFormModal({ 
  open, 
  onOpenChange, 
  initialData, 
  onSubmit, 
  isSubmitting,
  defaultCategoryId
}: ResourceFormModalProps) {
  
  const isEditing = Boolean(initialData);

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
      <DialogContent className="w-[95vw] sm:w-full max-w-5xl max-h-[90dvh] flex flex-col border border-slate-200/70 p-0 rounded-3xl overflow-hidden bg-white/95 backdrop-blur-md shadow-2xl [&>button]:hidden">
        
        {/* Cabeçalho do Modal: Fixo no topo */}
        <div className="flex items-center justify-between px-8 py-6 shrink-0 border-b border-slate-100">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold tracking-tight text-[#0056A4]">
              {isEditing ? "Editar Recurso" : "Cadastrar Novo Recurso"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {isEditing 
                ? "Atualize as informações do recurso físico selecionado" 
                : "Gerencie as informações do recurso físico no sistema"}
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

        {/* Área do Formulário: Scrollável e flexível */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y">
          <ResourceForm 
            initialData={initialData} 
            onSubmit={onSubmit} 
            onCancel={handleClose}
            isSubmitting={isSubmitting}
            defaultCategoryId={defaultCategoryId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
