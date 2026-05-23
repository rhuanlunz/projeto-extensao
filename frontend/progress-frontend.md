# progress-frontend.md

## Regras Obrigatórias

- Este arquivo é APPEND-ONLY
- Nunca alterar, remover ou reescrever entradas antigas
- Apenas adicionar novas entradas ao final do arquivo
- Toda alteração relevante no frontend deve ser documentada
- A IA DEVE ler:
  - `PRD.md`
  - `PRD-frontend.md`
  antes de implementar qualquer funcionalidade
- Nenhuma alteração estrutural deve ser feita sem documentação
- Humanos podem complementar informações posteriormente
- Toda entrada deve ser contextual e objetiva
- NÃO registrar diffs técnicos extensos
- Focar em:
  - contexto
  - objetivo
  - impacto
  - motivação da alteração

---

## 21/05/2026

### Contexto
Implementação da Sidebar global reutilizável para o sistema de gerenciamento de recursos, seguindo a arquitetura modular baseada em features.

### Alterações realizadas
- Criação da estrutura modular em `src/features/Resources/Sidebar/`.
- Implementação de 7 componentes isolados: `SidebarHeader`, `SidebarSearch`, `SidebarMenu`, `SidebarMenuItem`, `SidebarAccordion`, `SidebarFooter` e `SidebarUser`.
- Criação da camada de serviços: `sidebar.types.ts` (contratos), `sidebar.mock.ts` (dados dinâmicos) e `sidebar.filter.ts` (lógica de busca pura).
- Orquestração visual em `Sidebar.tsx` (sem lógica de negócio interna).
- Atualização do tema global `index.css` com as cores oficiais: Primária (#0085FF), Secundária (#0056A4) e Neutra (#E0F2FF).
- Integração da Sidebar no layout principal em `App.tsx`.
- Instalação de componentes Shadcn/UI: Accordion, Input, Avatar, Separator e ScrollArea.

### Motivo
Garantir uma interface profissional, alinhada à identidade visual da UNESC, com arquitetura desacoplada que permite escalabilidade, facilidade de manutenção e isolamento da feature de Resources.


---

## 21/05/2026 (Correção)

### Contexto
Resolução da falha de renderização (tela branca) ocorrão após a implementação da Sidebar modular.

### Alterações realizadas
- **Roteamento**: Adicionada rota raiz (`/`) e rota de fallback (`*`) em `main.tsx` para garantir que o componente `App` seja renderizado corretamente.
- **Segurança de Renderização**: Implementada verificação condicional para ícones em `SidebarAccordion.tsx`, evitando crashes caso o ícone seja indefinido.
- **Ajuste de UI**: Removido ícone `ChevronDown` manual do `SidebarAccordion.tsx`, eliminando redundância com o componente base do Shadcn/UI.

### Motivo
A aplicação apresentava tela branca pois não havia uma rota definida para o caminho raiz (`/`). Além disso, componentes que renderizavam ícones sem validação apresentavam risco de crash durante o runtime.

### Impactos
- Aplicação volta a renderizar corretamente no caminho raiz.
- Interface da Sidebar mais limpa e livre de redundâncias visuais.
- Sistema mais resiliente a erros de dados ou imports em ícones.
- Build da aplicação restabelecido após correção de importações de tipos.

---

## 21/05/2026 (Correção Final)

### Contexto
Resolução definitiva da tela branca persistente após identificação de falha silenciosa no build causada por restrições do TypeScript.

### Alterações realizadas
- **TypeScript (verbatimModuleSyntax)**: Atualizadas todas as importações de interfaces e tipos para utilizar `import type` nos componentes e serviços da Sidebar.
- **Arquivos afetados**: `sidebar.types.ts`, `sidebar.filter.ts`, `sidebar.mock.ts`, `SidebarAccordion.tsx`, `SidebarMenu.tsx`, `SidebarMenuItem.tsx` e `SidebarUser.tsx`.

### Motivo
A configuração `verbatimModuleSyntax: true` no `tsconfig.app.json` exige que tipos e interfaces sejam importados explicitamente como `type`. A ausência dessa distinção estava impedindo a compilação correta dos novos componentes da Sidebar, resultando em falha de execução.

### Impactos
- Build volta a passar com sucesso (`npm run build` OK).
- Componentes da Sidebar agora são interpretados corretamente pelo runtime.

---

## 21/05/2026 (Refinamento Visual)

### Contexto
Ajuste fino visual da Sidebar Global para aumentar a fidelidade ao protótipo oficial e adequação à identidade visual institucional.

### Alterações realizadas
- **Fundo**: Alterada a cor de fundo da Sidebar de azul para branco sólido (`bg-white`), com adição de borda lateral suave (`border-r border-slate-100`).
- **Dimensões**: Reduzida a largura da Sidebar de `w-72` para `w-64` para proporcionar um layout mais equilibrado e fiel ao design proposto.
- **Identidade Visual**: Atualizada a cor do título "Recursos" e do placeholder do logo para o azul institucional (`#0085FF`), utilizando a cor primária do tema.
- **Hierarquia Visual**: Inserido componente `Separator` entre o cabeçalho e o campo de pesquisa para melhor distinção de seções.
- **Adaptação de Componentes**: Atualizados todos os subcomponentes da Sidebar (`Header`, `Search`, `Menu`, `Accordion` e `User`) com cores contrastantes (tons de slate) e estados de hover/active adequados para legibilidade sobre o novo fundo branco.

### Motivo
Melhorar a experiência do usuário através de um design mais limpo, minimalista e alinhado aos padrões institucionais, mantendo a sobriedade técnica exigida pelo sistema.

### Impactos
- Sidebar com aparência mais profissional e leve.
- Aumento da fidelidade visual em relação ao protótipo.
- Melhor legibilidade e contraste nos elementos de navegação e busca.

---

## 21/05/2026 (Reorganização Arquitetural)

### Contexto
Reorganização estrutural do projeto para alinhar com a arquitetura modular oficial, corrigindo a organização incorreta baseada em uma pasta global de `features`.

### Alterações realizadas
- **Remoção de /features**: A pasta `src/features` foi completamente removida do projeto.
- **Movimentação da Sidebar**: O componente Sidebar foi movido de `src/features/Resources/Sidebar` para `src/shared/Sidebar`, refletindo sua natureza de componente global compartilhado.
- **Criação da Feature Resources**: Criada a pasta `src/Resources` diretamente na raiz do `src`, contendo sua própria estrutura de `components`, `services` e o arquivo principal `Resources.tsx`.
- **Desacoplamento de App.tsx**: A dependência arquitetural do `App.tsx` como centralizador de layout foi removida. O arquivo `main.tsx` agora renderiza a feature `Resources` diretamente na rota raiz.
- **Estrutura de Layout**: Implementado container `flex h-screen` dentro de `Resources.tsx` para preservar o posicionamento da Sidebar e do conteúdo principal.
- **Atualização de Imports**: Todos os imports afetados pela movimentação (Sidebar, components, services) foram atualizados e validados.

### Motivo
Garantir que o projeto siga os padrões arquiteturais definidos no `PRD-frontend.md`, promovendo isolamento por feature na raiz do projeto e tratando componentes globais em `shared`.

### Impactos
- Arquitetura mais limpa e alinhada com as diretrizes do projeto.
- Facilidade de escalabilidade para novas features (ex: Auth, Dashboard).
- Eliminação de dependências circulares ou aninhamentos desnecessários em `/features`.
- Preservação integral da funcionalidade e comportamento da Sidebar.

---

## 21/05/2026 (Implementação Card 2)

### Contexto
Implementação da interface principal de visualização de recursos físicos (Racks), focada em fidelidade visual, renderização dinâmica e agrupamento por andar.

### Alterações realizadas
- **Estrutura Modular**: Criada a feature `Resources/Racks` seguindo o padrão modular.
- **Componentes de UI**:
    - `ResourceCard`: Visualização individual do rack com ícone, nome e status (disponível/indisponível) com indicador circular.
    - `FloorSection`: Agrupamento visual por andar com título e linha divisória.
    - `ResourceSummaryHeader`: Cabeçalho institucional azul (#0085FF) com indicadores dinâmicos de racks por andar.
    - `FloatingActionButton`: Botão circular flutuante visual para futuras ações de adição.
- **Camada de Serviços**:
    - `racks.types.ts`: Definição de contratos para racks e agrupamentos.
    - `groupResourcesByFloor.ts`: Lógica pura para transformar a lista de racks em seções por andar.
- **Mocks**: Criado `mockRacks.ts` com dados dinâmicos cobrindo múltiplos andares e status.
- **Integração**: Atualizado `App.tsx` para compor a Sidebar existente e a nova tela de Racks em um layout Flexbox limpo e eficiente.
- **Visual**: Aplicada a cor de fundo oficial `#EEF3F7` e paddings institucionais.

### Motivo
Prover a interface central de visualização do sistema, permitindo que os usuários acompanhem a distribuição e status dos racks de forma clara, organizada e visualmente alinhada à identidade da UNESC.

---

## 21/05/2026 (Padronização Arquitetural Resources)

### Contexto
Reorganização estrutural e arquitetural do módulo de visualização de recursos (Racks) para seguir rigorosamente o padrão oficial estabelecido pela Sidebar, focando em desacoplamento total, isolamento de lógica e composição limpa.

### Alterações realizadas
- **Consolidação de Feature**: O módulo foi completamente movido de `src/features/Resources/Racks` para `src/Resources/`, eliminando definitivamente o diretório legacy `/features`.
- **Extração de Services**: Implementada a separação obrigatória de lógicas em quatro serviços especializados:
    - `rack.types.ts`: Definições de contratos e interfaces.
    - `rack.mock.ts`: Isolamento de dados estáticos de exemplo.
    - `rack.group.ts`: Lógica pura de agrupamento por andar e cálculo de estatísticas (removida dos componentes).
    - `rack.filter.ts`: Placeholder para futuras lógicas de busca e filtragem.
- **Componentização Desacoplada**: Decomposição da UI em componentes de responsabilidade única:
    - `RackStatus`: Componente atômico para indicação visual de status (dot + label).
    - `RackCard`: Renderização individual do rack, utilizando `RackStatus`.
    - `RackFloorSection`: Renderização visual de um andar específico.
    - `RackGrid`: Orquestrador visual da listagem de andares, recebendo dados pré-processados.
    - `RackHeader`: Banner superior institucional, recebendo estatísticas via props.
    - `RackFilters` e `RackAddButton`: Componentes isolados para controles e ações.
- **Refatoração do Orquestrador**: `Resources.tsx` transformado em um orquestrador puro (idêntico ao padrão da Sidebar), utilizando `useMemo` estritamente para chamar serviços e distribuir props, sem implementar lógica de negócio interna.
- **Limpeza de Workspace**: Remoção total do diretório `src/features/` e do arquivo de mock global `src/mocks/mockRacks.ts`.
- **Atualização de App.tsx**: Refatorado para servir como um entry-point limpo para a feature de Resources.

### Motivo
Garantir consistência arquitetural em todo o frontend, utilizando a Sidebar como referência oficial. A alteração elimina componentes monolíticos, centraliza lógica de dados em serviços puros e prepara a feature para crescimento escalável e fácil manutenção.

---

## 21/05/2026 (Correção Semântica: Rack → Resource)

### Contexto
Alinhamento semântico do módulo de visualização de recursos com o domínio funcional do projeto, corrigindo o acoplamento excessivo ao termo técnico "Rack".

### Alterações realizadas
- **Correção de Domínio**: Substituída a nomenclatura específica `Rack` pela nomenclatura genérica `Resource` em toda a arquitetura do módulo.
- **Renomeação de Services**:
    - `rack.types.ts` → `resource.types.ts` (Interfaces: `Resource`, `ResourceStatus`, `ResourcesByFloor`).
    - `rack.mock.ts` → `resource.mock.ts` (Variável: `mockResources`).
    - `rack.group.ts` → `resource.group.ts` (Funções: `groupResourcesByFloor`, `calculateResourceStats`).
    - `rack.filter.ts` → `resource.filter.ts` (Função: `filterResources`).
- **Renomeação de Components**:
    - Todos os componentes técnicos (`RackHeader`, `RackGrid`, `RackCard`, etc.) foram renomeados para o prefixo `Resource`.
    - Atualização das Props e referências internas para refletir o novo domínio.
- **Ajuste de UI**: Atualizadas strings visuais (ex: "Status dos Racks" → "Status dos Recursos") para garantir consistência semântica para o usuário final.
- **Preservação Arquitetural**: Mantido o padrão de orquestração no `Resources.tsx` e o desacoplamento entre UI e Services, utilizando a Sidebar como referência.

### Motivo
Atender aos requisitos de domínio definidos no PRD, onde "Rack" é apenas um tipo de recurso. A estrutura técnica deve ser agnóstica ao tipo específico para permitir escalabilidade e clareza conceitual.

### Impactos
- Base de código mais limpa e alinhada com as regras de negócio.
- Arquitetura preparada para suportar outros tipos de recursos no futuro sem refatorações estruturais.
- Manutenção da fidelidade visual e funcionalidade de agrupamento por andar.
- Eliminação total de referências obsoletas ao termo `Rack` na estrutura de código do módulo.

## [2026-05-22] Card 3 — Modal de Visualização Detalhada de Recurso

### Implementação Concluída
- Adição da feature de modal detalhado para recursos físicos seguindo a arquitetura modular do projeto.
- Criação de componentes desacoplados em `src/Resources/components/`:
  - `ResourceDetailsModal.tsx`: Orquestrador visual do modal (Dialog).
  - `ResourceModalHeader.tsx`: Exibição do nome e botão de fechamento customizado.
  - `ResourceModalImage.tsx`: Renderização de imagem com fallback.
  - `ResourceModalContent.tsx`: Exibição de descrição com suporte a scroll.
  - `ResourceModalStatus.tsx`: Reutilização do componente `ResourceStatus`.
  - `ResourceModalActions.tsx`: Botão de edição (visual).
- Implementação de primitives de UI:
  - Criação de `src/components/ui/dialog.tsx` utilizando Radix UI.
- Atualização do domínio `Resource`:
  - Expansão da interface `Resource` em `resource.types.ts` com `description` e `imageUrl`.
  - Atualização de `resource.mock.ts` com dados descritivos para testes.
- Integração e Fluxo:
  - `Resources.tsx` centraliza o estado do modal e recurso selecionado (componente controlado).
  - `ResourceCard.tsx` dispara o evento de seleção via callback.
  - Propagação de eventos através de `ResourceGrid` e `ResourceFloorSection`.
- Padrões Visuais e Acessibilidade:
  - Overlay com `backdrop-blur-sm` e `bg-black/30`.
  - Layout horizontal (Imagem | Conteúdo).
  - Estilização institucional (bordas azuis, botões arredondados).
  - Suporte nativo Radix para ESC, focus trap e ARIA.
- Qualidade e Arquitetura:
  - Granularidade de props aplicada (subcomponentes recebem apenas dados necessários).
  - Preservação do desacoplamento e responsabilidade única.
  - Sem duplicação de lógica de status ou mocks.
  - Preparado para futura integração com backend e permissões.


---

## 22/05/2026 (Refinamento Visual do Modal de Detalhes)

### Contexto
Refinamento estético e arquitetural do ResourceDetailsModal para eliminar inconsistências visuais e melhorar a hierarquia de informação e legibilidade.

### Alterações realizadas
- **Arquitetura (Encapsulamento)**: Removido o botão de fechamento duplicado através do seletor CSS local [&>button]:hidden no DialogContent, preservando a integridade do componente global dialog.tsx.
- **Layout**: Expandida a largura máxima do modal de max-w-3xl para max-w-4xl para otimizar a distribuição horizontal entre imagem e conteúdo em desktop.
- **Hierarquia Tipográfica**:
    - **Título**: Aumentado para text-2xl md:text-3xl font-bold para maior destaque e adaptabilidade responsiva.
    - **Descrição**: Aumentada de text-sm para text-base, melhorando significativamente a legibilidade.
- **Ajustes de Proporção e UI**:
    - **Botão Editar**: Aumentado o padding para px-8 md:px-10 py-3 e aplicada fonte text-base font-semibold.
    - **Indicador de Status**: Redimensionado o indicador visual (bola) para h-3 w-3 e o texto para text-sm, com ajuste no espaçamento (gap-2.5).

### Motivo
Corrigir a poluição visual causada por botões duplicados e a sensação de "vazio" no layout do modal devido a fontes subdimensionadas para o espaço disponível.

### Impactos
- Interface mais limpa, profissional e fiel ao protótipo institucional.
- Melhor experiência de leitura e escaneabilidade do conteúdo do recurso.
- Manutenção da modularidade e isolamento de estilos do domínio Resources.

---

## 22/05/2026 (Sistema de Ocultação da Sidebar)

### Contexto
Implementação do sistema de ocultação completa da Sidebar para otimizar o espaço de trabalho e permitir foco total no conteúdo principal, seguindo a arquitetura modular e regras de acessibilidade.

### Alterações realizadas
- **Arquitetura**: Reorganização da Sidebar para `shared/Sidebar/components/`, separando a estrutura (`Sidebar.tsx`) do conteúdo visual (`SidebarContent.tsx`).
- **Animações**: Implementação de transições suaves baseadas em `width` para o container estrutural e `transform/opacity` para o conteúdo visual, utilizando `will-change-transform` para performance.
- **Controles**:
    - Adicionado botão de fechamento no `SidebarHeader.tsx`.
    - Criado `SidebarToggle.tsx` (botão flutuante) centrado verticalmente à esquerda para reabertura.
- **Estado**: Centralização do controle de visibilidade em `Resources.tsx`.
- **Estabilidade de Layout**:
    - Adicionado `min-w-0` ao conteúdo principal para evitar quebras de flexbox.
    - Adicionado `overflow-x-hidden` ao container raiz para eliminar scrollbars temporárias durante animações.
- **Acessibilidade**: Implementado `aria-hidden` e o atributo `inert` na Sidebar oculta para impedir interações e navegação por foco invisível.
- **Constantes**: Criação de `sidebar.constants.ts` para padronização de larguras e transições.

### Motivo
Melhorar a experiência do usuário permitindo o uso total da largura da tela quando necessário, mantendo a integridade do layout e a acessibilidade do sistema.

### Impactos
- Interface mais flexível e moderna.
- Expansão fluida do conteúdo principal sem "layout jumping".
- Garantia de que elementos ocultos não interferem na navegação por teclado.

---

## 22/05/2026 (Refinamento de UX: Posicionamento do SidebarToggle)

### Contexto
Ajuste do posicionamento do botão flutuante de reabertura da Sidebar para garantir alinhamento visual com o Header da aplicação.

### Alterações realizadas
- **SidebarToggle.tsx**: Alterada a classe de posicionamento de `top-1/2 -translate-y-1/2` para `top-4`.

### Motivo
O posicionamento centralizado verticalmente gerava inconsistência visual e quebrava o alinhamento espacial esperado em relação ao cabeçalho do sistema.

### Impactos
- Melhor consistência visual e hierarquia espacial.
- Alinhamento preciso com o Header/Topbar da interface.
