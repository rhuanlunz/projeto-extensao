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
        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
        aria-label="Fechar"
      >
        <X className="h-6 w-6" />
      </button>
    </div>
  );
}
