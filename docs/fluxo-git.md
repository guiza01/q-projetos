# Como sincronizar o repositório Git, fazer commit e push

Este guia mostra o fluxo padrão para trabalhar com Git no projeto.

## Objetivo

Evitar conflitos e manter o histórico do repositório organizado.

## Branches principais

Este projeto trabalha com duas branches fixas:

- `main`: produção
- `develop`: desenvolvimento

### Regra de uso

- `main` deve receber apenas versões prontas para produção
- `develop` deve concentrar as entregas do dia a dia
- novas tarefas devem sair de `develop`

## Fluxo recomendado

### 1. Atualizar a branch base

Antes de começar a trabalhar, sincronize `develop` com o repositório remoto.

Passos:
- verificar se você está em `develop`
- baixar as alterações mais recentes de `develop`
- resolver conflitos, se existirem

### 2. Criar uma branch nova para a tarefa

Nunca trabalhe direto em `main` ou `develop` para desenvolver uma tarefa nova.

Crie a branch a partir de `develop`.

Use um nome claro.

Exemplos:
- `feature/projects-list`
- `feature/api-integration`
- `fix/login-error`

### 3. Fazer as alterações necessárias

Implemente a tarefa com foco em uma única mudança por vez.

### 4. Verificar os arquivos alterados

Antes de commitar:
- revisar o diff
- confirmar se não entrou arquivo desnecessário
- validar se o código está correto

### 5. Fazer o commit

Use uma mensagem objetiva e descritiva.

Padrão sugerido:

```text
feat: adiciona fluxo de listagem de projetos
fix: corrige erro na integração da API
docs: adiciona guia de fluxo Git
```

### 6. Enviar para a branch remota

Depois do commit, faça o push da branch para o repositório remoto.

### 7. Abrir pull request

O pull request deve ser aberto para `develop`.

Quando a tarefa estiver pronta:
- abrir pull request
- revisar o código
- aguardar aprovação
- fazer merge apenas quando estiver validado

### 8. Fluxo de ida para produção

Quando `develop` estiver estável e pronta para entrega:

- criar uma branch de release, se o time usar esse padrão
- abrir pull request de `develop` para `main`
- revisar e aprovar
- fazer merge em `main`
- aplicar tag de versão, se necessário

## Rotina prática diária

### Antes de começar
1. atualizar `develop`
2. conferir a branch atual
3. criar a branch da tarefa a partir de `develop`

### Durante o desenvolvimento
1. fazer mudanças pequenas
2. testar o código
3. revisar os arquivos alterados

### Antes de subir
1. conferir o status do Git
2. fazer commit
3. fazer push
4. abrir pull request para `develop`

## Boas práticas

- sempre puxar as alterações de `develop` antes de começar
- evitar commits gigantes
- manter uma branch por tarefa
- usar mensagens claras
- não subir arquivos temporários ou desnecessários
- resolver conflitos com calma antes de continuar

## Resultado esperado

Seguindo esse fluxo, o time trabalha com:
- menos conflito de código
- histórico mais limpo
- maior rastreabilidade das mudanças
- revisão mais simples nas pull requests
