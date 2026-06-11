import { useState, useEffect, useRef } from "react";
import { Sidebar, SidebarToggle } from "@/shared/Sidebar";
import { EmailSettings } from "./components/EmailSettings";
import { UserManagement } from "./components/UserManagement";
import { Toaster } from "sonner";
import { Settings as SettingsIcon } from "lucide-react";

export function Settings() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleShowSidebar = () => setIsSidebarVisible(true);
  const handleHideSidebar = () => setIsSidebarVisible(false);

  return (
    <div className="flex h-screen w-full overflow-x-hidden overflow-y-hidden bg-[#EEF3F7]">
      <Toaster position="top-right" richColors />

      <SidebarToggle 
        ref={toggleRef}
        visible={!isSidebarVisible} 
        onOpen={handleShowSidebar} 
      />

      <Sidebar 
        visible={isSidebarVisible} 
        onClose={handleHideSidebar} 
        onSelectCategory={() => {}} // Not needed here
        selectedCategoryId={null}
      />

      <main className="flex-1 min-w-0 overflow-auto p-4 sm:p-6 md:p-10 pt-20 lg:pt-10 pb-safe pr-safe pl-safe transition-all duration-300">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex items-center gap-4">
            <div className="bg-primary p-2 rounded-lg">
              <SettingsIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Configurações do Sistema</h1>
              <p className="text-slate-500">Gerencie usuários e preferências globais do sistema.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <EmailSettings />
            <UserManagement />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;
