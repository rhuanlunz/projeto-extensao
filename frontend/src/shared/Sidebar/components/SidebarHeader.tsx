import { PanelLeftClose } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarHeaderProps {
  onClose: () => void;
}

export function SidebarHeader({ onClose }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-8">
      <div className="flex items-center gap-3">
        <img
          src="/logo.jpg"
          alt="Logo UNESC"
          className="ml-2 h-14 w-14 sm:h-16 sm:w-16 object-contain select-none shrink-0"
        />
        <h1 className="text-xl font-semibold tracking-tight text-primary">
          Recursos
        </h1>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="text-slate-500 hover:text-primary transition-colors mr-1"
        aria-label="Ocultar sidebar"
      >
        <PanelLeftClose className="h-5 w-5" />
      </Button>
    </div>
  );
}
