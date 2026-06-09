import { Server } from "lucide-react";

interface ResourceFormImageProps {
  imageUrl?: string;
  name?: string;
}

export function ResourceFormImage({ imageUrl, name }: ResourceFormImageProps) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[#E0F2FF] border border-blue-100 flex items-center justify-center p-6 md:aspect-auto md:h-full min-h-70">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name || "Preview do recurso"}
          className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
          width={400}
          height={400}
        />
      ) : (
        <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-700">
          <Server className="h-20 w-20 text-[#0085FF]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Recurso Institucional
          </span>
        </div>
      )}
      
      {/* Overlay decorativo institucional sutil */}
      <div className="absolute inset-0 bg-linear-to-tr from-blue-500/5 via-transparent to-white/50 pointer-events-none" />
    </div>
  );
}
