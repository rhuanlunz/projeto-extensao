import type { Resource, ResourcesByFloor } from "../services/resource.types";
import { ResourceFloorSection } from "./ResourceFloorSection";

interface ResourceGridProps {
  groupedResources: ResourcesByFloor;
  onResourceClick: (resource: Resource) => void;
}

export function ResourceGrid({ groupedResources, onResourceClick }: ResourceGridProps) {
  const floors = Object.keys(groupedResources).sort();

  return (
    <div className="space-y-2">
      {floors.map((floor) => (
        <ResourceFloorSection
          key={floor}
          floorName={floor}
          resources={groupedResources[floor]}
          onResourceClick={onResourceClick}
        />
      ))}
    </div>
  );
}
