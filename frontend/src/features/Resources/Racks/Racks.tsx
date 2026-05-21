import { mockRacks } from "@/mocks/mockRacks";
import { groupResourcesByFloor } from "./services/groupResourcesByFloor";
import { ResourceSummaryHeader } from "./components/ResourceSummaryHeader";
import { FloorSection } from "./components/FloorSection";
import { FloatingActionButton } from "./components/FloatingActionButton";

export function Racks() {
  const racksByFloor = groupResourcesByFloor(mockRacks);
  const floors = Object.keys(racksByFloor).sort();

  return (
    <div className="min-h-screen bg-[#EEF3F7] p-10">
      <div className="mx-auto max-w-7xl">
        {/* Header de Resumo */}
        <ResourceSummaryHeader racks={mockRacks} />

        {/* Seções por Andar */}
        <div className="space-y-2">
          {floors.map((floor) => (
            <FloorSection key={floor} floor={floor} racks={racksByFloor[floor]} />
          ))}
        </div>
      </div>

      {/* Botão Flutuante */}
      <FloatingActionButton />
    </div>
  );
}
