# Exemplos de Uso da API - Resources (v1)

Este documento contém exemplos de payloads e respostas para os endpoints de gerenciamento de recursos.

## 1. Listar Recursos (Agrupados por Andar)
**Endpoint:** `GET /api/v1/resources`

### Resposta de Sucesso (200 OK)
```json
{
  "success": true,
  "message": "Resources retrieved successfully",
  "data": {
    "Térreo": [
      {
        "id": 1,
        "name": "Rack de Rede A1",
        "unesc_id": "UNESC-1234",
        "status": "disponivel",
        "category": {
          "id": 1,
          "name": "Redes"
        },
        "level": {
          "id": 1,
          "name": "Térreo"
        }
      }
    ],
    "1º Andar": []
  }
}
```

---

## 2. Criar Novo Recurso
**Endpoint:** `POST /api/v1/resources`

### Payload de Exemplo
```json
{
  "name": "Projetor Epson X41",
  "unesc_id": "UNESC-9988",
  "status": "disponivel",
  "category_id": 2,
  "level_id": 1
}
```

### Resposta de Sucesso (201 Created)
```json
{
  "success": true,
  "message": "Resource created successfully",
  "data": {
    "id": 2,
    "name": "Projetor Epson X41",
    "unesc_id": "UNESC-9988",
    "status": "disponivel",
    "category": {
      "id": 2,
      "name": "Multimídia"
    },
    "level": {
      "id": 1,
      "name": "Térreo"
    }
  }
}
```

---

## 3. Atualizar Recurso
**Endpoint:** `PUT /api/v1/resources/{id}`

### Payload de Exemplo
```json
{
  "name": "Projetor Epson X41 (Manutenção)",
  "unesc_id": "UNESC-9988",
  "status": "indisponivel",
  "category_id": 2,
  "level_id": 1
}
```

### Resposta de Sucesso (200 OK)
```json
{
  "success": true,
  "message": "Resource updated successfully",
  "data": {
    "id": 2,
    "name": "Projetor Epson X41 (Manutenção)",
    "unesc_id": "UNESC-9988",
    "status": "indisponivel",
    "category": {
      "id": 2,
      "name": "Multimídia"
    },
    "level": {
      "id": 1,
      "name": "Térreo"
    }
  }
}
```

---

## 4. Deletar Recurso (Soft Delete)
**Endpoint:** `DELETE /api/v1/resources/{id}`

### Resposta de Sucesso (200 OK)
```json
{
  "success": true,
  "message": "Resource deleted successfully"
}
```

---

## Dicas para Validação

1. **Sanitização**: Se você enviar um nome com espaços extras (ex: `"  Rack A1  "`), o sistema salvará automaticamente como `"Rack A1"`.
2. **Status**: O sistema aceita apenas `disponivel` ou `indisponivel` (sem acento).
3. **ID Unesc**: O campo `unesc_id` é único. Tentar criar dois recursos com o mesmo ID retornará um erro `422`.
4. **Campos Ocultos**: Note que as respostas não incluem `created_at`, `updated_at` ou `deleted_at`, mantendo o payload limpo para o frontend.
