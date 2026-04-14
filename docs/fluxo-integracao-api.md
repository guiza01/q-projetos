# Fluxo de integração de uma API ao sistema

Este documento descreve o padrão recomendado para integrar uma API ao frontend.

## Objetivo

Centralizar a comunicação com a API e manter a interface desacoplada do contrato bruto do backend.

## Camadas sugeridas

### `core/`
Usar para tudo que for global:
- configuração base da API
- interceptors
- serviços centrais de comunicação
- modelos genéricos

### `features/`
Usar para regras específicas da funcionalidade.

### `shared/`
Usar apenas para utilitários e componentes reaproveitáveis.

## Fluxo recomendado

### 1. Definir o contrato da API

Crie interfaces que representem exatamente o que a API retorna.

Exemplo:
- `project-api.model.ts`
- `customer-api.model.ts`

### 2. Criar a configuração da API

Centralize URL base, rotas e constantes em um arquivo de configuração.

Exemplo:
- base URL
- paths de endpoint
- timeout

### 3. Criar o service de acesso à API

O service deve:
- chamar o endpoint
- retornar Observable
- não conter regra de interface
- não conter transformação visual

### 4. Criar o mapper

O mapper converte o retorno da API para o modelo usado pela aplicação.

Esse passo evita espalhar lógica de conversão por várias telas.

### 5. Criar o service da feature

Se a feature precisar de regras específicas, crie um service da feature para orquestrar:
- chamadas do core
- mapeamentos
- filtros
- ordenação
- regras de apresentação de dados

### 6. Consumir na página

A página deve apenas:
- chamar o service da feature
- exibir estados de carregamento
- exibir erro
- renderizar os dados

## Exemplo de fluxo

```text
Página -> Service da Feature -> Service da API -> API
Página <- Service da Feature <- Mapper <- Resposta da API
```

## Boas práticas

- não chamar HttpClient direto na página
- não misturar transformação de dados com HTML
- não repetir URL da API em vários arquivos
- usar interceptor para tratamento global de erro e autenticação, quando necessário
- manter nomes consistentes entre backend e frontend

## Arquivos típicos

```text
src/app/core/config/api.config.ts
src/app/core/models/project-api.model.ts
src/app/core/services/projects-api.service.ts
src/app/core/interceptors/error.interceptor.ts
src/app/features/projects/mappers/project.mapper.ts
src/app/features/projects/services/projects.service.ts
```

## Resultado esperado

Com essa organização, a integração fica:
- mais previsível
- mais fácil de testar
- mais fácil de trocar o backend no futuro
- menos sujeita a acoplamento entre tela e API
