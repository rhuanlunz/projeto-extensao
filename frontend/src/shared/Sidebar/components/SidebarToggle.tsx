import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarToggleProps {
  visible: boolean;
  onOpen: () => void;
}

export function SidebarToggle({ visible, onOpen }: SidebarToggleProps) {
  if (!visible) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onOpen}
      className="fixed left-4 top-4 z-50 h-10 w-10 rounded-full shadow-md bg-white border-slate-200 text-slate-500 hover:text-primary hover:border-primary transition-all duration-300"
      aria-label="Mostrar sidebar"
    >
      <PanelLeft className="h-5 w-5" />
    </Button>
  );
}
