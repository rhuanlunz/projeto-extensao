import * as mockRepo from "./resourceForm.mock";
import type { 
  ResourceFormData, 
  CreateResourcePayload, 
  UpdateResourcePayload 
} from "../types/resourceForm.types";
import type { Resource } from "./resource.types";

export const getResources = async (): Promise<Resource[]> => {
  return await mockRepo.getResources();
};

export const createResource = async (formData: ResourceFormData): Promise<Resource> => {
  const payload = mapFormDataToPayload(formData);
  return await mockRepo.createResource(payload);
};

export const updateResource = async (id: string, formData: ResourceFormData): Promise<Resource> => {
  const payload: UpdateResourcePayload = {
    ...mapFormDataToPayload(formData),
    id,
  };
  return await mockRepo.updateResource(payload);
};

// Mappers
const mapFormDataToPayload = (formData: ResourceFormData): CreateResourcePayload => {
  return {
    name: formData.name,
    unescId: formData.unescId,
    description: formData.description,
    category: formData.category,
    floor: formData.floor,
    status: formData.status,
    imageUrl: "/rack-preset.png", // Preset inicial
  };
};

export const mapResourceToFormData = (resource: Resource): ResourceFormData => {
  return {
    name: resource.name,
    unescId: resource.id, // Simulando que o ID é o UNESC ID
    description: resource.description || "",
    category: "Rack", // Default para mock
    floor: mapNumberToFloor(resource.floor),
    status: resource.status,
  };
};

const mapNumberToFloor = (floor: number): any => {
  switch (floor) {
    case 1: return "first-floor";
    case 2: return "second-floor";
    case 3: return "third-floor";
    default: return "first-floor";
  }
};
