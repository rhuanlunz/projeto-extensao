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
      <DialogContent className="max-w-4xl border-2 border-[#0056A4] p-0 sm:rounded-2xl overflow-hidden [&>button]:hidden data-[state=open]:animate-none data-[state=closed]:animate-none transition-[opacity,scale] duration-300 ease-in-out opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100 data-[state=closed]:opacity-0 data-[state=closed]:scale-95">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Lado Esquerdo: Imagem */}
          <div className="p-6 lg:pr-3">
            <ResourceModalImage imageUrl={resource.imageUrl} name={resource.name} />
          </div>

          {/* Lado Direito: Conteúdo */}
          <div className="flex flex-1 flex-col p-6 lg:pl-3">
            <ResourceModalHeader name={resource.name} onClose={onClose} />
            
            <div className="mt-4 flex-1">
              <ResourceModalContent description={resource.description} />
            </div>

            <div className="mt-auto flex items-end justify-between">
              <ResourceModalActions />
              <ResourceModalStatus status={resource.status} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
