export type ResourceStatus = "disponivel" | "indisponivel";

export interface ResourceFormData {
  name: string;
  unescId: string;
  description: string;
  category_id: number;
  level_id: number;
  status: ResourceStatus;
}

export interface CreateResourcePayload {
  name: string;
  unesc_id: string;
  status: ResourceStatus;
  category_id: number;
  level_id: number;
  description?: string;
}

export interface UpdateResourcePayload extends Partial<CreateResourcePayload> {
  id: string;
}
