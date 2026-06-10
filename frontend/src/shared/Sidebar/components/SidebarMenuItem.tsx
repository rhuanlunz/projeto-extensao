import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";

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
  href,
  isActive,
  isNested,
}: SidebarMenuItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (href && href !== "#") {
      navigate(href);
    }
  };

  return (
    <div
      onClick={handleClick}
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
