import { LayoutDashboard, Cpu } from "lucide-react";
import type { SidebarElement, SidebarUserData } from "./sidebar.types";

export const sidebarResources: SidebarElement[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    route: "/",
  },
  {
    id: "physical",
    label: "Físicos",
    icon: Cpu,
    children: [
      {
        id: "racks",
        label: "Racks",
        route: "#",
      },
    ],
  },
];

export const mockUser: SidebarUserData = {
  name: "Usuário Exemplo",
  email: "usuario@unesc.net",
  avatarUrl: "https://github.com/shadcn.png",
};
