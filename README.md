# SauceDemo E2E Automation - Cypress

Projeto de automação de testes E2E para a aplicação de demonstração **SauceDemo (Swag Labs)**, desenvolvido em JavaScript com Cypress.

## Objetivo

Automatizar os cenários obrigatórios propostos no desafio:

1. Login com sucesso.
2. Login inválido com `locked_out_user`.
3. Fluxo completo de compra E2E:
   - login;
   - inclusão de dois produtos;
   - validação dos produtos no carrinho;
   - preenchimento do checkout;
   - finalização da compra;
   - validação da mensagem `Thank you for your order!`.
4. Ordenação do catálogo por preço `Low to High`.

Aplicação: https://www.saucedemo.com/

---

## Tecnologias

- JavaScript
- Cypress 16.1.0
- Node.js
- npm
- Arquitetura Page Object Model (POM)
- Cypress Custom Commands
- Fixtures para dados de teste

A versão `16.1.0` foi definida no `package.json` para manter o projeto reprodutível.

---

## Pré-requisitos

Recomenda-se utilizar uma versão atual suportada do Node.js e npm.

Verifique as versões instaladas:

```bash
node --version
npm --version
```

A documentação oficial do Cypress informa os requisitos de sistema e versões de Node.js suportadas:
https://docs.cypress.io/app/get-started/install-cypress

---

## Instalação

Clone o repositório e acesse a pasta do projeto:

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd desafio_saudemo_cypress
```

Instale as dependências:

```bash
npm install
```

O Cypress é instalado como dependência de desenvolvimento. Caso o ambiente não tenha baixado o binário automaticamente, execute:

```bash
npx cypress install
```

---

## Execução dos testes

### Interface gráfica

```bash
npm run cy:open
```

Ou:

```bash
npx cypress open
```

Na interface do Cypress, selecione **E2E Testing** e escolha o navegador desejado.

### Execução headless

```bash
npm run cy:run
```

### Execução em modo headed

```bash
npm run test:headed
```

### Execução utilizando Chrome

```bash
npm run test:chrome
```

### Execução dos specs E2E

```bash
npm run test:spec
```

Também é possível executar um spec específico:

```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

---

## Estrutura do projeto

```text
desafio_saudemo_cypress/
├── cypress/
│   ├── e2e/
│   │   ├── catalog.cy.js
│   │   ├── login.cy.js
│   │   └── purchase.cy.js
│   ├── fixtures/
│   │   └── users.json
│   ├── pages/
│   │   ├── CartPage.js
│   │   ├── CheckoutPage.js
│   │   ├── InventoryPage.js
│   │   └── LoginPage.js
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── .gitignore
├── cypress.config.js
├── package.json
├── PROMPTS.md
└── README.md
```

---

## Arquitetura escolhida

### Page Object Model

O projeto utiliza **Page Object Model (POM)** para separar a lógica de interação com a aplicação dos cenários de negócio.

Cada página possui uma classe responsável por:

- centralizar seletores;
- encapsular ações;
- disponibilizar métodos reutilizáveis;
- manter os testes E2E mais próximos da linguagem de negócio.

Exemplos:

- `LoginPage.js`: login e validação de mensagem de erro.
- `InventoryPage.js`: catálogo, inclusão de produtos e ordenação.
- `CartPage.js`: validação do carrinho e avanço para checkout.
- `CheckoutPage.js`: preenchimento e finalização da compra.

### Custom Commands

O comando:

```javascript
cy.login();
```

centraliza o fluxo de autenticação padrão e reduz duplicação entre os testes.

### Fixtures

As credenciais ficam em:

```text
cypress/fixtures/users.json
```

Isso evita deixar dados de teste espalhados pelos specs.

### Seletores

A automação prioriza atributos `data-test` disponibilizados pela aplicação, reduzindo a dependência de classes CSS de apresentação.

---

## Cenários automatizados

| ID | Cenário | Arquivo |
|---|---|---|
| CT-01 | Login com credenciais válidas | `login.cy.js` |
| CT-02 | Login com `locked_out_user` | `login.cy.js` |
| CT-03 | Compra completa com dois produtos | `purchase.cy.js` |
| CT-04 | Ordenação Low to High | `catalog.cy.js` |

---

## Estratégia de validação da ordenação

Após selecionar a opção:

```text
Price (low to high)
```

o teste coleta os preços exibidos na página, converte os valores para números e compara a sequência apresentada com uma cópia ordenada numericamente.

Exemplo conceitual:

```javascript
const sortedPrices = [...prices].sort((a, b) => a - b);

expect(prices).to.deep.equal(sortedPrices);
```

Assim, o teste não depende de uma lista fixa de preços e valida o comportamento de ordenação propriamente dito.

---

## Boas práticas utilizadas

- Separação entre teste e implementação da página.
- Reutilização de fluxos através de Custom Commands.
- Dados de teste isolados em fixtures.
- Seletores orientados a `data-test`.
- Asserções explícitas nos pontos relevantes do fluxo.
- Nomes de testes orientados ao comportamento esperado.
- Evitar `cy.wait()` com tempos fixos.
- Evitar seletores excessivamente dependentes de CSS visual.
- Conversão de preços para números antes da comparação.
- Configuração centralizada no `cypress.config.js`.
- Evidência de screenshot em caso de falha.
- Scripts npm para facilitar execução local e CI.

---

## Inteligência Artificial

A Inteligência Artificial foi utilizada como apoio ao desenvolvimento para:

- estruturar a arquitetura inicial;
- revisar boas práticas de Cypress;
- sugerir organização em Page Objects;
- apoiar a criação dos cenários E2E;
- revisar seletores e asserções;
- elaborar documentação;
- revisar a estratégia de validação da ordenação.

O histórico dos principais prompts utilizados está disponível em:

```text
PROMPTS.md
```

O arquivo documenta os objetivos dos prompts e as decisões resultantes, sem expor raciocínio interno ou conteúdo privado do modelo.

---

## Possíveis evoluções

Caso o projeto fosse ampliado para um contexto produtivo, poderiam ser adicionados:

- pipeline CI/CD;
- execução paralela;
- relatórios de testes;
- integração com Cypress Cloud;
- testes de API;
- testes de contrato;
- maior cobertura de cenários negativos;
- matriz de dados para diferentes usuários;
- validação de mensagens de erro dos campos de checkout;
- tags ou separação por smoke/regression;
- integração com gestão de defeitos.

---

## Referências

Cypress - instalação:
https://docs.cypress.io/app/get-started/install-cypress

Cypress - configuração:
https://docs.cypress.io/app/references/configuration

Cypress - execução via CLI:
https://docs.cypress.io/app/references/command-line

Cypress - variáveis de ambiente:
https://docs.cypress.io/app/guides/environment-variables

SauceDemo:
https://www.saucedemo.com/

---
## Observação

Este projeto foi estruturado especificamente para o desafio proposto. Antes da entrega, recomenda-se executar a suíte localmente com:

```bash
npm install
npm run cy:run
```

e confirmar que todos os cenários estão verdes no ambiente disponível.

<details>
  <details>teste</<details>

  ### Este é o conteúdo oculto!
  Você pode colocar qualquer coisa aqui dentro:
  - Listas de passos;
  - Explicações longas;
  - Ou até blocos de código com as três crases:
  
  ```javascript
  cy.get('[data-test="username"]').type('standard_user')
  ```
</details>
