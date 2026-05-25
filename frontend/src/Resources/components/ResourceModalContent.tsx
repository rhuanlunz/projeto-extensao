import { ScrollArea } from "@/components/ui/scroll-area";

interface ResourceModalContentProps {
  description?: string;
}

export function ResourceModalContent({ description }: ResourceModalContentProps) {
  return (
    <ScrollArea className="h-[120px] w-full pr-4">
      <p className="text-base leading-relaxed text-slate-600">
        {description || "Nenhuma descrição disponível para este recurso."}
      </p>
    </ScrollArea>
  );
}
