import { apiFetch } from "@/lib/api";

export interface Category {
  id: number;
  name: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiFetch("/categories");
  if (response?.success) {
    return response.data;
  }
  return [];
};
