import { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarHeader } from "./components/SidebarHeader";
import { SidebarSearch } from "./components/SidebarSearch";
import { SidebarMenu } from "./components/SidebarMenu";
import { SidebarFooter } from "./components/SidebarFooter";
import { SidebarUser } from "./components/SidebarUser";

import { sidebarResources, mockUser } from "./services/sidebar.mock";
import { filterSidebarItems } from "./services/sidebar.filter";

export function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(
    () => filterSidebarItems(sidebarResources, searchTerm),
    [searchTerm]
  );

  return (
    <aside className="flex h-screen w-64 flex-col bg-white border-r border-slate-100 shadow-sm">
      <SidebarHeader />
      
      <Separator className="mx-3 mb-6 bg-black/15" />
      
      <SidebarSearch onSearch={setSearchTerm} />

      <ScrollArea className="flex-1">
        <SidebarMenu items={filteredItems} />
      </ScrollArea>

      <SidebarFooter />
      
      <SidebarUser user={mockUser} />
    </aside>
  );
}
