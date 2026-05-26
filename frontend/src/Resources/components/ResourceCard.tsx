import { Server } from "lucide-react";
import type { Resource } from "../services/resource.types";
import { ResourceStatus } from "./ResourceStatus";

interface ResourceCardProps {
  resource: Resource;
  onClick?: () => void;
}

export function ResourceCard({ resource, onClick }: ResourceCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center rounded-xl bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)] w-[180px] cursor-pointer transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E0F2FF]">
        <Server className="h-8 w-8 text-[#0085FF]" />
      </div>

      <h3 className="mb-2 text-center font-medium text-slate-900">{resource.name}</h3>

      <ResourceStatus status={resource.status} />
    </div>
  );
}
