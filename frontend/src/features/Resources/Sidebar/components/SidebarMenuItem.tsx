import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarMenuItemProps {
  label: string;
  icon?: LucideIcon;
  href?: string;
  isActive?: boolean;
  isNested?: boolean;
}

export function SidebarMenuItem({
  label,
  icon: Icon,
  isActive,
  isNested,
}: SidebarMenuItemProps) {
  return (
    <div
      className={cn(
        "group flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/5",
        isActive ? "bg-white/10 text-white" : "text-white/70 hover:text-white",
        isNested && "px-4"
      )}
    >
      {Icon && <Icon className="h-5 w-5 shrink-0" />}
      <span className="truncate">{label}</span>
    </div>
  );
}
