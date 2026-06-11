import type { ResourceStatus as StatusType } from "../services/resource.types";

interface ResourceStatusProps {
  status: StatusType;
}

export function ResourceStatus({ status }: ResourceStatusProps) {
  const isAvailable = status === "disponivel";

  return (
    <div className="mt-auto flex items-center gap-2.5">
      <div
        className={`h-3 w-3 rounded-full ${
          isAvailable ? "bg-[#22C55E]" : "bg-[#EF4444]"
        }`}
      />
      <span
        className={`text-sm font-medium ${
          isAvailable ? "text-[#22C55E]" : "text-[#EF4444]"
        }`}
      >
        {isAvailable ? "Disponível" : "Indisponível"}
      </span>
    </div>
  );
}

