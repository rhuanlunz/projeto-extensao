import type { Rack } from "../services/racks.types";

interface ResourceSummaryHeaderProps {
  racks: Rack[];
}

export function ResourceSummaryHeader({ racks }: ResourceSummaryHeaderProps) {
  // Calcular totais por andar
  const floorStats = racks.reduce((acc: Record<number, number>, rack) => {
    acc[rack.floor] = (acc[rack.floor] || 0) + 1;
    return acc;
  }, {});

  const sortedFloors = Object.keys(floorStats)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="mb-10 flex w-full items-center justify-between rounded-2xl bg-[#0085FF] p-10 text-white shadow-lg">
      <div className="max-w-md">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Status dos Racks</h1>
        <p className="text-blue-100 opacity-90">
          Acompanhe a distribuição dos racks pelos andares
        </p>
      </div>

      <div className="flex gap-4">
        {sortedFloors.map((floor) => (
          <div
            key={floor}
            className="flex min-w-[100px] flex-col items-center rounded-xl bg-white/10 p-4 backdrop-blur-sm"
          >
            <span className="text-2xl font-bold">
              {String(floorStats[floor]).padStart(2, "0")}
            </span>
            <span className="text-xs font-medium uppercase tracking-wider opacity-90">
              {floor}º Andar
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
