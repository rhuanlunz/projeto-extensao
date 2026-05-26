import { mockResources } from "./resource.mock";
import type { Resource } from "./resource.types";
import type { CreateResourcePayload, UpdateResourcePayload } from "../types/resourceForm.types";

// Persistência em memória (mutável)
let resourcesDatabase: Resource[] = [...mockResources];

export const getResources = async (): Promise<Resource[]> => {
  // Simular latência
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...resourcesDatabase];
};

export const createResource = async (payload: CreateResourcePayload): Promise<Resource> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const newResource: Resource = {
    id: `res-${Math.random().toString(36).substr(2, 9)}`, // ID Único
    name: payload.name,
    description: payload.description,
    status: payload.status,
    floor: mapFloorToNumber(payload.floor),
    imageUrl: payload.imageUrl,
  };

  resourcesDatabase = [newResource, ...resourcesDatabase];
  return newResource;
};

export const updateResource = async (payload: UpdateResourcePayload): Promise<Resource> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const index = resourcesDatabase.findIndex((r) => r.id === payload.id);
  if (index === -index) throw new Error("Recurso não encontrado");

  const updatedResource: Resource = {
    ...resourcesDatabase[index],
    name: payload.name ?? resourcesDatabase[index].name,
    description: payload.description ?? resourcesDatabase[index].description,
    status: payload.status ?? resourcesDatabase[index].status,
    floor: payload.floor ? mapFloorToNumber(payload.floor) : resourcesDatabase[index].floor,
    imageUrl: payload.imageUrl ?? resourcesDatabase[index].imageUrl,
  };

  resourcesDatabase[index] = updatedResource;
  return updatedResource;
};

// Auxiliar para mapear string do form para número do mock
const mapFloorToNumber = (floor: string): number => {
  switch (floor) {
    case "first-floor": return 1;
    case "second-floor": return 2;
    case "third-floor": return 3;
    default: return 1;
  }
};
