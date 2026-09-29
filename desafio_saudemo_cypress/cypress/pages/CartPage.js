class CartPage {
  elements = {
    pageTitle: () => cy.get('[data-test="title"]'),
    cartItems: () => cy.get('[data-test="inventory-item"]'),
    itemNames: () => cy.get('[data-test="inventory-item-name"]'),
    checkoutButton: () => cy.get('[data-test="checkout"]')
  };

  assertLoaded() {
    this.elements.pageTitle()
      .should('be.visible')
      .and('have.text', 'Your Cart');
  }

  assertProductsPresent(productNames) {
    productNames.forEach((productName) => {
      this.elements.itemNames()
        .should('contain.text', productName);
    });
  }

  proceedToCheckout() {
    this.elements.checkoutButton().click();
  }
}

export default CartPage;
