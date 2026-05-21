import { Server } from "lucide-react";
import type { Rack } from "../services/racks.types";

interface ResourceCardProps {
  rack: Rack;
}

export function ResourceCard({ rack }: ResourceCardProps) {
  const isAvailable = rack.status === "available";

  return (
    <div className="flex flex-col items-center rounded-xl bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)] w-[180px]">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E0F2FF]">
        <Server className="h-8 w-8 text-[#0085FF]" />
      </div>

      <h3 className="mb-2 text-center font-medium text-slate-900">{rack.name}</h3>

      <div className="mt-auto flex items-center gap-2">
        <div
          className={`h-2.5 w-2.5 rounded-full ${
            isAvailable ? "bg-[#22C55E]" : "bg-[#EF4444]"
          }`}
        />
        <span
          className={`text-xs font-medium ${
            isAvailable ? "text-[#22C55E]" : "text-[#EF4444]"
          }`}
        >
          {isAvailable ? "Disponível" : "Indisponível"}
        </span>
      </div>
    </div>
  );
}
