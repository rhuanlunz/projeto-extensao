import { Plus } from "lucide-react";

interface ResourceAddButtonProps {
  onClick: () => void;
}

export function ResourceAddButton({ onClick }: ResourceAddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#0085FF] text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
      aria-label="Adicionar novo recurso"
    >
      <Plus className="h-8 w-8" />
    </button>
  );
}
