import { useState, useEffect } from "react";
import { Accordion } from "@/components/ui/accordion";
import { LayoutDashboard, Cpu, Plus, Settings, Pencil } from "lucide-react";
import type { SidebarElement } from "../services/sidebar.types";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarAccordion } from "./SidebarAccordion";
import { getCategories } from "@/pages/Resources/services/resourceForm.service";
import { CategoryFormModal } from "@/pages/Resources/components/CategoryFormModal";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router";

interface SidebarMenuProps {
  items?: SidebarElement[];
  onSelectCategory: (id: number | null) => void;
  selectedCategoryId: number | null;
}

export function SidebarMenu({ onSelectCategory, selectedCategoryId }: SidebarMenuProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<{ id: number; name: string } | null>(null);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      console.error("Erro ao carregar categorias na sidebar");
    }
  };

  useEffect(() => {
    loadCategories();
  }, [location.pathname]);

  const handleDashboardClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    onSelectCategory(null);
  };

  const handleEditCategory = (e: React.MouseEvent, category: { id: number; name: string }) => {
    e.stopPropagation();
    setCategoryToEdit(category);
    setIsCategoryModalOpen(true);
  };

  const handleCloseModal = (open: boolean) => {
    setIsCategoryModalOpen(open);
    if (!open) {
      setCategoryToEdit(null);
    }
  };

  return (
    <div className="flex-1 space-y-1 px-3 pb-4">
      <Accordion 
        key={`sidebar-menu-${categories.length}`}
        type="multiple" 
        defaultValue={["categories"]}
        className="w-full space-y-1"
      >
        <SidebarMenuItem
          label="Dashboard"
          icon={LayoutDashboard}
          onClick={handleDashboardClick}
          isActive={selectedCategoryId === null && location.pathname === "/"}
        />

        {isAdmin && (
          <SidebarMenuItem
            label="Configurações"
            icon={Settings}
            onClick={() => navigate("/configuracoes")}
            isActive={location.pathname === "/configuracoes"}
          />
        )}

        <SidebarAccordion
          id="categories"
          label="Categorias"
          icon={Cpu}
        >
          <div className="flex flex-col gap-1 pr-2">
            {categories.map((child) => (
              <SidebarMenuItem
                key={child.id}
                label={child.name}
                icon={undefined}
                isNested
                onClick={() => {
                  if (location.pathname !== "/") {
                    navigate("/", { replace: false });
                  }
                  onSelectCategory(child.id);
                }}
                isActive={selectedCategoryId === child.id && location.pathname === "/"}
                action={isAdmin && (
                  <button 
                    onClick={(e) => handleEditCategory(e, child)}
                    className="p-1 hover:bg-slate-200 rounded-md text-slate-400 hover:text-primary transition-colors"
                    title="Editar Categoria"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                )}
              />
            ))}

            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCategoryToEdit(null);
                  setIsCategoryModalOpen(true);
                }}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5 mt-2 border border-dashed border-primary/20 bg-primary/0"
              >
                <Plus className="h-4 w-4" />
                <span>Nova Categoria</span>
              </button>
            )}
          </div>
        </SidebarAccordion>
      </Accordion>

      <CategoryFormModal
        open={isCategoryModalOpen}
        onOpenChange={handleCloseModal}
        onSuccess={loadCategories}
        initialData={categoryToEdit}
      />
    </div>
  );
}
