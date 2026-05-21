import { Sidebar } from "@/features/Resources/Sidebar/Sidebar";

export function App() {
  return (
    <div className="flex h-screen w-full bg-neutral-bg">
      {/* Sidebar Global */}
      <Sidebar />

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8">
            <h2 className="text-3xl font-bold text-[#0056A4]">Dashboard</h2>
            <p className="text-muted-foreground">
              Bem-vindo ao sistema de gerenciamento de recursos do Bloco B.
            </p>
          </header>

          <section className="grid gap-6 md:grid-cols-3">
            {/* Cards de exemplo (apenas para visualização do layout) */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <h3 className="mb-2 font-semibold">Andar {i}</h3>
                <p className="text-2xl font-bold text-primary">15 Recursos</p>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
