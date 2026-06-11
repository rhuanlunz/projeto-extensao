export type ResourceStatus = "disponivel" | "indisponivel";

export interface Resource {
  id: string;
  name: string;
  unesc_id: string;
  status: ResourceStatus;
  description?: string;
  imageUrl?: string;
  category: {
    id: number;
    name: string;
  };
  level: {
    id: number;
    name: string;
  };
}

export type ResourcesByFloor = Record<string, Resource[]>;

export interface FloorStat {
  floorName: string;
  count: number;
}
