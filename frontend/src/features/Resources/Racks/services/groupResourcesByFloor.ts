import type { Rack, RacksByFloor } from "./racks.types";

export function groupResourcesByFloor(racks: Rack[]): RacksByFloor {
  return racks.reduce((acc: RacksByFloor, rack) => {
    const floorKey = `${rack.floor}º Andar`;
    if (!acc[floorKey]) {
      acc[floorKey] = [];
    }
    acc[floorKey].push(rack);
    return acc;
  }, {});
}
