export type ResourceStatus = "available" | "unavailable";

export type ResourceFloor = "first-floor" | "second-floor" | "third-floor";

export type ResourceCategory = "Rack" | "Switch" | "Server" | "Other";

export interface ResourceFormData {
  name: string;
  unescId: string;
  description: string;
  category: ResourceCategory;
  floor: ResourceFloor;
  status: ResourceStatus;
}

export interface CreateResourcePayload {
  name: string;
  unescId: string;
  description: string;
  category: ResourceCategory;
  floor: ResourceFloor;
  status: ResourceStatus;
  imageUrl: string;
}

export interface UpdateResourcePayload extends Partial<CreateResourcePayload> {
  id: string;
}
