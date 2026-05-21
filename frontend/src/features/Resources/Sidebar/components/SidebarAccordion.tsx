import type { LucideIcon } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SidebarAccordionProps {
  id: string;
  label: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}

export function SidebarAccordion({
  id,
  label,
  icon: Icon,
  children,
}: SidebarAccordionProps) {
  return (
    <AccordionItem value={id} className="border-none">
      <AccordionTrigger className="group flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white hover:no-underline">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-5 w-5 shrink-0" />}
          <span className="truncate">{label}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-1 pt-1 ml-4 border-l border-white/10 pl-2 space-y-1">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
