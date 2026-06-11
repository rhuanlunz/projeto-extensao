import type { Resource, ResourcesByFloor } from "../services/resource.types";
import { ResourceFloorSection } from "./ResourceFloorSection";
import { PackageOpen } from "lucide-react";

interface ResourceGridProps {
  groupedResources: ResourcesByFloor;
  onResourceClick: (resource: Resource) => void;
}

export function ResourceGrid({ groupedResources, onResourceClick }: ResourceGridProps) {
  const floors = Object.keys(groupedResources).sort();

  if (floors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-200 animate-in fade-in zoom-in duration-300">
        <div className="bg-slate-100 p-4 rounded-full mb-4">
          <PackageOpen className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-700 mb-1">Nenhum recurso encontrado</h3>
        <p className="text-slate-500 max-w-sm">
          Não existem recursos disponíveis para exibição no momento. Tente selecionar outra categoria ou verificar as configurações.
        </p>
      </div>
    );
  }

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
