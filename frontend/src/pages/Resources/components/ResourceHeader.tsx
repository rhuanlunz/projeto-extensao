import type { FloorStat } from "../services/resource.types";

interface ResourceHeaderProps {
  stats: FloorStat[];
}

export function ResourceHeader({ stats }: ResourceHeaderProps) {
  return (
    <div className="mb-8 md:mb-10 flex w-full flex-col lg:flex-row items-start lg:items-center justify-between rounded-2xl bg-[#0085FF] p-6 md:p-10 text-white shadow-lg gap-8">
      <div className="max-w-md">
        <h1 className="mb-2 text-2xl md:text-3xl font-bold tracking-tight">Status dos Recursos</h1>
        <p className="text-blue-100 opacity-90 text-sm md:text-base">
          Acompanhe a distribuição dos recursos pelos andares
        </p>
      </div>

      <div className="flex flex-wrap gap-3 md:gap-4 w-full lg:w-auto">
        {stats.map((stat) => (
          <div
            key={stat.floor}
            className="flex flex-1 min-w-25 flex-col items-center rounded-xl bg-white/10 p-3 md:p-4 backdrop-blur-sm"
          >
            <span className="text-xl md:text-2xl font-bold">
              {String(stat.count).padStart(2, "0")}
            </span>
            <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider opacity-90 whitespace-nowrap">
              {stat.floor}º Andar
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
