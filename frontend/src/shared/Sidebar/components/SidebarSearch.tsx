import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SidebarSearchProps {
  onSearch: (term: string) => void;
}

export function SidebarSearch({ onSearch }: SidebarSearchProps) {
  return (
    <div className="px-3 pb-6">
      <div className="relative">
        <Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Pesquisar..."
          className="h-10 border border-slate-100 bg-slate-50 pl-12 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-primary/20"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
