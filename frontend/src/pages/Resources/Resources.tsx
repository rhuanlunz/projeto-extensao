import { useEffect, useMemo, useState, useRef } from "react";
import { Sidebar, SidebarToggle } from "@/shared/Sidebar";
import { ResourceHeader } from "./components/ResourceHeader";
import { ResourceGrid } from "./components/ResourceGrid";
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
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Estado para controle do modal de detalhes
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  // Estado para controle do modal de formulário (cadastro/edição)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState<Resource | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado para controle de visibilidade da Sidebar
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Blindagem de Hydration & Responsividade: Gerenciamento de estado da Sidebar e Scroll Lock
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) { // lg breakpoint
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
    };

    // Executa no mount inicial
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Blindagem de Scroll Lock para Sidebar Mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile && isSidebarVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarVisible]);

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

  const handleEditResource = (resource: Resource) => {
    setSelectedResource(null);
    // Blindagem de UI: requestAnimationFrame evita conflitos de overlay/focus trap
    requestAnimationFrame(() => {
      setResourceToEdit(resource);
      setIsFormModalOpen(true);
    });
  };

  const handleFormSubmit = async (values: ResourceFormValues) => {
    setIsSubmitting(true);
    try {
      if (resourceToEdit) {
        const updated = await updateResource(resourceToEdit.id, values);
        if (!updated) return;
        setResources(prev => prev.map(r => r.id === updated.id ? updated : r));
        toast.success("Recurso atualizado com sucesso!");
      } else {
        const created = await createResource(values);
        if (!created) return;
        setResources(prev => [created, ...prev]);
        toast.success("Recurso cadastrado com sucesso!");
      }
      setIsFormModalOpen(false);
      setResourceToEdit(null);
    } catch {
      toast.error("Erro ao salvar recurso. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShowSidebar = () => setIsSidebarVisible(true);
  const handleHideSidebar = () => {
    setIsSidebarVisible(false);
    // Retorna o foco para o botão de toggle ao fechar a sidebar em mobile
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        toggleRef.current?.focus();
      }, 300); // Aguarda a animação
    }
  };

  return (
    <div className="flex h-screen w-full overflow-x-hidden overflow-y-hidden bg-[#EEF3F7]">
      <Toaster position="top-right" richColors />

      {/* Botão Flutuante para Reabertura */}
      <SidebarToggle 
        ref={toggleRef}
        visible={!isSidebarVisible} 
        onOpen={handleShowSidebar} 
      />

      {/* Sidebar Global */}
      <Sidebar visible={isSidebarVisible} onClose={handleHideSidebar} />

      {/* Conteúdo Principal */}
      <main className="flex-1 min-w-0 overflow-auto p-4 sm:p-6 md:p-10 pt-20 lg:pt-10 pb-safe pr-safe pl-safe transition-all duration-300">
        <div className="mx-auto max-w-7xl">
          {/* Banner de Resumo */}
          <ResourceHeader stats={resourceStats} />

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
        onEdit={handleEditResource}
      />

      {/* Modal de Formulário (Cadastro/Edição) */}
      <ResourceFormModal 
        open={isFormModalOpen}
        onOpenChange={handleCloseFormModal}
        initialData={resourceToEdit}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default Resources;
