# Arquitetura da pasta `src/app`

Estrutura simples, previsível e fácil de manter para um projeto Ionic + Angular com integração de API.

## Visão geral

```text
src/app/
├── core/
│   ├── config/
│   ├── guards/
│   ├── interceptors/
│   ├── models/
│   └── services/
├── features/
│   └── projects/
│       ├── components/
│       ├── models/
│       ├── pages/
│       └── services/
├── layouts/
│   └── main-layout/
└── shared/
    ├── components/
    ├── directives/
    ├── models/
    ├── pipes/
    └── utils/
```

## Responsabilidade de cada pasta

### `core/`
Tudo que é global e transversal ao app.

Exemplos:
- serviços de consumo da API
- interceptors de autenticação e tratamento de erro
- guards de rota
- configurações centrais
- modelos compartilhados de infraestrutura

### `features/`
Tudo que pertence a uma área de negócio.

Exemplo neste projeto:
- `projects/` para telas, serviços e regras dos projetos exibidos na aplicação

### `shared/`
Componentes e utilitários reutilizáveis entre várias features.

Exemplos:
- botões, cards, loading, empty-state
- pipes reutilizáveis
- diretivas
- funções utilitárias

### `layouts/`
Estruturas de página reutilizáveis.

Exemplo:
- layout principal com header, menu lateral e área de conteúdo

## Regra prática de organização

- Se for usado em todo o app, vai para `core/`
- Se pertencer a uma funcionalidade específica, vai para `features/`
- Se for reutilizável em várias funcionalidades, vai para `shared/`
- Se for estrutura visual da aplicação, vai para `layouts/`

## Sugestão para a integração com API

A API deve ficar centralizada em `core/services/`.
Cada feature consome apenas o que precisa, evitando duplicação e acoplamento.

Exemplo de organização futura:
- `core/services/projects-api.service.ts`
- `features/projects/pages/project-list/`
- `features/projects/pages/project-detail/`
- `features/projects/models/project.model.ts`

## Objetivo dessa estrutura

- facilitar a leitura do código
- reduzir conflitos entre desenvolvedores
- manter as responsabilidades separadas
- escalar sem virar uma pasta única e confusa
