import { useState, useEffect } from "react";
import { Accordion } from "@/components/ui/accordion";
import { LayoutDashboard, Cpu } from "lucide-react";
import type { SidebarElement } from "../services/sidebar.types";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarAccordion } from "./SidebarAccordion";
import { getCategories } from "@/pages/Resources/services/resourceForm.service";

interface SidebarMenuProps {
  items?: SidebarElement[];
  onSelectCategory: (id: number | null) => void;
  selectedCategoryId: number | null;
}

export function SidebarMenu({ onSelectCategory, selectedCategoryId }: SidebarMenuProps) {
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias na sidebar", error);
      }
    };
    loadCategories();
  }, []);

  return (
    <div className="flex-1 space-y-1 px-3">
      <Accordion type="multiple" className="w-full space-y-1">
        <SidebarMenuItem
          label="Dashboard"
          icon={LayoutDashboard}
          onClick={() => onSelectCategory(null)}
          isActive={selectedCategoryId === null}
        />

        {categories.length > 0 && (
          <SidebarAccordion
            id="categories"
            label="Categorias"
            icon={Cpu}
          >
            {categories.map((child) => (
              <SidebarMenuItem
                key={child.id}
                label={child.name}
                icon={undefined}
                isNested
                onClick={() => onSelectCategory(child.id)}
                isActive={selectedCategoryId === child.id}
              />
            ))}
          </SidebarAccordion>
        )}
      </Accordion>
    </div>
  );
}
