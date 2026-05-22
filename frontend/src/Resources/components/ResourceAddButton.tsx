import { Plus } from "lucide-react";

export function ResourceAddButton() {
  return (
    <button
      className="fixed bottom-10 right-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#0085FF] text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
      aria-label="Adicionar novo recurso"
    >
      <Plus className="h-8 w-8" />
    </button>
  );
}
