# progress-backend.md

## Regras Obrigatórias

- Este arquivo é APPEND-ONLY
- Nunca alterar, remover ou reescrever entradas antigas
- Apenas adicionar novas entradas ao final do arquivo
- Toda alteração relevante no backend deve ser documentada
- A IA DEVE ler:
  - `PRD.md`
  - `PRD-backend.md`
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

## Estrutura Obrigatória

```

---

## 2026-05-19

### Contexto
Início da implementação da feature de gerenciamento de recursos (`resources`), estabelecendo a base arquitetural e de banco de dados.

### Alterações realizadas
- Criação das migrations, models e factories para as entidades fundamentais: `Category`, `Level` e `Resource`.
- Implementação do suporte a Soft Deletes na entidade `Resource`.
- Criação da camada de serviço `ResourceService` para isolamento da lógica de busca de recursos.
- Criação do `ResourceController` com o endpoint `GET /api/v1/resources`.
- Registro do grupo de rotas de resources no arquivo `routes/resources.php` e integração no `bootstrap/app.php`.
- Adição de testes automatizados com Pest cobrindo cenários de lista vazia e listagem com dados.

### Motivo
Estabelecer a fundação estrutural correta e alinhada ao PRD desde o início, evitando refatorações futuras e permitindo a expansão incremental da feature (como agrupamento por andar e CRUD completo nas próximas etapas).

### Impactos

---

## 2026-05-19 (Evolução: Agrupamento por Andar)

### Contexto
Evolução do endpoint de listagem de recursos para suportar o agrupamento lógico por andar, conforme exigido pelos requisitos de visualização do sistema.

### Alterações realizadas
- Adaptação do `ResourceService` para realizar o agrupamento de recursos utilizando o nome do andar (`name`) como chave, evitando dependência de IDs internos do banco de dados.
- Implementação de Eager Loading (`with(['level', 'category'])`) na busca de recursos para otimizar a performance e evitar o problema de N+1 queries.
- Garantia de que todos os andares cadastrados apareçam na resposta, mesmo que não possuam recursos vinculados (array vazio).
- Adaptação e expansão dos testes em `ListResourceTest.php` para validar o novo contrato JSON agrupado e a presença das relações carregadas.

### Motivo
Atender à necessidade do frontend de visualizar recursos organizados por andar, mantendo a integridade arquitetural e performance da API. O uso do nome do andar como chave remove o acoplamento com IDs incrementais da base de dados.

### Impactos

---

## 2026-05-19 (Implementação: Criação de Recurso)

### Contexto
Implementação do endpoint de criação de recursos (`POST /api/v1/resources`), permitindo a persistência de novos itens no sistema respeitando as restrições de domínio e integridade do banco de dados.

### Alterações realizadas
- Criação do `StoreResourceRequest` para centralizar as regras de validação, incluindo obrigatoriedade de campos (`name`, `unesc_id`, `status`, `category_id`, `level_id`), validação de tipos e verificação de existência de chaves estrangeiras.
- Adição do método `create` ao `ResourceService` para encapsular a lógica de persistência.
- Implementação do método `store` no `ResourceController`, integrando a validação e o serviço de criação.
- Registro da rota `POST /api/v1/resources` no arquivo `routes/resources.php`.
- Criação de suíte de testes em `CreateResourceTest.php` cobrindo fluxos de sucesso, falhas de validação (campos ausentes/inválidos) e unicidade do `unesc_id`.

### Motivo
Expandir a feature de `resources` permitindo o cadastro de novos recursos via API, mantendo a consistência com a modelagem de dados aprovada e a arquitetura definida.

### Impactos

---

## 2026-05-19 (Implementação: Atualização e Remoção de Recurso)

### Contexto
Conclusão das operações fundamentais de CRUD para a feature de recursos (`resources`), implementando os endpoints de atualização (`PUT`) e remoção lógica (`DELETE`).

### Alterações realizadas
- Criação do `UpdateResourceRequest` para validação de atualizações, permitindo que o recurso mantenha seu próprio `unesc_id` enquanto valida a unicidade contra outros registros.
- Adição dos métodos `update` e `delete` ao `ResourceService`, utilizando `findOrFail` para garantir o retorno automático de erro 404 caso o recurso não exista.
- Implementação dos métodos `update` e `destroy` no `ResourceController`.
- Registro das rotas `PUT /api/v1/resources/{id}` e `DELETE /api/v1/resources/{id}` em `routes/resources.php`.
- Criação das suítes de testes `UpdateResourceTest.php` e `DeleteResourceTest.php` cobrindo sucessos, falhas de validação, tratamento de recursos inexistentes e verificação de Soft Delete.
- Ajuste na `LevelFactory` para garantir nomes de andares únicos, resolvendo inconsistências em testes de listagem agrupada.

### Motivo
Finalizar o ciclo de gerenciamento básico de recursos, permitindo que administradores modifiquem dados existentes ou removam recursos (mantendo o rastro via Soft Delete) conforme definido no PRD.

---

## 2026-05-20 (Implementação Final: Review Backend)

### Contexto
Conclusão da implementação das melhorias solicitadas no review técnico, utilizando a base estrutural preparada e garantindo conformidade com os padrões do PRD.

### Alterações realizadas
- Ativação definitiva dos API Resources (`ResourceResource`, `CategoryResource`, `LevelResource`) nos endpoints de listagem, criação e atualização de recursos, garantindo a ocultação de campos internos (`timestamps`, `chaves estrangeiras`).
- Padronização do endpoint `DELETE /api/v1/resources/{id}`: alterado status de `204` para `200` e adicionado corpo JSON de sucesso conforme `PRD-backend.md`.
- Implementação de sanitização automática (trim) para o campo `name` via `prepareForValidation` nos Form Requests.
- Adição de validação de tamanho máximo (`max:50`) para o campo `unesc_id`.
- Atualização da suíte de testes (`DeleteResourceTest.php`) para validar o novo comportamento do endpoint de exclusão.
- Garantia de integridade do domínio, mantendo a acentuação no campo `status` conforme restrição técnica de segurança.

### Motivo
Finalizar o ciclo de ajustes do review para entregar uma API profissional, padronizada e segura, alinhada às expectativas arquiteturais do projeto.

### Impactos
A API agora expõe apenas os dados necessários de forma estruturada e consistente. O endpoint de deleção segue o padrão global de respostas do sistema. As entradas de dados estão mais protegidas via sanitização e validação de limites. Todos os testes feature foram validados e estão passando com as novas regras.


