import { apiFetch } from "@/lib/api";
import type { SidebarItem } from "./sidebar.types";

export interface Category {
  id: number;
  name: string;
}

/**
 * Busca as categorias reais da API e as normaliza para o formato da Sidebar.
 */
export const getSidebarCategories = async (): Promise<SidebarItem[]> => {
  const response = await apiFetch("/categories");

  if (response?.success && Array.isArray(response.data)) {
    return response.data.map((category: Category) => ({
      id: `category-${category.id}`,
      label: category.name,
      route: "#", // Placeholder para navegação futura
    }));
  }

  return [];
};
