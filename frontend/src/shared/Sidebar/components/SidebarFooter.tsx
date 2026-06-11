import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarFooterProps {
  onRequestResource: () => void;
}

export function SidebarFooter({ onRequestResource }: SidebarFooterProps) {
  return (
    <div className="p-6">
      <Button
        className="w-full justify-start gap-2 bg-primary font-medium text-white hover:bg-primary/90"
        variant="default"
        onClick={onRequestResource}
      >
        <PlusCircle className="h-5 w-5" />
        Solicitar recurso
      </Button>
    </div>
  );
}
