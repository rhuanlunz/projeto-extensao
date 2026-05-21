import { Accordion } from "@/components/ui/accordion";
import type { SidebarElement } from "../services/sidebar.types";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarAccordion } from "./SidebarAccordion";

interface SidebarMenuProps {
  items: SidebarElement[];
}

export function SidebarMenu({ items }: SidebarMenuProps) {
  return (
    <div className="flex-1 space-y-1 px-3">
      <Accordion type="multiple" className="w-full space-y-1">
        {items.map((item) => {
          // Se for um item simples
          if (!("children" in item)) {
            return (
              <SidebarMenuItem
                key={item.id}
                label={item.label}
                icon={item.icon}
              />
            );
          }

          // Se for um grupo (accordion)
          return (
            <SidebarAccordion
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
            >
              {item.children.map((child) => (
                <SidebarMenuItem
                  key={child.id}
                  label={child.label}
                  icon={child.icon}
                  isNested
                />
              ))}
            </SidebarAccordion>
          );
        })}
      </Accordion>
    </div>
  );
}
