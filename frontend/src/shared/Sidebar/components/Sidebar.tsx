import { SidebarContent } from "./SidebarContent";
import { SIDEBAR_WIDTH_CLASS } from "../services/sidebar.constants";
import { useEffect, useRef, useState } from "react";

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
}

export function Sidebar({ visible, onClose }: SidebarProps) {
  const [isMounted, setIsMounted] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);

  // Blindagem de Transição Inicial: Evita flicker no mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Blindagem de Listeners (ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && visible && window.innerWidth < 1024) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible, onClose]);

  // Blindagem de Focus Management: Contain focus in mobile sidebar
  useEffect(() => {
    if (visible && window.innerWidth < 1024 && sidebarRef.current) {
      const focusable = sidebarRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        (focusable[0] as HTMLElement).focus();
      }
    }
  }, [visible]);

  if (!isMounted) return null;

  return (
    <>
      {/* Overlay: Blindagem de UX Mobile com Fade Sincronizado */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        ref={sidebarRef}
        className={`
          fixed inset-y-0 left-0 z-50 flex transform transition-all duration-300 ease-in-out lg:relative lg:z-0
          ${visible ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${visible ? SIDEBAR_WIDTH_CLASS : "lg:w-0 lg:opacity-0"}
          shrink-0 overflow-hidden
        `}
      >
        <SidebarContent visible={visible} onClose={onClose} />
      </aside>
    </>
  );
}
