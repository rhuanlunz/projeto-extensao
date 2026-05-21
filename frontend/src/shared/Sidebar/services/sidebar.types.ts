import type { LucideIcon } from "lucide-react";

export interface SidebarItem {
  id: string;
  label: string;
  route?: string;
  icon?: LucideIcon;
}

export interface SidebarGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  children: SidebarItem[];
}

export type SidebarElement = SidebarItem | SidebarGroup;

export interface SidebarUserData {
  name: string;
  email: string;
  avatarUrl?: string;
}
