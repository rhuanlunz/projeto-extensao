# PRD-frontend.md — Frontend Web Application

# 1. Objetivo

Este documento define os padrões, arquitetura, regras visuais, convenções e diretrizes técnicas do frontend da aplicação de gerenciamento de recursos do Bloco B.

O frontend será responsável por:

- interface visual do sistema
- autenticação do usuário
- consumo da API REST
- visualização dos recursos
- gerenciamento visual do sistema
- controle de permissões no frontend
- experiência do usuário
- responsividade
- padronização visual

Este documento complementa o `PRD.md` principal.

---

# 2. Stack Tecnológica

## Linguagem

- Typescript

---

## Framework

- React

---

## Build Tool

- Vite

---

## Estilização

- Tailwind CSS
- shadcn/ui

---

## Notificações

- Sonner

---

# 3. Arquitetura Frontend

O frontend deve seguir arquitetura modular baseada em features.

Cada feature deve possuir isolamento próprio de:

- páginas
- componentes
- services
- regras específicas

---

## Estrutura base

```text
/src
  /features
    /Auth
    /Resources
    /Dashboard

      /NomeDaPagina
        /components
        /services
        NomeDaPagina.tsx

  /components
  /layouts
  /hooks
  /contexts
  /types
  /utils
  /routes
  /styles
```

---

## Regras arquiteturais

- Features não devem acessar arquivos internos de outras features diretamente
- Cada feature deve possuir isolamento próprio
- Componentes globais devem ficar em estrutura compartilhada
- Organização deve priorizar escalabilidade e manutenção
- Features devem ser removíveis sem impacto estrutural no restante da aplicação

---

# 4. Regras de Componentização

## Obrigatório

Toda interface deve priorizar:

- reutilização
- desacoplamento
- organização
- manutenção simples

---

## Componentes reutilizáveis obrigatórios

Exemplos:

- buttons
- inputs
- cards
- modals
- sidebar
- headers
- badges
- toasts

---

## Proibido

Não criar:

- páginas gigantes
- lógica duplicada
- estilos inline excessivos
- componentes monolíticos

---

# 5. Layout Geral

## Estrutura principal

O sistema utilizará:

- sidebar fixa
- conteúdo principal full-width
- dashboard superior
- listagem em cards

---

## Responsividade

O sistema deve ser:

- desktop-first
- responsivo
- compatível com mobile

---

## Mobile

Em dispositivos móveis:

- sidebar vira drawer/hamburger
- layout adapta cards automaticamente

---

# 6. Identidade Visual

## Estilo visual

O frontend deve seguir:

- visual institucional
- minimalista técnico
- aparência semelhante a sistemas acadêmicos
- baixa poluição visual
- foco em leitura rápida

---

# 7. Paleta de Cores Oficial

## Cor Primária

```text
#0085FF
```

Uso:

- botões principais
- ações
- destaques
- elementos ativos

---

## Cor Secundária

```text
#0056A4
```

Uso:

- sidebar
- hover
- headers
- elementos fortes

---

## Cor Neutra

```text
#E0F2FF
```

Uso:

- backgrounds leves
- áreas secundárias
- cards suaves

---

# 8. Fontes Oficiais

## Fontes

- Poppins
- Inter

---

## Regras

- títulos podem usar Poppins
- textos e conteúdos podem usar Inter

---

# 9. Navegação

## Sidebar fixa

A sidebar deve permanecer fixa em desktop.

---

## Menus previstos

- Dashboard
- Categorias
- Recursos
- Solicitar recurso
- Configurações
- Logout

---

## Controle por role

O menu:

```text
Configurações
```

deve aparecer apenas para usuários admin.

---

# 10. Dashboard Superior

## Objetivo

Exibir resumo rápido de recursos por andar.

---

## Informações exibidas

- total de recursos do primeiro andar
- total de recursos do segundo andar
- total de recursos do terceiro andar

---

## Observação

Dashboard avançado poderá ser implementado futuramente.

Não é prioridade inicial.

---

# 11. Recursos

## Visualização

Os recursos devem ser exibidos:

- em cards
- agrupados por andar

---

## Informações exibidas no card

- imagem
- nome
- status

---

## Status visuais

### disponível

- verde

---

### indisponível

- vermelho

---

# 12. Modal do Recurso

Ao clicar em um card:

- abrir modal
- NÃO navegar para nova página

---

## Informações do modal

- imagem
- nome
- descrição
- categoria
- andar
- ID Unesc
- status

---

## Permissões no modal

### aluno

- apenas visualização

---

### professor

- alterar status

---

### admin

- editar recurso
- alterar status

---

# 13. Busca

## Busca lateral

A busca deve pesquisar:

- categorias
- recursos

---

## Objetivo

Facilitar localização rápida de recursos.

---

# 14. Categorias

## Comportamento

Categorias devem funcionar como:

- accordion
- expansíveis/recolhíveis

---

## Estrutura

Categoria → Recursos

---

# 15. Botão Flutuante (FAB)

## Objetivo

Adicionar novo recurso.

---

## Regras

- aparece apenas para admin
- contextual à categoria aberta
- botão fixo no canto inferior

---

# 16. Solicitação de Recurso

## Tela

Formulário simples contendo:

- categoria
- recurso
- descrição

---

## Objetivo

Enviar solicitação por e-mail.

---

## Observação

Solicitação NÃO possui:

- histórico
- acompanhamento
- persistência frontend

---

# 17. Upload de Imagem

## Regras

Frontend deve validar:

- tipo
- tamanho

---

## Tipos permitidos

- JPG
- JPEG
- PNG

---

## Tamanho máximo

- 2MB

---

## Observação

Não haverá preview de imagem.

---

# 18. Feedback Visual

## Sistema de feedback

Utilizar:

- Sonner Toasts

---

## Objetivo

Informar:

- sucesso
- erro
- carregamento
- ações concluídas

---

## Estilo

- discreto
- minimalista
- não intrusivo

---

# 19. Estados de Interface

O frontend deve tratar:

- loading
- empty state
- erro
- ausência de dados

---

## Exemplos

- carregando recursos
- nenhuma categoria encontrada
- erro de API

---

# 20. Autenticação Frontend

## JWT

Frontend deve:

- armazenar token
- validar sessão
- controlar expiração

---

## Expiração

Token expira em:

- 1 hora

---

## Logout

Logout deve:

- limpar token
- limpar sessão
- redirecionar login

---

# 21. Controle de Acesso Frontend

Frontend deve controlar:

- menus
- botões
- ações
- rotas

com base na role do usuário.

---

# 22. Rotas

## Rotas principais

```text
/login
/
/configuracoes
```

---

## Proteção

Rotas privadas devem exigir autenticação.

---

## Rota admin

```text
/configuracoes
```

somente admin.

---

# 23. Consumo da API

## Padrão

Frontend deve consumir:

```text
/api/v1
```

---

## Regras

- tratar erros corretamente
- tratar loading
- tratar tokens expirados

---

# 24. Governança de Desenvolvimento

Este projeto será desenvolvido de forma colaborativa entre humanos e IA.

Toda alteração deve ser documentada.

---

# 25. Regras Obrigatórias para IA

## Obrigatório

A IA:

- DEVE ler o `PRD.md`
- DEVE ler este documento antes de alterar código
- DEVE atualizar `progress-frontend.md`
- NÃO pode alterar código sem documentar

---

## Proibido

A IA NÃO pode:

- modificar entradas antigas do progress
- remover documentação
- ignorar padrões definidos
- alterar identidade visual sem documentação

---

# 26. Progress Frontend

Arquivo:

```text
progress-frontend.md
```

---

## Regra obrigatória

APPEND-ONLY

Nunca alterar entradas anteriores.

Somente adicionar novas entradas ao final.

---

## Estrutura recomendada

```text
## DATA

### Contexto

### Alterações realizadas

### Motivo

### Impactos
```

---

# 27. Considerações Finais

Este documento define os padrões oficiais do frontend.

Toda implementação futura deve respeitar:

- arquitetura
- identidade visual
- componentização
- responsividade
- regras de governança
- documentação obrigatória
