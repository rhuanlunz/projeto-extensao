import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarMenuItemProps {
  label: string;
  icon?: LucideIcon;
  href?: string;
  isActive?: boolean;
  isNested?: boolean;
  onClick?: () => void;
  action?: React.ReactNode;
}

export function SidebarMenuItem({
  label,
  icon: Icon,
  isActive,
  isNested,
  onClick,
  action,
}: SidebarMenuItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-50",
        isActive ? "bg-primary/5 text-primary" : "text-slate-600 hover:text-primary",
        isNested && "px-4"
      )}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        {Icon && <Icon className="h-5 w-5 shrink-0" />}
        <span className="truncate">{label}</span>
      </div>
      
      {action && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}

