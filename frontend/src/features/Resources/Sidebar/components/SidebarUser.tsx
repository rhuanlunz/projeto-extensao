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
    <div className="mt-auto border-t border-white/10 p-4">
      <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5">
        <Avatar className="h-9 w-9 border border-white/20">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="bg-primary text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col overflow-hidden text-sm">
          <span className="truncate font-medium text-white">
            {user.name}
          </span>
          <span className="truncate text-xs text-white/60">
            {user.email}
          </span>
        </div>
      </div>
    </div>
  );
}
