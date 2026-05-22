import type { Resource } from "../services/resource.types";
import { ResourceCard } from "./ResourceCard";

interface ResourceFloorSectionProps {
  floorName: string;
  resources: Resource[];
}

export function ResourceFloorSection({ floorName, resources }: ResourceFloorSectionProps) {
  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center gap-4">
        <h2 className="whitespace-nowrap text-lg font-semibold text-slate-800">
          {floorName}
        </h2>
        <div className="h-[1px] w-full bg-slate-200" />
      </div>

      <div className="flex flex-wrap gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}
