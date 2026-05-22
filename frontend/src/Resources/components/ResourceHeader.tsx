import type { FloorStat } from "../services/resource.types";

interface ResourceHeaderProps {
  stats: FloorStat[];
}

export function ResourceHeader({ stats }: ResourceHeaderProps) {
  return (
    <div className="mb-10 flex w-full items-center justify-between rounded-2xl bg-[#0085FF] p-10 text-white shadow-lg">
      <div className="max-w-md">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Status dos Recursos</h1>
        <p className="text-blue-100 opacity-90">
          Acompanhe a distribuição dos recursos pelos andares
        </p>
      </div>

      <div className="flex gap-4">
        {stats.map((stat) => (
          <div
            key={stat.floor}
            className="flex min-w-[100px] flex-col items-center rounded-xl bg-white/10 p-4 backdrop-blur-sm"
          >
            <span className="text-2xl font-bold">
              {String(stat.count).padStart(2, "0")}
            </span>
            <span className="text-xs font-medium uppercase tracking-wider opacity-90">
              {stat.floor}º Andar
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
