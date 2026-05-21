export interface Rack {
  id: string;
  name: string;
  floor: number;
  status: "available" | "unavailable";
}

export interface RacksByFloor {
  [key: string]: Rack[];
}
