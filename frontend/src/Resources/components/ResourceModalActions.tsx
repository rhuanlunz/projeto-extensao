import { Button } from "@/components/ui/button";

export function ResourceModalActions() {
  return (
    <div className="mt-4 flex justify-start">
      <Button
        className="rounded-full bg-[#0085FF] px-8 md:px-10 py-3 text-base font-semibold hover:bg-[#0056A4]"
      >
        Editar
      </Button>
    </div>
  );
}
