import { Sidebar } from "@/features/Resources/Sidebar/Sidebar";
import { Racks } from "@/features/Resources/Racks/Racks";

export function App() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar Global */}
      <Sidebar />

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-auto">
        <Racks />
      </main>
    </div>
  );
}

export default App;
