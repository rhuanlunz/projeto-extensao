# PRD.md — Sistema de Gerenciamento de Recursos (Bloco B)

## 1. Visão Geral

Sistema web com API REST para gerenciamento e visualização de recursos físicos (ex: racks) do Bloco B, permitindo controle de disponibilidade, organização por categoria e andar, e envio de solicitações via e-mail.

---

## 2. Objetivo

- Centralizar visualização de recursos
- Permitir controle de disponibilidade
- Facilitas reporte de problemas via solicitação
- Gerenciar recursos e categorias por usuários autorizados

---

## 3. Escopo

### Inclui:

- Autenticação de usuários (email + senha)
- Controle de acesso por roles
- CRUD de recursos e categorias (admin)
- Alteração de status (professor/admin)
- Visualização de recursos por andar
- Envio de solicitação por e-mail
- Painel de configurações para gestão do sistema

### Não inclui:

- Sistema de acompanhamento de solicitações
- Logs avançados
- Multi-bloco
- Sistema institucional integrado

---

## 4. Perfis de Usuário

### 4.1 Aluno

- Visualizar categorias e recursos
- Visualizar status
- Enviar solicitação (e-mail)

### 4.2 Professor

- Todas permissões de aluno
- Alterar status do recurso

### 4.3 Admin

- Todas permissões
- CRUD de recursos e categorias
- Gerenciar usuários (alterar roles)
- Configurar e-mail de destino
- Acessar painel de configurações

---

## 5. Requisitos Funcionais

### RF01 – Autenticação

- Login com email e senha
- Recuperação de senha via e-mail
- Sem confirmação de e-mail obrigatória
- Uso de autenticação baseada em JWT
- Token com expiração de 1 hora
- Funcionalidade de logout

---

### RF02 – Controle de acesso

- Sistema deve restringir ações por role
- Ações administrativas acessíveis apenas por usuários com role admin

---

### RF03 – Categorias

- Listar categorias
- Criar, editar e excluir (admin)
- Exclusão apenas se não houver recursos vinculados

---

### RF04 – Recursos

- Listar por categoria e andar
- Visualizar detalhes
- Criar, editar, excluir (admin)
- Professor pode alterar apenas status

---

### RF05 – Status

- Recurso pode ser:
    - disponivel
    - indisponivel

---

### RF06 – Andares

- Recursos devem estar vinculados a um único andar
- Andares são fixos, porém armazenados em banco de dados

---

### RF07 – Solicitação

- Usuário pode enviar solicitação com:
    - categoria
    - recurso
    - descrição
- Sistema envia e-mail para endereço configurado no painel de configurações
- Solicitação NÃO é armazenada no sistema

---

### RF08 – Usuários

- Cadastro livre
- Usuário inicia como “aluno”
- Admin pode alterar role
- Usuário NÃO pode editar perfil

---

### RF09 – Painel de Configurações

- Acesso via rota `/configuracoes`
- Acesso permitido apenas para usuários com role admin
- Usuários sem permissão devem ser bloqueados/redirecionados
- Botão de acesso ao painel deve ser visível apenas para admins

Funcionalidades:

- Listar usuários
- Alterar role de usuários
- Configurar e-mail de destino das solicitações

Restrições:

- Admin NÃO pode editar nome ou e-mail de usuários

---

## 6. Requisitos Não Funcionais

### RNF01 – API

- RESTful
- Versionada (`/api/v1`)
- Respostas em JSON

---

### RNF02 – Segurança

- Senhas com hash
- Proteção contra SQL Injection
- Proteção contra XSS
- Validação de inputs obrigatória:
    - frontend
    - backend
- Controle de acesso via middleware

---

### RNF03 – Performance

- Tempo de resposta ≤ 500ms em condições normais

---

### RNF04 – Arquitetura

- Arquitetura monolítica
- Separação entre frontend e backend

---

### RNF05 – Imagens

- Upload local
- Tipos permitidos: JPG, JPEG, PNG
- Tamanho máximo: 2MB
- Armazenamento em `/uploads/resources/`
- Nomeação única de arquivos

---

### RNF06 – Banco de Dados

- Banco de dados: MySQL
- Uso de soft delete (`deleted_at`)
- Integridade referencial obrigatória

---

### RNF07 – Stack Tecnológica

### Frontend

- Typescript
- React (SPA)
- Vite
- Tailwind CSS
- shadcn/ui

### Backend

- PHP
- Laravel
- Eloquent ORM

### Outros

- NGINX
- Pest (testes)

---

### RNF08 – Colaboração e Governança

- Projeto será desenvolvido de forma colaborativa (humanos + IA)
- Toda alteração deve ser documentada

### Regras obrigatórias:

- Todo código alterado por IA DEVE ser documentado
- IA NÃO pode alterar código sem atualizar documentação
- Humanos podem falhar nesse processo, mas não é o ideal

### Progress.md:

- Deve existir para frontend e backend
- Estrutura:
    - `progress-backend.md`
    - `progress-frontend.md`
- Regra: **append-only**
    - Não pode editar conteúdo existente
    - Apenas adicionar novas entradas

---

## 7. Regras de Negócio

### RN01

Usuário recém-criado inicia como “aluno”

### RN02

Apenas admin pode alterar roles

### RN03

Professor pode alterar apenas status

### RN04

Admin possui acesso total ao sistema

### RN05

Recurso deve possuir:

- categoria válida
- andar válido
- ID Unesc único

### RN06

Categoria não pode ser excluída se possuir recursos

### RN07

Recurso pertence a apenas um andar

### RN08

Solicitações não são persistidas

### RN09

Status só pode ser alterado por professor ou admin

### RN10

Acesso ao sistema requer autenticação

### RN11

Painel de configurações acessível apenas por usuários autorizados

---

## 8. Estrutura de Dados (Conceitual)

### Entidades:

- users
- roles
- categories
- resources
- levels

### Relações:

- user → role
- resource → category
- resource → level

---

## 9. Estrutura do Projeto

```text
/source
  /backend
    PRD-backend.md
    progress-backend.md
  /frontend
    PRD-frontend.md
    progress-frontend.md

PRD.md
README.md
```

---

## 10. Fora de Escopo Futuro

- Histórico de alterações detalhado
- Sistema de tickets
- Auditoria completa
- Multi-localização

---

## 11. Critérios de Aceite

- Usuário consegue visualizar recursos por andar
- Professor consegue alterar status
- Admin consegue gerenciar recursos
- Admin consegue gerenciar usuários (roles)
- Painel de configurações funciona corretamente
- Controle de acesso funciona corretamente
- Solicitação envia e-mail corretamente
