import { Button } from "@/components/ui/button";

export function ResourceModalActions() {
  return (
    <div className="flex justify-start">
      <Button
        className="h-11 px-8 rounded-xl bg-[#0085FF] hover:bg-[#0074E0] text-white font-semibold transition-all active:scale-95 shadow-lg shadow-blue-200"
      >
        Editar
      </Button>
    </div>
  );
}
