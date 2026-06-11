import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarMenuItemProps {
  label: string;
  icon?: LucideIcon;
  href?: string;
  isActive?: boolean;
  isNested?: boolean;
  onClick?: () => void;
}

export function SidebarMenuItem({
  label,
  icon: Icon,
  isActive,
  isNested,
  onClick,
}: SidebarMenuItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-50",
        isActive ? "bg-primary/5 text-primary" : "text-slate-600 hover:text-primary",
        isNested && "px-4"
      )}
    >
      {Icon && <Icon className="h-5 w-5 shrink-0" />}
      <span className="truncate">{label}</span>
    </div>
  );
}

