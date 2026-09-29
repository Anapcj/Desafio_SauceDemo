import LoginPage from '../pages/LoginPage';

Cypress.Commands.add('login', (username = 'standard_user', password = 'secret_sauce') => {
  const loginPage = new LoginPage();

  loginPage.visit();
  loginPage.login(username, password);
});
