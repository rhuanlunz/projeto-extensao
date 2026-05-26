import { Server } from "lucide-react";

interface ResourceModalImageProps {
  imageUrl?: string;
  name: string;
}

export function ResourceModalImage({ imageUrl, name }: ResourceModalImageProps) {
  return (
    <div className="flex h-full min-h-[200px] w-full items-center justify-center rounded-xl bg-[#E0F2FF] lg:w-[240px]">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full rounded-xl object-cover"
        />
      ) : (
        <Server className="h-24 w-24 text-[#0085FF]" />
      )}
    </div>
  );
}
