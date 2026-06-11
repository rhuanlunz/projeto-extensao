import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarSearch } from "./SidebarSearch";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarUser } from "./SidebarUser";
import { RequestResourceModal } from "./RequestResourceModal";

import { SIDEBAR_TRANSITION } from "../services/sidebar.constants";

interface SidebarContentProps {
  visible: boolean;
  onClose: () => void;
  onSelectCategory: (id: number | null) => void;
  selectedCategoryId: number | null;
}

export function SidebarContent({ visible, onClose, onSelectCategory, selectedCategoryId }: SidebarContentProps) {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  return (
    <div
      className={`flex flex-col h-full w-64 bg-white border-r border-slate-100 shadow-sm will-change-transform ${SIDEBAR_TRANSITION} ${
        visible
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0 pointer-events-none select-none"
      }`}
      aria-hidden={!visible}
      // @ts-ignore - inert is a valid HTML attribute but might not be in the current React types
      inert={!visible ? "" : undefined}
    >
      <SidebarHeader onClose={onClose} />

      <Separator className="mx-3 mb-6 bg-black/15" />

      <SidebarSearch onSearch={() => {}} />

      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <SidebarMenu 
            onSelectCategory={onSelectCategory} 
            selectedCategoryId={selectedCategoryId} 
          />
        </ScrollArea>
      </div>

      <SidebarFooter onRequestResource={() => setIsRequestModalOpen(true)} />

      <SidebarUser />

      <RequestResourceModal 
        open={isRequestModalOpen} 
        onOpenChange={setIsRequestModalOpen} 
      />
    </div>
  );
}


