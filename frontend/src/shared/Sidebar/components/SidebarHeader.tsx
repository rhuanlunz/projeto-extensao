import { PanelLeftClose } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarHeaderProps {
  onClose: () => void;
}

export function SidebarHeader({ onClose }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ml-3">
          {/* Placeholder para o logo oficial da UNESC */}
          <span className="text-xl font-bold text-primary">U</span>
        </div>
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
