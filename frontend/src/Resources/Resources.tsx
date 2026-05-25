import { useEffect, useMemo, useState } from "react";
import { Sidebar, SidebarToggle } from "@/shared/Sidebar";
import { ResourceHeader } from "./components/ResourceHeader";
import { ResourceGrid } from "./components/ResourceGrid";
import { ResourceFilters } from "./components/ResourceFilters";
import { ResourceAddButton } from "./components/ResourceAddButton";
import { ResourceDetailsModal } from "./components/ResourceDetailsModal";
import { ResourceFormModal } from "./components/ResourceFormModal";

import { groupResourcesByFloor, calculateResourceStats } from "./services/resource.group";
import type { Resource } from "./services/resource.types";
import { getResources, createResource, updateResource } from "./services/resourceForm.service";
import type { ResourceFormValues } from "./schemas/resourceForm.schema";
import { toast, Toaster } from "sonner";

export function Resources() {
  // Estado para a lista de recursos (Source of Truth)
  const [resources, setResources] = useState<Resource[]>([]);

  // Estado para controle do modal de detalhes
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  // Estado para controle do modal de formulário (cadastro/edição)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState<Resource | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado para controle de visibilidade da Sidebar
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Carregamento inicial via Service
  useEffect(() => {
    const fetchResources = async () => {
      const data = await getResources();
      setResources(data);
    };
    fetchResources();
  }, []);

  // Processamento de dados via services (memoizado para performance)
  const groupedResources = useMemo(() => groupResourcesByFloor(resources), [resources]);
  const resourceStats = useMemo(() => calculateResourceStats(resources), [resources]);

  const handleSelectResource = (resource: Resource) => {
    setSelectedResource(resource);
  };

  const handleCloseModal = () => {
    setSelectedResource(null);
  };

  const handleOpenAddModal = () => {
    setResourceToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    if (!isSubmitting) {
      setIsFormModalOpen(false);
      setResourceToEdit(null);
    }
  };

  const handleFormSubmit = async (values: ResourceFormValues) => {
    setIsSubmitting(true);
    try {
      if (resourceToEdit) {
        const updated = await updateResource(resourceToEdit.id, values);
        setResources(prev => prev.map(r => r.id === updated.id ? updated : r));
        toast.success("Recurso atualizado com sucesso!");
      } else {
        const created = await createResource(values);
        setResources(prev => [created, ...prev]);
        toast.success("Recurso cadastrado com sucesso!");
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast.error("Erro ao salvar recurso. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShowSidebar = () => setIsSidebarVisible(true);
  const handleHideSidebar = () => setIsSidebarVisible(false);

  return (
    <div className="flex h-screen w-full overflow-x-hidden overflow-y-hidden">
      <Toaster position="top-right" richColors />

      {/* Botão Flutuante para Reabertura */}
      <SidebarToggle visible={!isSidebarVisible} onOpen={handleShowSidebar} />

      {/* Sidebar Global */}
      <Sidebar visible={isSidebarVisible} onClose={handleHideSidebar} />

      {/* Conteúdo Principal */}
      <main className="flex-1 min-w-0 overflow-auto bg-[#EEF3F7] p-10">
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
        <ResourceAddButton onClick={handleOpenAddModal} />
      </main>

      {/* Modal de Detalhes do Recurso */}
      <ResourceDetailsModal
        open={!!selectedResource}
        resource={selectedResource}
        onClose={handleCloseModal}
      />

      {/* Modal de Formulário (Cadastro/Edição) */}
      <ResourceFormModal 
        open={isFormModalOpen}
        onOpenChange={handleCloseFormModal}
        initialData={resourceToEdit}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        mode={resourceToEdit ? "edit" : "create"}
      />
    </div>
  );
}

export default Resources;
