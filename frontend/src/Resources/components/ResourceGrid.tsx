import type { ResourcesByFloor } from "../services/resource.types";
import { ResourceFloorSection } from "./ResourceFloorSection";

interface ResourceGridProps {
  groupedResources: ResourcesByFloor;
}

export function ResourceGrid({ groupedResources }: ResourceGridProps) {
  const floors = Object.keys(groupedResources).sort();

  return (
    <div className="space-y-2">
      {floors.map((floor) => (
        <ResourceFloorSection
          key={floor}
          floorName={floor}
          resources={groupedResources[floor]}
        />
      ))}
    </div>
  );
}
