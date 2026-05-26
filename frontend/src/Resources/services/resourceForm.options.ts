import type { ResourceCategory, ResourceFloor, ResourceStatus } from "../types/resourceForm.types";

export const categoryOptions: { label: string; value: ResourceCategory }[] = [
  { label: "Rack", value: "Rack" },
  { label: "Switch", value: "Switch" },
  { label: "Server", value: "Server" },
  { label: "Other", value: "Other" },
];

export const floorOptions: { label: string; value: ResourceFloor }[] = [
  { label: "1º Andar", value: "first-floor" },
  { label: "2º Andar", value: "second-floor" },
  { label: "3º Andar", value: "third-floor" },
];

export const statusOptions: { label: string; value: ResourceStatus }[] = [
  { label: "Disponível", value: "available" },
  { label: "Indisponível", value: "unavailable" },
];
