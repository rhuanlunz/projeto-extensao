import { apiFetch } from "@/lib/api";
import type { 
  ResourceFormData, 
  CreateResourcePayload 
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

export const createResource = async (formData: ResourceFormData): Promise<Resource | null> => {
  const payload = mapFormDataToPayload(formData);
  const response = await apiFetch("/resources", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (response?.success) {
    return response.data;
  }
  return null;
};

export const updateResource = async (id: string | number, formData: ResourceFormData): Promise<Resource | null> => {
  const payload = mapFormDataToPayload(formData);
  const response = await apiFetch(`/resources/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (response?.success) {
    return response.data;
  }
  return null;
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


const mapFormDataToPayload = (formData: ResourceFormData): CreateResourcePayload => {
  // Mapeamento de UI para IDs do Backend
  const floorMap: Record<string, number> = {
    "first-floor": 1,
    "second-floor": 2,
    "third-floor": 3
  };

  const categoryMap: Record<string, number> = {
    "Rack": 1,
    "Switch": 2,
    "Server": 3,
    "Other": 4
  };

  return {
    name: formData.name,
    unescId: formData.unescId,
    description: formData.description,
    category_id: categoryMap[formData.category] || 1,
    level_id: floorMap[formData.floor] || 1,
    status: formData.status === "available" ? "disponivel" : "indisponivel",
  } as any; // Using any for now to match payload structure expected by backend
};

export const mapResourceToFormData = (resource: Resource): ResourceFormData => {
  const reverseFloorMap: Record<number, any> = {
    1: "first-floor",
    2: "second-floor",
    3: "third-floor"
  };

  return {
    name: resource.name,
    unescId: resource.unesc_id,
    description: resource.description || "",
    category: resource.category?.name as any || "Rack",
    floor: reverseFloorMap[resource.level?.id] || "first-floor",
    status: resource.status === "disponivel" ? "available" : "unavailable",
  };
};
