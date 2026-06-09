import type { Resource, ResourcesByFloor } from "../services/resource.types";
import { ResourceCard } from "./ResourceCard";

interface ResourceGridProps {
  groupedResources: ResourcesByFloor;
  onResourceClick: (resource: Resource) => void;
}

export function ResourceGrid({ groupedResources, onResourceClick }: ResourceGridProps) {
  const floors = Object.keys(groupedResources).sort();

  return (
    <div className="space-y-2">
      {floors.map((floor) => (
        <section key={floor} className="mb-8 md:mb-12">
          <div className="mb-4 md:mb-6 flex items-center gap-4">
            <h2 className="whitespace-nowrap text-lg font-semibold text-slate-800">
              {floor}
            </h2>
            <div className="h-px w-full bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {groupedResources[floor].map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onClick={() => onResourceClick(resource)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
