import { useEffect, useMemo, useState, useRef } from "react";
import { Sidebar, SidebarToggle } from "@/shared/Sidebar";
import { ResourceHeader } from "./components/ResourceHeader";
import { ResourceGrid } from "./components/ResourceGrid";
import { ResourceAddButton } from "./components/ResourceAddButton";
import { ResourceDetailsModal } from "./components/ResourceDetailsModal";
import { ResourceFormModal } from "./components/ResourceFormModal";

import type { Resource, ResourcesByFloor } from "./services/resource.types";
import { getResourcesGrouped, createResource, updateResource, deleteResource, updateResourceStatus } from "./services/resourceForm.service";
import type { ResourceFormValues } from "./schemas/resourceForm.schema";
import { toast, Toaster } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export function Resources() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isTeacher = user?.role === 'teacher';
  const canManage = isAdmin;
  const canEditStatus = isAdmin || isTeacher;

  // Estado para a lista de recursos (Agrupados pela API)
  const [groupedResources, setGroupedResources] = useState<ResourcesByFloor>({});
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
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
  const fetchResources = async () => {
    try {
      const data = await getResourcesGrouped();
      setGroupedResources(data);
    } catch {
      toast.error("Erro ao carregar recursos.");
    }
  };

  useEffect(() => {
    fetchResources();
  }, [selectedCategoryId]);

  // Filtragem e Cálculo de estatísticas (memoizado para performance)
  const filteredResources = useMemo(() => {
    if (selectedCategoryId === null) return groupedResources;

    const filtered: ResourcesByFloor = {};
    Object.entries(groupedResources).forEach(([floor, items]) => {
      const filteredItems = items.filter(item => item.category.id === selectedCategoryId);
      if (filteredItems.length > 0) {
        filtered[floor] = filteredItems;
      }
    });
    return filtered;
  }, [groupedResources, selectedCategoryId]);

  const resourceStats = useMemo(() => {
    return Object.entries(filteredResources).map(([floorName, items]) => ({
      floorName,
      count: items.length
    }));
  }, [filteredResources]);

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
    requestAnimationFrame(() => {
      setResourceToEdit(resource);
      setIsFormModalOpen(true);
    });
  };

  const handleDeleteResource = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este recurso?")) return;
    try {
      await deleteResource(id);
      toast.success("Recurso excluído com sucesso!");
      fetchResources();
      setSelectedResource(null);
    } catch {
      toast.error("Erro ao excluir recurso.");
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateResourceStatus(id, newStatus);
      toast.success("Status atualizado com sucesso!");
      fetchResources();
      setSelectedResource(null);
    } catch {
      toast.error("Erro ao atualizar status.");
    }
  };

  const handleFormSubmit = async (values: ResourceFormValues) => {
    setIsSubmitting(true);
    try {
      if (resourceToEdit) {
        await updateResource(resourceToEdit.id, values as any);
        toast.success("Recurso atualizado com sucesso!");
      } else {
        await createResource(values as any);
        toast.success("Recurso cadastrado com sucesso!");
      }
      fetchResources();
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
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        toggleRef.current?.focus();
      }, 300);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-x-hidden overflow-y-hidden bg-[#EEF3F7]">
      <Toaster position="top-right" richColors />

      <SidebarToggle 
        ref={toggleRef}
        visible={!isSidebarVisible} 
        onOpen={handleShowSidebar} 
      />

      <Sidebar 
        visible={isSidebarVisible} 
        onClose={handleHideSidebar} 
        onSelectCategory={setSelectedCategoryId}
        selectedCategoryId={selectedCategoryId}
      />

      <main className="flex-1 min-w-0 overflow-auto p-4 sm:p-6 md:p-10 pt-20 lg:pt-10 pb-safe pr-safe pl-safe transition-all duration-300">
        <div className="mx-auto max-w-7xl">
          <ResourceHeader stats={resourceStats} />

          <ResourceGrid
            groupedResources={filteredResources}
            onResourceClick={handleSelectResource}
          />
        </div>

        {canManage && (
          <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-30">
            <ResourceAddButton onClick={handleOpenAddModal} />
          </div>
        )}
      </main>

      <ResourceDetailsModal
        open={!!selectedResource}
        resource={selectedResource}
        onClose={handleCloseModal}
        onEdit={handleEditResource}
        onDelete={handleDeleteResource}
        onStatusToggle={handleStatusUpdate}
        canEdit={canManage}
        canToggleStatus={canEditStatus}
      />

      <ResourceFormModal 
        open={isFormModalOpen}
        onOpenChange={handleCloseFormModal}
        initialData={resourceToEdit}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        defaultCategoryId={selectedCategoryId}
      />
    </div>
  );
}

export default Resources;
