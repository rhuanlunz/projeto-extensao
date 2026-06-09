import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import type { Resource } from "../services/resource.types";
import { ResourceModalHeader } from "./ResourceModalHeader";
import { ResourceModalImage } from "./ResourceModalImage";
import { ResourceModalContent } from "./ResourceModalContent";
import { ResourceModalStatus } from "./ResourceModalStatus";
import { ResourceModalActions } from "./ResourceModalActions";

interface ResourceDetailsModalProps {
  open: boolean;
  resource: Resource | null;
  onClose: () => void;
  onEdit: (resource: Resource) => void;
}

export function ResourceDetailsModal({ open, resource, onClose, onEdit }: ResourceDetailsModalProps) {
  if (!resource) return null;

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
              <ResourceModalHeader name={resource.name} onClose={onClose} />              <div className="mt-4 flex-1">
                <ResourceModalContent description={resource.description} />
              </div>

              <div className="mt-6 flex items-end justify-between">
                <ResourceModalActions onEdit={() => onEdit(resource)} />
                <ResourceModalStatus status={resource.status} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
