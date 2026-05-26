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
}

export function ResourceDetailsModal({ open, resource, onClose }: ResourceDetailsModalProps) {
  if (!resource) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogOverlay className="bg-black/30 backdrop-blur-sm data-[state=open]:animate-none data-[state=closed]:animate-none transition-opacity duration-300 ease-in-out opacity-0 data-[state=open]:opacity-100 data-[state=closed]:opacity-0" />
      <DialogContent className="w-[95vw] sm:w-full max-w-4xl mx-auto max-h-[90dvh] flex flex-col border-2 border-[#0085FF]/80 ring-1 ring-[#0085FF]/10 p-0 rounded-3xl overflow-hidden bg-white/95 backdrop-blur-md shadow-2xl [&>button]:hidden data-[state=open]:animate-none data-[state=closed]:animate-none transition-[opacity,scale] duration-300 ease-in-out opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100 data-[state=closed]:opacity-0 data-[state=closed]:scale-95">
        <div className="flex-1 min-h-0 overflow-x-hidden overflow-y-auto overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch]">
          <div className="flex flex-col lg:flex-row min-h-0 h-full">
            {/* Lado Esquerdo: Imagem */}
            <div className="p-4 sm:p-6 lg:p-8 lg:pr-4">
              <ResourceModalImage imageUrl={resource.imageUrl} name={resource.name} />
            </div>

            {/* Lado Direito: Conteúdo */}
            <div className="flex flex-1 flex-col p-4 sm:p-6 lg:p-8 lg:pl-4">
              <ResourceModalHeader name={resource.name} onClose={onClose} />
              
              <div className="mt-4 flex-1">
                <ResourceModalContent description={resource.description} />
              </div>

              <div className="mt-6 flex items-end justify-between">
                <ResourceModalActions />
                <ResourceModalStatus status={resource.status} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
