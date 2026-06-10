import { apiFetch } from "@/lib/api";
import type { 
  ResourceFormData, 
  CreateResourcePayload, 
  UpdateResourcePayload 
} from "../types/resourceForm.types";
import type { Resource } from "./resource.types";

export const getResources = async (): Promise<Resource[]> => {
  const response = await apiFetch("/resources");
  if (response?.success) {
    // A API retorna dados agrupados: { "Térreo": [...], "1º Andar": [...] }
    // Precisamos achatar isso para uma lista única, pois a UI espera um array
    const groupedData = response.data;
    const flatResources: Resource[] = [];
    
    Object.keys(groupedData).forEach((floorName) => {
      flatResources.push(...groupedData[floorName]);
    });
    
    return flatResources;
  }
  return [];
};

export const deleteResource = async (id: string | number): Promise<boolean> => {
  const response = await apiFetch(`/resources/${id}`, {
    method: "DELETE",
  });
  return !!response?.success;
};

export const updateResourceStatus = async (
  id: string | number, 
  status: "disponivel" | "indisponivel"
): Promise<Resource | null> => {
  const response = await apiFetch(`/resources/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  if (response?.success) {
    return response.data;
  }
  return null;
};


// Mappers (Mantidos para referência, serão atualizados na Fase 3 se liberado)
const mapFormDataToPayload = (formData: ResourceFormData): CreateResourcePayload => {
  return {
    name: formData.name,
    unescId: formData.unescId,
    description: formData.description,
    category: formData.category,
    floor: formData.floor,
    status: formData.status,
    imageUrl: undefined,
  };
};

export const mapResourceToFormData = (resource: Resource): ResourceFormData => {
  return {
    name: resource.name,
    unescId: resource.unesc_id,
    description: resource.description || "",
    category: "Rack", // Placeholder
    floor: "first-floor", // Placeholder
    status: resource.status === "disponivel" ? "available" : "unavailable",
  };
};
