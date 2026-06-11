import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X, Server, RefreshCcw, Loader2 } from "lucide-react";
import type { Resource } from "../services/resource.types";
import { ResourceStatus } from "./ResourceStatus";
import { ROLES, hasPermission } from "@/lib/auth";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface ResourceDetailsModalProps {
  open: boolean;
  resource: Resource | null;
  onClose: () => void;
  onEdit: (resource: Resource) => void;
  onStatusChange?: (id: string | number, newStatus: "disponivel" | "indisponivel") => Promise<void>;
}

export function ResourceDetailsModal({ open, resource, onClose, onEdit, onStatusChange }: ResourceDetailsModalProps) {
  const { isAdmin } = useAuth();
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  if (!resource) return null;

  const canUpdateStatus = hasPermission([ROLES.ADMIN, ROLES.TEACHER]);

  const handleToggleStatus = async () => {
    if (!onStatusChange || isUpdatingStatus) return;
    
    setIsUpdatingStatus(true);
    const newStatus = resource.status === "disponivel" ? "indisponivel" : "disponivel";
    await onStatusChange(resource.id, newStatus);
    setIsUpdatingStatus(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
      <DialogContent className="w-[95vw] sm:w-full max-w-4xl max-h-[90dvh] flex flex-col border border-slate-200/70 rounded-3xl overflow-hidden bg-white/95 backdrop-blur-md shadow-2xl p-0 [&>button]:hidden">
        <div className="flex-1 min-h-0 overflow-x-hidden overflow-y-auto overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch]">
          <div className="flex flex-col lg:flex-row min-h-0 h-full">
            {/* Lado Esquerdo: Imagem */}
            <div className="p-4 sm:p-6 lg:p-8 lg:pr-4">
              <div className="flex h-full min-h-60 w-full items-center justify-center rounded-3xl bg-[#E0F2FF] lg:w-70">
                {resource.imageUrl ? (
                  <img
                    src={resource.imageUrl}
                    alt={resource.name}
                    className="h-full w-full rounded-3xl object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <Server className="h-20 w-20 text-[#0085FF]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0085FF]/60">
                      Institucional
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Lado Direito: Conteúdo */}
            <div className="flex flex-1 flex-col min-w-0 w-full p-4 sm:p-6 lg:p-8 lg:pl-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0056A4]">{resource.name}</h2>
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
                  aria-label="Fechar"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Descrição */}
              <div className="mt-4 flex-1">
                <div className="mt-4 w-full max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
                  <ScrollArea className="h-30 w-full">
                    <p className="w-full max-w-full whitespace-pre-line wrap-break-word text-sm leading-relaxed text-slate-700">
                      {resource.description || "Nenhuma descrição disponível para este recurso."}
                    </p>
                  </ScrollArea>
                </div>
              </div>

              {/* Ações e Status */}
              <div className="mt-6 flex items-end justify-between">
                <div className="flex gap-4 items-center">
                  {isAdmin && (
                    <Button
                      onClick={() => onEdit(resource)}
                      className="h-11 px-8 rounded-xl bg-[#0085FF] hover:bg-[#0074E0] text-white font-semibold transition-all active:scale-95 shadow-lg shadow-blue-200"
                    >
                      Editar
                    </Button>
                  )}

                  {canUpdateStatus && (
                    <Button
                      variant="outline"
                      onClick={handleToggleStatus}
                      disabled={isUpdatingStatus}
                      className="h-11 px-4 rounded-xl border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-all"
                    >
                      {isUpdatingStatus ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCcw className="h-4 w-4" />
                      )}
                      <span className="ml-2 hidden sm:inline">Alternar Status</span>
                    </Button>
                  )}
                </div>
                <div className="flex justify-end items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {resource.level.name}
                  </span>
                  <ResourceStatus 
                    status={resource.status} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
