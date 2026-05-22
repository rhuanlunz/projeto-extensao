export function SidebarHeader() {
  return (
    <div className="flex items-center gap-3 px-3 py-8">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ml-3">
        {/* Placeholder para o logo oficial da UNESC */}
        <span className="text-xl font-bold text-primary">U</span>
      </div>
      <h1 className="text-xl font-semibold tracking-tight text-primary">
        Recursos
      </h1>
    </div>
  );
}
