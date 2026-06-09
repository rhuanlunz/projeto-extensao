import { Server } from "lucide-react";

interface ResourceModalImageProps {
  imageUrl?: string;
  name: string;
}

export function ResourceModalImage({ imageUrl, name }: ResourceModalImageProps) {
  return (
    <div className="flex h-full min-h-60 w-full items-center justify-center rounded-3xl bg-[#E0F2FF] lg:w-70">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full rounded-3xl object-cover"
        />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <Server className="h-20 w-20 text-[#0085FF]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#0085FF]/60">
            Institucional
          </span>
        </div>
      )}
    </div>
  );
}
