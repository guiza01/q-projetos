# Fluxo de criação de uma nova funcionalidade

Este documento explica o padrão para criar uma nova funcionalidade no sistema.

## Objetivo

Manter o projeto organizado, previsível e fácil de evoluir por qualquer membro do time.

## Estrutura padrão

Toda nova funcionalidade deve ficar dentro de `src/app/features/`.

Exemplo:

```text
src/app/features/orders/
├── components/
├── models/
├── mappers/
├── pages/
├── services/
└── orders-routing.module.ts
```

## Passo a passo

### 1. Criar a pasta da feature

Crie uma nova pasta dentro de `src/app/features/` com o nome da funcionalidade.

Exemplo:

```text
src/app/features/orders
```

### 2. Criar os modelos

Os modelos devem ficar em `models/`.

Use essa pasta para:
- interfaces da feature
- tipos específicos do domínio
- contratos internos de tela

### 3. Criar os serviços

Os serviços da feature devem ficar em `services/`.

Use essa pasta para:
- chamadas específicas da funcionalidade
- regras de negócio da feature
- orquestração entre API e tela

### 4. Criar os mappers

Se a API retornar um formato diferente do que a tela precisa, crie um mapper.

Use essa pasta para:
- converter dados da API para o modelo da aplicação
- manter a regra de conversão isolada

### 5. Criar as páginas

As telas da funcionalidade devem ficar em `pages/`.

Exemplos:
- listagem
- detalhe
- criação
- edição

### 6. Criar componentes reutilizáveis da feature

Componentes que pertencem apenas à feature devem ficar em `components/`.

Exemplo:
- card de item
- filtro
- cabeçalho específico
- modal da feature

### 7. Criar o routing da feature

Toda feature deve ter seu próprio arquivo de rotas.

Isso ajuda a:
- carregar a feature sob demanda
- organizar melhor a navegação
- evitar rotas soltas no projeto

### 8. Registrar a rota principal

Depois de criada, a feature deve ser registrada no roteamento principal do app.

## Regras importantes

- Não colocar telas de negócio dentro de `shared/`
- Não colocar serviços específicos de uma feature dentro de `core/`
- Não misturar regras da API com regras da interface
- Sempre preferir nomes claros e objetivos

## Exemplo prático

Se a funcionalidade for de projetos:

```text
src/app/features/projects/
├── components/
├── mappers/
├── models/
├── pages/
├── services/
└── projects-routing.module.ts
```

## Fluxo ideal de trabalho

1. criar a estrutura da feature
2. criar os modelos
3. criar o service
4. criar o mapper
5. criar a página
6. criar os componentes da feature
7. registrar a rota
8. validar a integração com a API

## Resultado esperado

Seguindo esse fluxo, o projeto fica:
- mais fácil de manter
- mais fácil de evoluir
- mais simples para novos desenvolvedores entenderem
- com menor chance de conflito entre áreas diferentes do sistema
