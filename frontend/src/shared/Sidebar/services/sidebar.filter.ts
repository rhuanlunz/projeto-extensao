import type { SidebarElement, SidebarGroup } from "./sidebar.types";

export const filterSidebarItems = (
  items: SidebarElement[],
  searchTerm: string
): SidebarElement[] => {
  const normalizedTerm = searchTerm.toLowerCase().trim();

  if (!normalizedTerm) return items;

  return items
    .map((item) => {
      // Se for um item simples, verifica o label
      if (!("children" in item)) {
        return item.label.toLowerCase().includes(normalizedTerm) ? item : null;
      }

      // Se for um grupo (accordion)
      const group = item as SidebarGroup;
      
      // Verifica se o próprio grupo coincide
      const groupMatches = group.label.toLowerCase().includes(normalizedTerm);

      // Filtra os filhos do grupo
      const filteredChildren = group.children.filter((child) =>
        child.label.toLowerCase().includes(normalizedTerm)
      );

      // Se o grupo ou qualquer filho coincidir, retorna o grupo com os filhos filtrados
      if (groupMatches || filteredChildren.length > 0) {
        return {
          ...group,
          children: groupMatches ? group.children : filteredChildren,
        };
      }

      return null;
    })
    .filter((item): item is SidebarElement => item !== null);
};
