export type ResourceStatus = "disponivel" | "indisponivel";

export interface Category {
  id: number;
  name: string;
}

export interface Level {
  id: number;
  name: string;
}

export interface Resource {
  id: string | number;
  name: string;
  unesc_id: string;
  status: ResourceStatus;
  description?: string;
  imageUrl?: string;
  category: Category;
  level: Level;
}

export type ResourcesByFloor = Record<string, Resource[]>;

export interface FloorStat {
  floor: string;
  count: number;
}
