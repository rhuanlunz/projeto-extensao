import type { Resource } from "../services/resource.types";
import { ResourceCard } from "./ResourceCard";

interface ResourceFloorSectionProps {
  floorName: string;
  resources: Resource[];
  onResourceClick: (resource: Resource) => void;
}

export function ResourceFloorSection({ floorName, resources, onResourceClick }: ResourceFloorSectionProps) {
  return (
    <section className="mb-8 md:mb-12">
      <div className="mb-4 md:mb-6 flex items-center gap-4">
        <h2 className="whitespace-nowrap text-lg font-semibold text-slate-800">
          {floorName}
        </h2>
        <div className="h-px w-full bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onClick={() => onResourceClick(resource)}
          />
        ))}
      </div>
    </section>
  );
}
