# Desafio SauceDemo - Cypress

Projeto de automação de testes E2E para a aplicação de demonstração **SauceDemo (Swag Labs)**, desenvolvido em JavaScript com o framawork Cypress.

## Objetivo:

Automatizar os cenários propostos no desafio:

1. Login com sucesso.
2. Login inválido com `locked_out_user`.
3. Fluxo completo de compra:
   - login;
   - inclusão de dois produtos;
   - validação dos produtos no carrinho;
   - preenchimento do checkout;
   - finalização da compra;
   - validação da mensagem `Thank you for your order!`.
4. Ordenação do catálogo por preço `Low to High`.

Aplicação: https://www.saucedemo.com/

---
## Tecnologias:

- JavaScript
- Cypress 16.1.0
- Node.js
- npm
- Arquitetura Page Object Model (POM)
- Cypress Custom Commands
- Fixtures para dados de teste

A versão `16.1.0` foi definida no `package.json` para permitir que o projeto seja reprodutível.

---
## Pré-requisitos:

Recomenda-se utilizar uma versão atual suportada do Node.js e npm.

Verifique as versões instaladas:

```bash
node --version
npm --version
```

A documentação oficial do Cypress informa os requisitos de sistema e versões de Node.js suportadas:
https://docs.cypress.io/app/get-started/install-cypress

---
## Instalação:

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
## Execução dos testes:

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
## Estrutura do projeto:

```text
desafio_saudemo_cypress/
├── cypress/
│   ├── e2e/
│   │   ├── ordenacao_produtos.cy.js
│   │   ├── login.cy.js
│   │   └── fluxo_compras.cy.js
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
├── package-lock.json
└── package.json
└── README.md
└── cypress.config.js
```

---
## Arquitetura escolhida:

### Page Object Model

O projeto utiliza **Page Object Model (POM)** para separar a lógica da aplicação dos cenários de negócio.

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

## Cenários automatizados:

| ID | Cenário | Arquivo |
|---|---|---|
| CT-01 | Login com credenciais válidas (sucesso) | `login.cy.js` |
| CT-02 | Login inválido `locked_out_user` | `login.cy.js` |
| CT-03 | Compra completa com dois produtos (fluxo_compras) | `purchase.cy.js` |
| CT-04 | Ordenação Low to High (ordenacao) | `catalog.cy.js` |

---
## Estratégia de validação da ordenação:

Após selecionar a opção:

```text
Price (low to high)
```

o teste coleta os preços exibidos na página, converte os valores para números e compara a sequência apresentada.

Exemplo conceitual:

```javascript
const sortedPrices = [...prices].sort((a, b) => a - b);

expect(prices).to.deep.equal(sortedPrices);
```

Assim, o teste não depende de uma lista fixa de preços e valida o comportamento de ordenação propriamente dito.

---
## Boas práticas utilizadas:

- Separação entre teste e implementação da página.
- Reutilização de fluxos através de Custom Commands.
- Dados de teste isolados em fixtures.
- Seletores orientados a `data-test`.
- Asserções explícitas nos pontos relevantes do fluxo.
- Nomes de testes orientados ao comportamento esperado.
- Evitar seletores excessivamente dependentes de CSS visual.
- Conversão de preços para números antes da comparação.
- Configuração centralizada no `cypress.config.js`.
- Evidência de screenshot em caso de falha.
- Scripts npm para facilitar execução local e CI.

---
## Inteligência Artificial:

A Inteligência Artificial foi utilizada como apoio ao desenvolvimento para:

- auxiliar na estruturação da arquitetura inicial;
- revisar boas práticas de Cypress;
- sugerir/revisar organização em Page Objects;
- apoiar na criação da base dos cenários E2E;
- auxiliar na revisão de seletores e asserções;
- auxiliar na elaboração e refinamento da documentação;
- revisar a estratégia de validação da ordenação.

O histórico dos principais prompts está disponível na sessão descrita abaixo deste documento (Histórico Prompts).

---
## Evoluções:

Caso o projeto fosse ampliado, poderiam ser adicionados:

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
## Referências:

Cypress - instalação:
https://docs.cypress.io/app/get-started/install-cypress

Cypress - configuração:
https://docs.cypress.io/app/references/configuration

SauceDemo:
https://www.saucedemo.com/

---

<details>
  <summary><b>Histórico de Prompts</b></summary>
  
  ### Histórico de Prompts - Desafio SauceDemo 

Este sessão registra o histórico dos principais prompts utilizados durante a construção do projeto.

---
## Prompt 01 - Estrutura inicial do projeto:

**Objetivo:** criar a base do projeto Cypress.

**Prompt:**

```text
Crie a base de um projeto de automação de testes E2E utilizando JavaScript e o framework Cypress para a aplicação SauceDemo (Swag Labs), considerando boas práticas de arquitetura, manutenção e reutilização de código.
```

**O resultado foi a criação de um arquivo com a estrutura base do projeto:**

---
## Prompt 02 - Arquitetura Page Object Model:

**Objetivo:** evitar duplicação e separar regras de negócio dos detalhes de interface.

**Prompt:**

```text
Estruture os testes Cypress utilizando Page Object Model. Crie Page Objects separados para Login, Inventory, Cart e Checkout, centralizando seletores e ações de cada página. Os specs devem permanecer simples e claros.
```

**O resultado foi a criação dos seguintes arquivos:**

- `LoginPage.js`
- `InventoryPage.js`
- `CartPage.js`
- `CheckoutPage.js`

---
## Prompt 03 - Cenários propostos: 

**Objetivo:** implementar os cenários solicitados no desafio.

**Prompt:**

```text
Criar a estrutura base dos seguintes cenários E2E no SauceDemo:
1. login com usuário válido (sucesso);
2. login inválido com locked_out_user;
3. fluxo completo de compra com pelo menos dois produtos, validação do carrinho, checkout e mensagem de sucesso;
4. ordenação do catálogo por preço Low to High.
Utilize boas práticas de Cypress e asserções claras.
```

**O resultado foi a criação da base dos cenários propostos:**

---
## Prompt 04 - Reutilização do login:

**Objetivo:** reduzir repetição de código.

**Prompt:**

```text
Crie um Cypress Custom Command para realizar o login padrão no SauceDemo. O comando deve aceitar usuário e senha opcionais e permitir reutilização pelos diferentes specs.
```

**O resultado foi a criação do arquivo:**

- `cypress/support/commands.js`

---
## Prompt 05 - Dados de teste:

**Objetivo:** separar credenciais da implementação dos testes.

**Prompt:**

```text
Separe os usuários de teste do código dos specs utilizando Cypress fixtures. Crie dados para standard_user e locked_out_user.
```

**O resultado foi a criação do arquivo solicitado:**

---
## Prompt 06 - Validar ordenação:

**Objetivo:** garantir que o teste valide o comportamento e não apenas uma sequência fixa.

**Prompt:**

```text
Para o teste de ordenação, obtenha todos os preços exibidos no catálogo, converta os valores para números e compare a sequência atual com uma cópia ordenada numericamente. Evite hard-code da sequência esperada.
```

**O resultado foi a criação dos seguintes documentos:**

- método `getProductPrices()` em `InventoryPage.js`;
- comparação da lista real com a lista ordenada em `catalog.cy.js`.

---
## Prompt 07 - Boas práticas:

**Objetivo:** revisar a qualidade técnica da solução.

**Prompt:**

```text
Revise o projeto Cypress E2E para identificar práticas que aumentem manutenção, legibilidade e estabilidade. Considere Page Object Model, seletores data-test, reutilização de comandos, fixtures, asserções e configuração centralizada.
```

**Resultado utilizado:**

- priorização de seletores;
- centralização de configuração;
- separação Page Object / spec;
- reutilização via Custom Command.

---
## Prompt 08 - Documentação:

**Objetivo:** auxiliar na elaboração da documentação adequada para entrega em GitHub.

**Prompt:**

```text
Criar um documento base README.md para um projeto Cypress E2E contendo objetivo, pré-requisitos, instalação, comandos para execução headless e com interface gráfica, arquitetura escolhida, estrutura de pastas, cenários automatizados, boas práticas, uso de IA e referências.
```

**O resultado foi a criação do documento base e a revisão do mesmo:**

---
## Prompt 09 - Revisão final:

**Objetivo:** conferir se os artefatos atendem aos requisitos.

**Prompt:**

```text
Fazer uma revisão final de um desafio técnico de automação E2E com Cypress para SauceDemo. Verifique se os quatro cenários propostos estão cobertos, se existe README.md detalhado, se existe histórico de prompts, se a arquitetura é clara e se os comandos de instalação e execução estão documentados.
```

**O resultado foi:**

- checklist dos requisitos;
- ajustes de documentação;
- confirmação da presença dos artefatos obrigatórios.

---
## Uso responsável de IA

A IA foi utilizada como ferramenta de apoio no desenvolvimento. 
</details>

<details>
  <summary><b>Test Cases</b></summary>
  
  ### Test Cases

## CT-01 - Login com sucesso

**Pré-condição:** aplicação disponível.

**Dados:**
- Usuário: `standard_user`
- Senha: `secret_sauce`

**Passos:**
1. Acessar a aplicação.
2. Informar usuário válido.
3. Informar senha válida.
4. Clicar em Login.

**Resultado esperado:** usuário é direcionado ao catálogo e a página apresenta o título `Products`.

---
## CT-02 - Login inválido com usuário bloqueado

**Dados:**
- Usuário: `locked_out_user`
- Senha: `secret_sauce`

**Passos:**
1. Acessar a aplicação.
2. Informar usuário bloqueado.
3. Informar senha.
4. Clicar em Login.

**Resultado esperado:** aplicação apresenta a mensagem:

`Epic sadface: Sorry, this user has been locked out.`

---
## CT-03 - Compra completa (fluxo_compra)

**Dados:**
- `Sauce Labs Backpack`
- `Sauce Labs Bike Light`

**Passos:**
1. Fazer login.
2. Adicionar os dois produtos.
3. Acessar o carrinho.
4. Validar os produtos.
5. Iniciar checkout.
6. Preencher nome, sobrenome e CEP.
7. Continuar.
8. Finalizar pedido.

**Resultado esperado:** aplicação apresenta:

`Thank you for your order!`

---
## CT-04 - Ordenação por preço

**Passos:**
1. Fazer login.
2. Acessar o catálogo.
3. Selecionar `Price (low to high)`.
4. Coletar os preços exibidos.
5. Comparar a sequência apresentada com a sequência ordenada numericamente.

**Resultado esperado:** preços apresentados em ordem crescente.

</details>



