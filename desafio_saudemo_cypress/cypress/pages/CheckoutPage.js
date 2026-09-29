class CheckoutPage {
  elements = {
    pageTitle: () => cy.get('[data-test="title"]'),
    firstName: () => cy.get('[data-test="firstName"]'),
    lastName: () => cy.get('[data-test="lastName"]'),
    postalCode: () => cy.get('[data-test="postalCode"]'),
    continueButton: () => cy.get('[data-test="continue"]'),
    finishButton: () => cy.get('[data-test="finish"]'),
    completeHeader: () => cy.get('[data-test="complete-header"]')
  };

  assertInformationPageLoaded() {
    this.elements.pageTitle()
      .should('be.visible')
      .and('have.text', 'Checkout: Your Information');
  }

  fillCustomerInformation({ firstName, lastName, postalCode }) {
    this.elements.firstName().clear().type(firstName);
    this.elements.lastName().clear().type(lastName);
    this.elements.postalCode().clear().type(postalCode);
  }

  continue() {
    this.elements.continueButton().click();
  }

  finishOrder() {
    this.elements.finishButton().click();
  }

  assertOrderSuccess() {
    this.elements.completeHeader()
      .should('be.visible')
      .and('have.text', 'Thank you for your order!');
  }
}

export default CheckoutPage;
