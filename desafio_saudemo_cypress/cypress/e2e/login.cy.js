import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';

describe('Autenticação - SauceDemo', () => {
  let users;

  before(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });
  });

  it('deve realizar login com credenciais válidas', () => {
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();

    loginPage.visit();
    loginPage.login(users.valid.username, users.valid.password);

    inventoryPage.assertLoaded();

  });

  it('deve bloquear o acesso para o usuário locked_out_user', () => {
    const loginPage = new LoginPage();

    loginPage.visit();
    loginPage.login(users.lockedOut.username, users.lockedOut.password);

    loginPage.assertErrorMessage(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
});
