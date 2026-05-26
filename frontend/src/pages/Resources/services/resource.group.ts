import type { Resource, ResourcesByFloor, FloorStat } from "./resource.types";

/**
 * Agrupa recursos por andar para exibição na grid.
 */
export function groupResourcesByFloor(resources: Resource[]): ResourcesByFloor {
  return resources.reduce((acc: ResourcesByFloor, resource) => {
    const floorKey = `${resource.floor}º Andar`;
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
  const statsMap = resources.reduce((acc: Record<number, number>, resource) => {
    acc[resource.floor] = (acc[resource.floor] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(statsMap)
    .map(Number)
    .sort((a, b) => a - b)
    .map((floor) => ({
      floor,
      count: statsMap[floor],
    }));
}
