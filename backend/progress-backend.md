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


---

## 2026-06-06 (Implementação: Casos de Teste de Recuperação de Senha)

### Contexto
O projeto carecia de testes automatizados para validar os fluxos de recuperação de senha (`Forgot Password` e `Reset Password`). Além disso, o Request de redefinição de senha (`ResetPasswordRequest`) carecia de validações completas em relação ao campo `email` e de mapeamento correto de mensagem de validação de confirmação de senha.

### Alterações realizadas
- Criação do arquivo de testes [PasswordRecoveryTest.php](file:///C:/Coding/laravel/backend/tests/Feature/Auth/PasswordRecoveryTest.php) cobrindo todos os cenários especificados:
  - Forgot Password:
    1. Envio de e-mail para usuário existente (utilizando fakes de Notification e validando o envio da notificação CustomResetPasswordNotification).
    2. Validação de obrigatoriedade do campo e-mail.
    3. Validação de formato de e-mail inválido.
    4. Tratamento adequado (retorno HTTP 400) para e-mail de usuário inexistente.
  - Reset Password:
    1. Redefinição com token válido.
    2. Validação de obrigatoriedade do token.
    3. Validação de obrigatoriedade do e-mail.
    4. Validação de obrigatoriedade de senha.
    5. Validação de erro de confirmação de senha (senhas que não coincidem).
    6. Falha adequada (retorno HTTP 500) com token inválido.
    7. Falha adequada (retorno HTTP 500) com token pertencente a outro usuário.
    8. Falha adequada (retorno HTTP 500) com token expirado (manipulando a data de criação no banco).
    9. Confirmação de que a nova senha redefinida foi corretamente criptografada e persistida no banco de dados.
- Correção de validação no [ResetPasswordRequest.php](file:///C:/Coding/laravel/backend/app/Http/Requests/ResetPasswordRequest.php):
  - Adicionada validação de obrigatoriedade para o campo `email` na redefinição.
  - Corrigida a chave de mensagem de erro de confirmação de senha de `new_password_confirmation.confirmed` para `new_password.confirmed`, para refletir a propriedade à qual a regra `confirmed` é aplicada no Laravel.
- Criação de um arquivo placeholder [tests/Unit/.gitkeep](file:///C:/Coding/laravel/backend/tests/Unit/.gitkeep) para resolver a falha de execução nativa do Pest que ocorria por conta de diretório `tests/Unit` ausente no workspace.

### Motivo
Garantir total cobertura e segurança para o fluxo crítico de recuperação de senha de usuários da API, alinhando as validações às regras de negócio descritas no PRD.

### Impactos
A suíte de testes de integração passou a cobrir de forma robusta e automatizada todos os caminhos felizes e de erro dos endpoints `/api/v1/auth/forgot` e `/api/v1/auth/reset`, reduzindo o risco de regressões e garantindo o comportamento e envelopamento corretos.

---

## 2026-06-06 (Refatoração: Criação do AuthService e Desacoplamento da Lógica de Autenticação)

### Contexto
A controladora de autenticação (`AuthController.php`) continha lógica direta de persistência e validações de domínio, fugindo da arquitetura de camadas definida no PRD (Controller -> Service -> Model).

### Alterações realizadas
- Criação da classe de serviço [AuthService.php](file:///C:/Coding/laravel/backend/app/Services/AuthService.php) encapsulando toda a lógica de negócios para:
  - Registro de novos usuários (`register`)
  - Login e autenticação com JWT (`login`)
  - Logout do sistema (`logout`)
  - Redefinição de senha com envio de e-mail (`forgot`)
  - Confirmação de redefinição de senha via token (`reset`)
- Refatoração da controladora [AuthController.php](file:///C:/Coding/laravel/backend/app/Http/Controllers/AuthController.php) para injetar o `AuthService` via construtor, delegando a execução lógica e focando apenas no tratamento de inputs (Form Requests) e na formatação das respostas em formato JSON com envelopes de sucesso/erro padrão.
- Execução completa da suíte de testes automatizados com Pest, validando que todos os 89 testes continuam passando perfeitamente sem qualquer quebra ou alteração nos contratos da API.

### Motivo
Restaurar e consolidar a padronização arquitetural da aplicação backend (Controller -> Service -> Model) e garantir a separação de responsabilidades no domínio de segurança e autenticação.

### Impactos
A lógica de autenticação e redefinição de senha está completamente isolada em uma camada de serviço reutilizável e facilmente testável. A controladora tornou-se enxuta, cumprindo apenas o papel HTTP/Validação. Nenhuma regressão foi introduzida e todos os fluxos de login, cadastro, logout e recuperação de senha foram validados e continuam funcionando conforme o esperado.

---

## 2026-06-06 (Implementação: Endpoint de Configurações - E-mail de Recebimento)

### Contexto
Implementação da feature de configurações da aplicação para suporte ao envio de requerimentos. O sistema precisava de um endpoint administrativo para armazenar, consultar e atualizar o e-mail de destino das solicitações enviadas pelos usuários.

### Alterações realizadas
- **Migration**: Criação de [2026_06_06_160000_create_settings_table.php](file:///C:/Coding/laravel/backend/database/migrations/2026_06_06_160000_create_settings_table.php) com a tabela `settings` (campos: `id`, `key` único, `value`, `timestamps`), estruturada como um mapa chave-valor genérico para suportar futuras configurações da aplicação.
- **Model**: Criação de [Setting.php](file:///C:/Coding/laravel/backend/app/Models/Setting.php) para interface com a tabela `settings`.
- **Service**: Criação de [SettingService.php](file:///C:/Coding/laravel/backend/app/Services/SettingService.php) com os métodos:
  - `getRequestEmail()` — busca o e-mail configurado (retorna `null` se não configurado).
  - `setRequestEmail(email)` — persiste o e-mail pela primeira vez; lança `ValidationException` se já existir.
  - `updateRequestEmail(email)` — atualiza o e-mail existente; lança `ValidationException` se ainda não foi configurado.
- **Form Requests**: Criação de [StoreRequestEmailRequest.php](file:///C:/Coding/laravel/backend/app/Http/Requests/StoreRequestEmailRequest.php) e [UpdateRequestEmailRequest.php](file:///C:/Coding/laravel/backend/app/Http/Requests/UpdateRequestEmailRequest.php) com validação de campo `email` obrigatório, string, formato válido e máximo de 255 caracteres.
- **Controller**: Criação de [SettingController.php](file:///C:/Coding/laravel/backend/app/Http/Controllers/SettingController.php) com os métodos `getRequestEmail`, `storeRequestEmail` e `updateRequestEmail`, injetando o `SettingService` via construtor.
- **Rotas**: Criação de [routes/settings.php](file:///C:/Coding/laravel/backend/routes/settings.php) com os três endpoints protegidos por `AuthMiddleware` e `role:admin`:
  - `GET /api/v1/settings/request-email`
  - `POST /api/v1/settings/request-email`
  - `PUT /api/v1/settings/request-email`
- **Bootstrap**: Registro do grupo de rotas `settings` em [bootstrap/app.php](file:///C:/Coding/laravel/backend/bootstrap/app.php).
- **Testes**: Criação de duas suítes de testes em `tests/Feature/Setting/`:
  - [AuthorizationSettingTest.php](file:///C:/Coding/laravel/backend/tests/Feature/Setting/AuthorizationSettingTest.php): 9 testes cobrindo retornos 401 (sem autenticação) e 403 (student e teacher) para os três endpoints.
  - [RequestEmailSettingTest.php](file:///C:/Coding/laravel/backend/tests/Feature/Setting/RequestEmailSettingTest.php): 11 testes cobrindo os fluxos de sucesso e erro (e-mail obrigatório, formato inválido, conflito no POST, ausência no PUT, unicidade no banco).

### Motivo
Atender ao requisito de painel de configurações (RF09 / PRD) que permite ao administrador definir o e-mail de destino das solicitações de recursos, garantindo que apenas um e-mail pode estar ativo, com restrição de acesso exclusiva à role `admin`.

### Impactos
A API agora expõe o endpoint `/api/v1/settings/request-email` com controle de acesso robusto. A estrutura da tabela `settings` foi projetada de forma genérica (chave-valor), facilitando a adição de novas configurações no futuro sem novas migrations. Todos os 109 testes do projeto continuam passando (389 assertions).



---

## 2026-06-10 (Implementacao: Envio de Requerimentos de Novos Mapeamentos)

### Contexto
Implementacao do fluxo de envio de solicitacoes de novos mapeamentos de recursos por usuarios autenticados com role `student` ou `teacher`, sem persistencia dos requerimentos em banco de dados.

### Alteracoes realizadas
- Criacao do endpoint `POST /api/v1/resource-requests`, protegido por `AuthMiddleware` e `role:student,teacher`.
- Criacao da `ResourceRequestController` para recebimento da requisicao e padronizacao das respostas HTTP.
- Criacao do `StoreResourceRequestRequest` com validacao de obrigatoriedade, existencia de `category_id`, limites de tamanho e restricao de letras Unicode e espacos para `resource` e `description`.
- Criacao do `ResourceRequestService` para encapsular a regra de envio do e-mail ao endereco configurado em `settings.request_email`.
- Criacao do `ResourceRequestMail` e da view de e-mail para estruturar o conteudo enviado aos administradores.
- Criacao da suite `ResourceRequestTest.php` em `tests/Feature/Category`, cobrindo sucesso para `student` e `teacher`, 401 sem autenticacao, 403 para `admin`, validacoes, falha de envio e garantia de ausencia de persistencia.

### Motivo
Atender ao requisito de permitir que alunos e professores solicitem novos mapeamentos de recursos via API, centralizando o recebimento pelos administradores atraves de e-mail configuravel e evitando criacao de nova tabela ou persistencia desnecessaria.

### Impactos
O backend passa a expor um fluxo completo e testado para requerimentos de novos recursos, mantendo o padrao arquitetural Controller -> Form Request -> Service -> Mail e respeitando o controle de acesso baseado em roles. A suite impactada foi validada com 9 testes e 31 assertions.

---

## 2026-06-10 (Ajuste: Contrato de Requerimentos de Novos Mapeamentos)

### Contexto
A solicitacao de novo mapeamento representa o pedido de criacao/mapeamento de uma nova categoria ou recurso, portanto nao deve exigir `category_id` existente no payload.

### Alteracoes realizadas
- Remocao do campo `category_id` da validacao e do conteudo do e-mail de requerimento.
- Ajuste da validacao de `resource` e `description` para permitir pontuacao, mantendo bloqueio de numeros.
- Atualizacao da suite `ResourceRequestTest.php` para refletir o novo contrato e cobrir envio com pontuacao.

### Impactos
O endpoint `POST /api/v1/resource-requests` passa a aceitar apenas `resource` e `description`, ambos obrigatorios, com limites mantidos. A suite impactada foi validada com 9 testes e 29 assertions.

---

## 2026-06-10 (Implementação: Gerenciamento de Usuários e Promoção de Roles)

### Contexto
O sistema carecia de endpoints administrativos para gerenciamento de usuários, impossibilitando que administradores promovessem usuários comuns (Students) a professores (Teachers) ou outros administradores através da API.

### Alterações realizadas
- Criação do `UserController.php` com os métodos `index` (listagem) e `updateRole` (atualização de perfil).
- Implementação do `UserService.php` para isolar a lógica de busca e atualização de roles, utilizando `Eager Loading` para as relações de roles.
- Criação do `UserResource.php` para padronizar a saída de dados do usuário, garantindo a exposição controlada de campos e relacionamentos.
- Criação do `UpdateUserRoleRequest.php` para validar a existência e o formato do `role_id` enviado.
- Registro das rotas em `routes/users.php` sob o prefixo `/api/v1/users`, com proteção estrita via `AuthMiddleware` e `role:admin`.
- Integração do novo grupo de rotas no arquivo central `bootstrap/app.php`.
- Criação de suíte de testes automatizados `UserManagementTest.php` em `tests/Feature/User/`, validando listagem, atualização de role, controle de acesso (403 para não-admins) e validações de payload.

### Motivo
Atender à necessidade crítica de operação administrativa do sistema, permitindo que o administrador do Bloco B gerencie os níveis de acesso dos usuários de forma segura e auditável via API.

### Impactos
A API agora permite a gestão completa de perfis de usuários por administradores. A arquitetura segue o padrão `Controller -> Service -> Model` e está 100% coberta por testes de integração, garantindo que a promoção de usuários funcione sem comprometer a integridade do sistema de autenticação JWT existente.

---

## 2026-06-10 (Implementação: Endpoint de Andares/Levels)

### Contexto
O frontend necessitava de um endpoint para obter a lista de andares (levels) disponíveis para popular formulários de criação e edição de recursos.

### Alterações realizadas
- Criação do `LevelService.php` com o método `getAllLevels()`.
- Criação do `LevelController.php` com o método `index()`.
- Criação do arquivo de rotas `routes/levels.php` definindo o endpoint `GET /api/v1/levels`.
- Registro do prefixo `levels` no arquivo `bootstrap/app.php`.
- O endpoint foi configurado como somente leitura e acessível a qualquer usuário autenticado (`student`, `teacher`, `admin`).

### Motivo
Fornecer os dados necessários para que o frontend possa exibir dinamicamente os andares disponíveis no sistema, resolvendo um bloqueador de integração identificado na auditoria técnica.

### Impactos
O frontend agora pode consumir a lista de andares, permitindo a correta implementação dos formulários de cadastro de recursos.


