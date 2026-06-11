import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Trash2, Power, Edit } from "lucide-react";
import type { Resource } from "../services/resource.types";
import { ResourceModalHeader } from "./ResourceModalHeader";
import { ResourceModalImage } from "./ResourceModalImage";
import { ResourceModalContent } from "./ResourceModalContent";
import { ResourceModalStatus } from "./ResourceModalStatus";
import { Button } from "@/components/ui/button";

interface ResourceDetailsModalProps {
  open: boolean;
  resource: Resource | null;
  onClose: () => void;
  onEdit: (resource: Resource) => void;
  onDelete: (id: string) => void;
  onStatusToggle: (id: string, newStatus: string) => void;
  canEdit: boolean;
  canToggleStatus: boolean;
}

export function ResourceDetailsModal({ 
  open, 
  resource, 
  onClose, 
  onEdit, 
  onDelete, 
  onStatusToggle,
  canEdit,
  canToggleStatus 
}: ResourceDetailsModalProps) {
  if (!resource) return null;

  const handleToggleStatus = () => {
    const nextStatus = resource.status === 'disponivel' ? 'indisponivel' : 'disponivel';
    onStatusToggle(resource.id, nextStatus);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
      <DialogContent className="w-[95vw] sm:w-full max-w-4xl max-h-[90dvh] flex flex-col border border-slate-200/70 rounded-3xl overflow-hidden bg-white/95 backdrop-blur-md shadow-2xl p-0 [&>button]:hidden">
        <div className="flex-1 min-h-0 overflow-x-hidden overflow-y-auto overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch]">
          <div className="flex flex-col lg:flex-row min-h-0 h-full">
            {/* Lado Esquerdo: Imagem */}
            <div className="p-4 sm:p-6 lg:p-8 lg:pr-4">
              <ResourceModalImage imageUrl={resource.imageUrl} name={resource.name} />
            </div>

            {/* Lado Direito: Conteúdo */}
            <div className="flex flex-1 flex-col min-w-0 w-full p-4 sm:p-6 lg:p-8 lg:pl-4">
              <ResourceModalHeader name={resource.name} onClose={onClose} />
              
              <div className="mb-4 mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1">
                  <span className="text-slate-300">#</span>
                  <span>ID: {resource.unesc_id}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-300">|</span>
                  <span>{resource.level.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-300">|</span>
                  <span>{resource.category.name}</span>
                </div>
              </div>

              <div className="mt-4 flex-1">
                <ResourceModalContent description={resource.description} />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <ResourceModalStatus status={resource.status} />

                <div className="flex items-center gap-2">
                  {canToggleStatus && (
                    <Button 
                      variant="outline"
                      onClick={handleToggleStatus}
                      className="h-10 px-3 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 gap-2"
                      title={resource.status === 'disponivel' ? "Tornar Indisponível" : "Tornar Disponível"}
                    >
                      <Power size={16} />
                      <span className="hidden sm:inline text-xs">Status</span>
                    </Button>
                  )}

                  {canEdit && (
                    <>
                      <Button 
                        onClick={() => onEdit(resource)}
                        className="h-10 px-4 rounded-xl bg-[#0085FF] hover:bg-[#0074E0] text-white font-semibold gap-2"
                      >
                        <Edit size={16} />
                        <span className="hidden sm:inline text-xs">Editar</span>
                      </Button>

                      <Button 
                        variant="ghost"
                        onClick={() => onDelete(resource.id)}
                        className="h-10 w-10 p-0 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
