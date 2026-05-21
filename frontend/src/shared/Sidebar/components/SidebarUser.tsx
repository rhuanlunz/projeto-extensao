import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { SidebarUserData } from "../services/sidebar.types";

interface SidebarUserProps {
  user: SidebarUserData;
}

export function SidebarUser({ user }: SidebarUserProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="mt-auto border-t border-slate-100 p-4">
      <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50">
        <Avatar className="h-9 w-9 border border-slate-200">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="bg-primary text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col overflow-hidden text-sm">
          <span className="truncate font-medium text-slate-900">
            {user.name}
          </span>
          <span className="truncate text-xs text-slate-500">
            {user.email}
          </span>
        </div>
      </div>
    </div>
  );
}
