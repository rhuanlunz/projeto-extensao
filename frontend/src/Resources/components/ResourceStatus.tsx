import type { ResourceStatus as StatusType } from "../services/resource.types";

interface ResourceStatusProps {
  status: StatusType;
}

export function ResourceStatus({ status }: ResourceStatusProps) {
  const isAvailable = status === "available";

  return (
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
  );
}
