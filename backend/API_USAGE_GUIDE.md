# API Usage Guide - Bloco B

Este guia reflete **exatamente** o código que está implementado no backend atualmente.

## URL Base
Todas as requisições devem ser feitas para:
`http://localhost:8000/api/v1` (ou a URL do seu servidor local)

## Autenticação (JWT)
Após o login, você receberá um `access_token`. Envie no header de requisições protegidas:
`Authorization: Bearer {seu_token}`

## Guia Rápido de Integração para Frontend React
1. O usuário preenche e-mail e senha.
2. O frontend dispara `POST /api/v1/auth/login`.
3. Se sucesso, salve o `access_token` (`localStorage` ou estado global).
4. Redirecione para o Dashboard.
5. Intercepte erros `401 Unauthorized` globalmente (via Axios/Fetch interceptor) para limpar a sessão e deslogar.

---

## 🔐 Auth

### Login
- **Método:** `POST /auth/login`
- **Auth:** Pública
- **Payload:**
```json
{
  "email": "admin@teste.com",
  "password": "password"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Usuário logado com sucesso!",
  "data": {
    "access_token": "eyJ0eX...",
    "token_type": "bearer",
    "expires_in": 3600
  }
}
```

### Logout
- **Método:** `GET /auth/logout`
- **Auth:** Obrigatória (Qualquer role)

### Registro (Criar conta)
- **Método:** `POST /auth/register`
- **Auth:** Pública
- **Payload:** `name`, `email`, `password`, `password_confirmation`

### Recuperação de Senha
- **Esqueci a Senha:** `POST /auth/forgot` (Payload: `email`)
- **Redefinir Senha:** `POST /auth/reset` (Payload: `email`, `token`, `new_password`, `new_password_confirmation`)

---

## 👥 Usuários (Users)

### Listar Usuários
- **Método:** `GET /users`
- **Auth:** Obrigatória
- **Role:** `admin`
- **Response Real:** Retorna um array com ID, nome, e-mail e relacionamento embutido com a role (`id`, `name`).

### Alterar Role do Usuário
- **Método:** `PATCH /users/{id}/role`
- **Auth:** Obrigatória
- **Role:** `admin`
- **Payload:**
```json
{
  "role_id": 2
}
```
*(IDs: 1 = admin, 2 = teacher, 3 = student)*

---

## 🗂 Categorias (Categories)

### Listar
- **Método:** `GET /categories`
- **Auth:** Obrigatória (`student`, `teacher`, `admin`)
- **Response:** Array com `id` e `name` (envelopado em data).

### Criar / Editar / Excluir
- **Role:** Somente `admin`
- **Criar:** `POST /categories` (Payload: `name`)
- **Editar:** `PUT /categories/{id}` (Payload: `name`)
- **Excluir:** `DELETE /categories/{id}`

---

## 📦 Recursos (Resources)

### Listar Agrupados
- **Método:** `GET /resources`
- **Auth:** Obrigatória (`student`, `teacher`, `admin`)
- **Response Real:** Os dados vêm em formato de objeto onde as chaves são os nomes dos andares.
```json
{
  "success": true,
  "data": {
    "Térreo": [
      {
        "id": 1,
        "name": "Projetor",
        "unesc_id": "PRJ-01",
        "status": "disponivel",
        "category": { "id": 1, "name": "Audiovisual" },
        "level": { "id": 1, "name": "Térreo" }
      }
    ],
    "1º Andar": []
  }
}
```

### Criar ou Editar (Admin)
- **Role:** `admin`
- **Criar:** `POST /resources`
- **Editar:** `PUT /resources/{id}`
- **Payload:**
```json
{
  "name": "Nome",
  "unesc_id": "ID-123",
  "status": "disponivel", 
  "category_id": 1,
  "level_id": 1
}
```
*(Nota: status deve ser a string exata "disponivel" ou "indisponivel")*

### Alterar Status (Professor/Admin)
- **Método:** `PATCH /resources/{id}/status`
- **Role:** `teacher`, `admin`
- **Payload:** `{"status": "indisponivel"}`

### Excluir
- **Método:** `DELETE /resources/{id}`
- **Role:** `admin`

---

## 🏢 Andares (Levels)

### Listar Andares
- **Método:** `GET /levels`
- **Auth:** Obrigatória (`student`, `teacher`, `admin`)
- **Response:** Array com `id` e `name` (envelopado em data).

---

## ⚙ Configurações (Settings)

### E-mail de Recebimento
- **Role:** `admin`
- **Buscar:** `GET /settings/request-email`
- **Criar (1ª vez):** `POST /settings/request-email` (Payload: `{"email": "coord@edu.br"}`)
- **Atualizar:** `PUT /settings/request-email` (Payload: `{"email": "coord@edu.br"}`)

---

## ✉ Requerimentos (Resource Requests)

### Enviar Solicitação
- **Método:** `POST /resource-requests`
- **Auth:** Obrigatória (`student`, `teacher`)
- **Payload Real (Atualizado):**
```json
{
  "resource": "Nome sugerido",
  "description": "Motivação do pedido"
}
```
