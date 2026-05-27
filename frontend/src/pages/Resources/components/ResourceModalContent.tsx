import { ScrollArea } from "@/components/ui/scroll-area";

interface ResourceModalContentProps {
  description?: string;
}

export function ResourceModalContent({ description }: ResourceModalContentProps) {
  return (
    <div className="mt-4 w-full max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
      <ScrollArea className="h-[120px] w-full">
        <p className="w-full max-w-full whitespace-pre-line break-words [overflow-wrap:anywhere] text-sm leading-relaxed text-slate-700">
          {description || "Nenhuma descrição disponível para este recurso."}
        </p>
      </ScrollArea>
    </div>
  );
}
