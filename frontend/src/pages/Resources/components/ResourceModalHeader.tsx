import { X } from "lucide-react";

interface ResourceModalHeaderProps {
  name: string;
  onClose: () => void;
}

export function ResourceModalHeader({ name, onClose }: ResourceModalHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0056A4]">{name}</h2>
      <button
        onClick={onClose}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0085FF] text-white transition-colors hover:bg-[#0056A4]"
        aria-label="Fechar"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
