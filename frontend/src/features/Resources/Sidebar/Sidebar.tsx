import { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    <aside className="flex h-screen w-72 flex-col bg-sidebar shadow-xl">
      <SidebarHeader />
      
      <SidebarSearch onSearch={setSearchTerm} />

      <ScrollArea className="flex-1">
        <SidebarMenu items={filteredItems} />
      </ScrollArea>

      <SidebarFooter />
      
      <SidebarUser user={mockUser} />
    </aside>
  );
}
