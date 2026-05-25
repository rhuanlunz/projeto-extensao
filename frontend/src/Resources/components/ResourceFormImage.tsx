interface ResourceFormImageProps {
  imageUrl?: string;
  name?: string;
}

export function ResourceFormImage({ imageUrl, name }: ResourceFormImageProps) {
  const finalImageUrl = imageUrl || "/rack-preset.png";

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#d9d9d9]/20 md:aspect-auto md:h-full">
      <img
        src={finalImageUrl}
        alt={name || "Preview do recurso"}
        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
      />
      
      {/* Overlay decorativo institucional */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </div>
  );
}
