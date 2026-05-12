# PRD-backend.md — Backend API

## 1. Objetivo

Este documento define os padrões, arquitetura, convenções e regras técnicas do backend da aplicação de gerenciamento de recursos do Bloco B.

O backend é responsável por:

- autenticação
- autorização
- regras de negócio
- persistência de dados
- gerenciamento de recursos
- gerenciamento de categorias
- gerenciamento de usuários
- envio de solicitações por e-mail
- controle de acesso
- exposição da API REST

Este documento complementa o `PRD.md` principal.

---

# 2. Stack Tecnológica

## Linguagem e Framework

- PHP
- Laravel

## Banco de Dados

- MySQL
- Eloquent ORM

## Testes

- Pest

## Servidor

- NGINX

## Autenticação

- JWT

---

# 3. Arquitetura

O backend deve seguir arquitetura monolítica organizada em camadas.

## Estrutura definida

```text
Controller -> Service -> Model
```

---

## Responsabilidades

### Controllers

Responsáveis apenas por:

- receber requests
- validar entrada via Form Requests
- chamar Services
- retornar responses

Controllers NÃO devem:

- conter regra de negócio
- acessar banco diretamente
- conter SQL

---

### Services

Responsáveis por:

- regra de negócio
- validações de domínio
- orquestração da aplicação

---

### Models

Responsáveis por:

- representação das entidades
- relacionamentos Eloquent

---

# 4. Estrutura de Diretórios

```text
/app
  /Http
    /Controllers
    /Requests
    /Middleware

  /Services
  /Models

/routes
/database
/tests
/storage
```

---

# 5. Convenções de Nomenclatura

## Código

Todo código deve ser escrito em inglês.

A documentação permanece em português.

---

## Controllers

```text
ResourceController
CategoryController
AuthController
UserController
```

---

## Services

```text
ResourceService
AuthService
CategoryService
```

---

## Models

```text
Resource
Category
User
Role
Level
```

---

# 6. API REST

## Padrão

A API deve seguir padrão RESTful.

## Prefixo obrigatório

```text
/ api/v1
```

---

# 7. Responses Padronizadas

## Sucesso

```json
{
  "success": true,
  "message": "Mensagem",
  "data": {}
}
```

---

## Erro

```json
{
  "success": false,
  "message": "Mensagem de erro"
}
```

---

## Validation Error

```json
{
  "success": false,
  "message": "Validation error",
  "errors": {}
}
```

---

# 8. Autenticação

## Método

- JWT

## Regras

- token expira em 1 hora
- rotas protegidas usam middleware
- logout obrigatório

---

# 9. Controle de Acesso

O sistema utiliza roles:

- aluno
- professor
- admin

---

## Permissões

### aluno

- visualizar recursos
- visualizar categorias
- enviar solicitações

---

### professor

Tudo de aluno +

- alterar status de recurso

---

### admin

Acesso total ao sistema.

Incluindo:

- CRUD de recursos
- CRUD de categorias
- alteração de roles
- acesso ao painel `/configuracoes`
- configuração de e-mail de solicitações

---

# 10. Banco de Dados

## Banco utilizado

- MySQL

## ORM

- Eloquent ORM

## Regras obrigatórias

- uso de foreign keys
- integridade referencial
- soft delete
- migrations obrigatórias

---

# 11. Soft Delete

As entidades relevantes devem utilizar soft delete.

Padrão:

```text
deleted_at
```

---

# 12. Seeders

O sistema deve possuir seeders iniciais para:

- roles
- admin inicial
- levels

---

# 13. Segurança

## Obrigatório

- hash de senha
- proteção contra SQL Injection
- proteção contra XSS
- validação backend obrigatória
- middleware de autenticação
- middleware de autorização

---

# 14. Upload de Arquivos

## Tipos permitidos

- JPG
- JPEG
- PNG

## Tamanho máximo

- 2MB

---

## Armazenamento

```text
storage/app/public/resources
```

---

## Regras

- nome único para arquivos
- validação obrigatória de tipo
- validação obrigatória de tamanho

---

# 15. Solicitações

Solicitações:

- NÃO são persistidas
- apenas enviam e-mail

---

## Dados enviados

- categoria
- recurso
- descrição

---

## Destino

E-mail configurado no painel `/configuracoes`.

---

# 16. Painel de Configurações

## Rota

```text
/configuracoes
```

---

## Acesso

Somente usuários com role `admin`.

Usuários sem permissão devem:

- ser bloqueados
- ou redirecionados

---

# 17. Governança de Desenvolvimento

Este projeto será desenvolvido de forma colaborativa entre humanos e IA.

Toda alteração deve seguir regras obrigatórias de documentação.

---

# 18. Regras Obrigatórias para IA

## Obrigatório

A IA:

- DEVE ler o `PRD.md`
- DEVE ler este documento antes de alterar código
- DEVE atualizar `progress-backend.md`
- NÃO pode alterar código sem documentar

---

## Proibido

A IA NÃO pode:

- modificar entradas antigas do progress
- remover documentação
- alterar arquitetura definida
- ignorar padrões definidos

---

# 19. Progress Backend

Arquivo:

```text
progress-backend.md
```

---

## Regra obrigatória

APPEND-ONLY

Nunca alterar entradas anteriores.

Somente adicionar novas entradas ao final.

---

## Estrutura recomendada

```markdown
## DATA

### Contexto

### Alterações realizadas

### Motivo

### Impactos
```

---

# 20. Testes

## Framework

- Pest

---

## Objetivo

Garantir:

- estabilidade
- previsibilidade
- funcionamento dos endpoints principais

---

# 21. Considerações Finais

Este documento define os padrões técnicos oficiais do backend.

Qualquer alteração estrutural futura deve:

- ser discutida
- aprovada
- documentada
- registrada no progress correspondente
