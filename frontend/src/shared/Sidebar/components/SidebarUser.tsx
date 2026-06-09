import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import type { SidebarUserData } from "../services/sidebar.types";
import { useNavigate } from "react-router";
import logoutUser from "../services/sidebar.logout";

interface SidebarUserProps {
  user: SidebarUserData;
}

export function SidebarUser({ user }: SidebarUserProps) {
  const navigate = useNavigate();
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="mt-auto border-t border-slate-100 p-4">
      <div className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50 cursor-pointer">
        <div className="relative h-9 w-9 shrink-0">
          <Avatar className="h-9 w-9 border border-slate-200 transition-opacity duration-300 group-hover:opacity-0">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="bg-primary text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <button 
            className="absolute inset-0 flex items-center justify-center rounded-full bg-red-50 text-red-600 transition-all duration-300 pointer-events-none opacity-0 scale-95 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:scale-100"
            title="Sair"
            aria-label="Sair"
            onClick={async () =>  await logoutUser(navigate)}
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
        
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
