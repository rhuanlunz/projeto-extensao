import type { Rack } from "../services/racks.types";
import { ResourceCard } from "./ResourceCard";

interface FloorSectionProps {
  floor: string;
  racks: Rack[];
}

export function FloorSection({ floor, racks }: FloorSectionProps) {
  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center gap-4">
        <h2 className="whitespace-nowrap text-lg font-semibold text-slate-800">
          {floor}
        </h2>
        <div className="h-[1px] w-full bg-slate-200" />
      </div>

      <div className="flex flex-wrap gap-6">
        {racks.map((rack) => (
          <ResourceCard key={rack.id} rack={rack} />
        ))}
      </div>
    </section>
  );
}
