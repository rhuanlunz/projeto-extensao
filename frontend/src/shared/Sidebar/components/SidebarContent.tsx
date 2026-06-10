import { useState, useMemo, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarSearch } from "./SidebarSearch";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarUser } from "./SidebarUser";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, LayoutDashboard, Layers } from "lucide-react";

import { mockUser } from "../services/sidebar.mock";
import { filterSidebarItems } from "../services/sidebar.filter";
import { SIDEBAR_TRANSITION } from "../services/sidebar.constants";
import { getSidebarCategories } from "../services/sidebar.service";
import type { SidebarElement } from "../services/sidebar.types";

interface SidebarContentProps {
  visible: boolean;
  onClose: () => void;
}

export function SidebarContent({ visible, onClose }: SidebarContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dynamicItems, setDynamicItems] = useState<SidebarElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const categories = await getSidebarCategories();
      
      const items: SidebarElement[] = [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
          route: "/",
        },
      ];

      if (categories.length > 0) {
        items.push({
          id: "categories-group",
          label: "Categorias",
          icon: Layers,
          children: categories,
        });
      }

      setDynamicItems(items);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredItems = useMemo(
    () => filterSidebarItems(dynamicItems, searchTerm),
    [dynamicItems, searchTerm]
  );

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
      
      <SidebarSearch onSearch={setSearchTerm} />

      <ScrollArea className="flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-slate-400">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-xs font-medium">Carregando categorias...</span>
          </div>
        ) : hasError ? (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-400" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-600">Erro ao carregar</span>
              <span className="text-[10px] text-slate-400">Não foi possível sincronizar os dados</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={fetchItems}
              className="mt-2 h-8 text-primary hover:bg-primary/5"
            >
              Tentar novamente
            </Button>
          </div>
        ) : dynamicItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400">
            <Layers className="h-6 w-6 opacity-20" />
            <span className="text-xs font-medium mt-2">Nenhuma categoria</span>
          </div>
        ) : (
          <SidebarMenu items={filteredItems} />
        )}
      </ScrollArea>

      <SidebarFooter />
      
      <SidebarUser user={mockUser} />
    </div>
  );
}
