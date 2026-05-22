import { useMemo, useState } from "react";
import { Sidebar } from "@/shared/Sidebar/Sidebar";
import { ResourceHeader } from "./components/ResourceHeader";
import { ResourceGrid } from "./components/ResourceGrid";
import { ResourceFilters } from "./components/ResourceFilters";
import { ResourceAddButton } from "./components/ResourceAddButton";
import { ResourceDetailsModal } from "./components/ResourceDetailsModal";

import { mockResources } from "./services/resource.mock";
import { groupResourcesByFloor, calculateResourceStats } from "./services/resource.group";
import type { Resource } from "./services/resource.types";

export function Resources() {
  // Estado para controle do modal e recurso selecionado
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  // Processamento de dados via services (memoizado para performance)
  const groupedResources = useMemo(() => groupResourcesByFloor(mockResources), []);
  const resourceStats = useMemo(() => calculateResourceStats(mockResources), []);

  const handleSelectResource = (resource: Resource) => {
    setSelectedResource(resource);
  };

  const handleCloseModal = () => {
    setSelectedResource(null);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar Global */}
      <Sidebar />

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-auto bg-[#EEF3F7] p-10">
        <div className="mx-auto max-w-7xl">
          {/* Banner de Resumo */}
          <ResourceHeader stats={resourceStats} />

          {/* Filtros (Placeholder) */}
          <ResourceFilters />

          {/* Grid de Recursos agrupados por andar */}
          <ResourceGrid
            groupedResources={groupedResources}
            onResourceClick={handleSelectResource}
          />
        </div>

        {/* Botão de Ação Flutuante */}
        <ResourceAddButton />
      </main>

      {/* Modal de Detalhes do Recurso */}
      <ResourceDetailsModal
        open={!!selectedResource}
        resource={selectedResource}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Resources;
