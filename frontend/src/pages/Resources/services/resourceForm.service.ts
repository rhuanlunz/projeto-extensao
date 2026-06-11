import { api } from "@/lib/api";
import type { 
  ResourceFormData, 
  CreateResourcePayload, 
  UpdateResourcePayload 
} from "../types/resourceForm.types";
import type { Resource } from "./resource.types";

export const getResourcesGrouped = async (): Promise<Record<string, Resource[]>> => {
  const response = await api.get('/resources');
  return response.data.data;
};

export const createResource = async (formData: ResourceFormData): Promise<Resource> => {
  const payload = mapFormDataToPayload(formData);
  const response = await api.post('/resources', payload);
  return response.data.data;
};

export const updateResource = async (id: string, formData: ResourceFormData): Promise<Resource> => {
  const payload = mapFormDataToPayload(formData);
  const response = await api.put(`/resources/${id}`, payload);
  return response.data.data;
};

export const updateResourceStatus = async (id: string, status: string): Promise<Resource> => {
  const response = await api.patch(`/resources/${id}/status`, { status });
  return response.data.data;
};

export const deleteResource = async (id: string): Promise<void> => {
  await api.delete(`/resources/${id}`);
};

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data.data;
};

export const createCategory = async (name: string) => {
  const response = await api.post('/categories', { name });
  return response.data.data;
};

export const updateCategory = async (id: number, name: string) => {
  const response = await api.put(`/categories/${id}`, { name });
  return response.data.data;
};

export const getLevels = async () => {
  const response = await api.get('/levels');
  return response.data.data;
};

// Mappers
const mapFormDataToPayload = (formData: ResourceFormData): CreateResourcePayload => {
  return {
    name: formData.name,
    unesc_id: formData.unescId,
    status: formData.status,
    category_id: formData.category_id,
    level_id: formData.level_id,
    description: formData.description,
  };
};

export const mapResourceToFormData = (resource: Resource): ResourceFormData => {
  return {
    name: resource.name,
    unescId: resource.unesc_id,
    description: resource.description || "",
    category_id: resource.category.id,
    level_id: resource.level.id,
    status: resource.status,
  };
};
