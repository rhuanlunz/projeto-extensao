import { SidebarContent } from "./SidebarContent";
import { SIDEBAR_WIDTH_CLASS } from "../services/sidebar.constants";

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
}

export function Sidebar({ visible, onClose }: SidebarProps) {
  return (
    <aside
      className={`shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out ${
        visible ? SIDEBAR_WIDTH_CLASS : "w-0"
      }`}
    >
      <SidebarContent visible={visible} onClose={onClose} />
    </aside>
  );
}
