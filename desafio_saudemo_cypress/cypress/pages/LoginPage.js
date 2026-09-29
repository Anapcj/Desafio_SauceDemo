class LoginPage {
  elements = {
    usernameInput: () => cy.get('[data-test="username"]'),
    passwordInput: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    errorMessage: () => cy.get('[data-test="error"]')
  };

  visit() {
    cy.visit('/');
  }

  login(username, password) {
    this.elements.usernameInput().clear().type(username);
    cy.wait(1500);
    this.elements.passwordInput().clear().type(password, { log: false });
    cy.wait(1500);
    this.elements.loginButton().click();
    cy.wait(2000);

  }

  assertErrorMessage(message) {
    this.elements.errorMessage()
      .should('be.visible')
      .and('contain.text', message);
  }
}

export default LoginPage;
