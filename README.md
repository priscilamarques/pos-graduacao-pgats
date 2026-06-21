# Pós-Graduação PGATS — Testes e CI/CD

Serviço de exemplo em JavaScript coberto por testes automatizados (Mocha) e
integrado a uma pipeline de CI no GitHub Actions com quatro níveis de execução.

## Aplicação

`ServicoDePagamento` expõe duas operações:

- `pagar(codigoBarras, empresa, valor)` — registra um pagamento. Valores acima de
  `100.00` são classificados como `cara`; os demais como `padrão`.
- `consultarUltimoPagamento()` — retorna o último pagamento registrado, ou `null`
  quando não há registros.

## Estrutura

```
.
├── .github/workflows/
│   └── ci.yaml                 # pipeline única (níveis N1–N4)
├── entrega/
│   ├── src/ServicoDePagamento.js
│   ├── test/ServicoDePagamento.test.js
│   ├── package.json
│   └── package-lock.json
└── README.md
```

O código-fonte está em `entrega/`. Comandos npm devem ser executados a partir
dessa pasta.

## Requisitos

- Node.js 18+ (testado com 24.x)

## Execução local

```bash
cd entrega
npm ci        # instala dependências a partir do package-lock
npm test      # executa a suíte com Mocha
```

Saída esperada: 8 testes aprovados.

## Pipeline de CI

Os quatro níveis estão consolidados em `ci.yaml`, cada um associado a um gatilho:

| Nível | Gatilho            | Disparo                                              |
|-------|--------------------|------------------------------------------------------|
| N1    | `workflow_dispatch`| Execução manual via "Run workflow"                   |
| N2    | `schedule`         | Cron: a cada 30 min e toda sexta à meia-noite (UTC)  |
| N3    | `needs`            | Após conclusão bem-sucedida do job de deploy         |
| N4    | `push` na `master` | A cada push (testes → inspeção → deploy)             |

Notas:

- A inspeção de código usa `node --check` para validar a sintaxe dos arquivos,
  já que o projeto não possui linter configurado.
- O encadeamento N3 é feito via dependência entre jobs (`needs`), por estar tudo
  em um único workflow.
- Execuções agendadas (N2) só passam a valer com o `ci.yaml` na branch `master`,
  e o primeiro disparo do cron pode levar mais tempo que o intervalo definido.

## Stack

- Node.js
- Mocha + `assert` (nativo)
- GitHub Actions
