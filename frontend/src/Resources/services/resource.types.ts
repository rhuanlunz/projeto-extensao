export type ResourceStatus = "available" | "unavailable";

export interface Resource {
  id: string;
  name: string;
  floor: number;
  status: ResourceStatus;
}

export type ResourcesByFloor = Record<string, Resource[]>;

export interface FloorStat {
  floor: number;
  count: number;
}
