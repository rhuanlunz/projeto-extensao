import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SidebarSearchProps {
  onSearch: (term: string) => void;
}

export function SidebarSearch({ onSearch }: SidebarSearchProps) {
  return (
    <div className="px-6 pb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <Input
          placeholder="Pesquisar..."
          className="h-10 border-none bg-white/10 pl-10 text-sm text-white placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-white/20"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
