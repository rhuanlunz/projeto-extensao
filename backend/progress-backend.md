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

---

## 2026-05-20 (Refatoração: Robustez e DX nos Seeders)

### Contexto
Melhoria na qualidade de desenvolvimento (DX) e na robustez dos seeders para garantir um ambiente previsível e fácil de testar.

### Alterações realizadas
- Substituição da lógica de contagem frágil no `DevelopmentSeeder` por uma trava determinística baseada na existência do usuário âncora (`professor@teste.com`).
- Definição explícita de senhas (`Hash::make('password')`) para os usuários de teste no `DevelopmentSeeder`, removendo a dependência de configurações implícitas da factory.
- Garantia de idempotência total: o seeder pode ser executado múltiplas vezes sem duplicar dados ou gerar erros de restrição única.
- Adição de mensagens informativas no console durante a execução dos seeders.

### Motivo
Remover heurísticas que poderiam falhar em ambientes com dados reais e facilitar o onboarding de novos desenvolvedores, que agora têm credenciais de teste claras e documentadas no próprio seeder.

### Impacto
O fluxo de desenvolvimento tornou-se mais resiliente. Desenvolvedores podem rodar o seeder de desenvolvimento a qualquer momento para garantir que possuem dados de teste, sem risco de poluir o banco com duplicatas ou enfrentar erros de execução.

---

## 2026-05-21 (Padronização e Localização: PT-BR)

### Contexto
Implementação da localização completa do sistema para Português (pt-BR) e padronização das respostas JSON da API conforme exigido pelo PRD.

### Alterações realizadas
- Configuração do locale padrão da aplicação para `pt_BR` em `config/app.php` e `.env`.
- Criação do arquivo completo de traduções nativas em `lang/pt_BR/validation.php`, incluindo mapeamento de atributos amigáveis.
- Remoção de mensagens manuais (método `messages()`) em `LoginRequest` e `RegisterRequest`, centralizando na camada de tradução do framework.
- Implementação de tratamento global de exceções em `bootstrap/app.php` para garantir o envelope JSON `{ "success": false, "message": "..." }` em erros de validação (422), não encontrado (404) e erros internos (500).
- Tradução integral de mensagens hardcoded no `ResourceController`.
- Correção de erro de digitação na chave 'success' no `AuthController`.
- Atualização de toda a suíte de testes Feature (`Resource` e `Auth`) para validar os novos textos em português e a nova estrutura JSON de erro.
- Atualização dos documentos `PRD.md` e `PRD-backend.md` com as definições de localização e padronização.

### Motivo
Melhorar a experiência do usuário final e do desenvolvedor frontend, garantindo que todas as mensagens exibidas na interface sejam consistentes, em português e sigam um contrato de API rigoroso e previsível.

### Impactos
Todas as respostas da API agora seguem o padrão de envelope definido no PRD. Testes automatizados garantem que futuras alterações não regridam a linguagem ou a estrutura dos erros. O código tornou-se mais limpo com a remoção de mensagens manuais nos FormRequests.

---

## 2026-05-27 (Implementação Final: Autorização Baseada em Roles)

### Contexto
Finalização e hardening da feature de autorização e controle de acesso baseada em roles (student, teacher, admin) para a API de recursos, assegurando isolamento arquitetural e proteção correta dos endpoints.

### Alterações realizadas
- Revisão e validação da proteção de rotas no arquivo `routes/resources.php` utilizando os middlewares `AuthMiddleware` seguido de `RoleMiddleware`.
- Criação e integração do endpoint especializado `PATCH /api/v1/resources/{id}/status` restrito para `teacher` e `admin`, validado via `UpdateResourceStatusRequest`.
- O endpoint `PUT /api/v1/resources/{id}` (atualização completa) foi rigorosamente mantido exclusivo para a role `admin`.
- Inclusão do método isolado `updateStatus` no `ResourceService` garantindo a responsabilidade única e evitando lógica condicional baseada em roles nas camadas de negócio.
- O `AuthMiddleware` foi aprimorado para capturar corretamente exceções de token inexistente (`JWTException`), devolvendo uma resposta padronizada 401.
- Finalização de suítes de testes dedicadas (`AuthorizationResourceTest` e `UpdateResourceStatusTest`), atestando a eficácia do controle de acesso (403 para student, 401 para requisições não autenticadas) e isolamento dos payloads.

### Motivo
Implementar a regra de negócio exigida de permitir que professores alterem apenas o status do recurso (disponibilidade) sem lhes conceder acesso de edição total, evitando a criação de anti-patterns como lógicas híbridas no service ou no PUT original. 

---

## 2026-05-29 (Implementação: Gerenciamento de Categorias)

### Contexto
Implementação do CRUD completo para a entidade `Category`, seguindo rigorosamente os padrões arquiteturais e de autorização estabelecidos na feature de recursos.

### Alterações realizadas
- Criação do `CategoryController` com os métodos `index`, `store`, `update` e `destroy`.
- Implementação da camada de serviço `CategoryService` para isolamento da lógica de persistência e validação de domínio.
- Criação dos Form Requests `StoreCategoryRequest` e `UpdateCategoryRequest` com sanitização automática (trim) do campo `name`.
- Implementação do `CategoryResource` para padronização da resposta JSON, expondo apenas `id` e `name`.
- Registro das rotas em `routes/categories.php` com proteção por roles: visualização aberta a todos os usuários autenticados e operações de escrita (POST, PUT, DELETE) restritas à role `admin`.
- Integração do novo arquivo de rotas no `bootstrap/app.php`.
- Implementação da regra de negócio **RN06**: bloqueio de exclusão de categorias que possuam recursos vinculados, lançando `ValidationException` para manter a consistência com os erros 422 da API.

### Motivo
Expandir as capacidades administrativas do sistema permitindo o gerenciamento de categorias, garantindo a integridade dos dados através da restrição de exclusão de itens vinculados e mantendo a consistência técnica com o restante da aplicação.

### Impactos
A API agora oferece endpoints completos para gestão de categorias. A autorização está garantida via middlewares de roles. A integridade referencial é protegida em nível de aplicação, impedindo a remoção acidental de categorias em uso por recursos ativos.



