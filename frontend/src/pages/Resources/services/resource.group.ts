import type { Resource, ResourcesByFloor, FloorStat } from "./resource.types";

/**
 * Agrupa recursos por andar para exibição na grid.
 */
export function groupResourcesByFloor(resources: Resource[]): ResourcesByFloor {
  return resources.reduce((acc: ResourcesByFloor, resource) => {
    const floorKey = resource.level.name;
    if (!acc[floorKey]) {
      acc[floorKey] = [];
    }
    acc[floorKey].push(resource);
    return acc;
  }, {});
}

/**
 * Calcula estatísticas de recursos por andar para o sumário.
 */
export function calculateResourceStats(resources: Resource[]): FloorStat[] {
  const statsMap = resources.reduce((acc: Record<string, number>, resource) => {
    const floorName = resource.level.name;
    acc[floorName] = (acc[floorName] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(statsMap)
    .sort()
    .map((floorName) => ({
      floor: floorName,
      count: statsMap[floorName],
    }));
}
