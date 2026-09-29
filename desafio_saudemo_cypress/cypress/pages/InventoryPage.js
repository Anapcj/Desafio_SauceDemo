class InventoryPage {
  elements = {
    pageTitle: () => cy.get('[data-test="title"]'),
    inventoryContainer: () => cy.get('[data-test="inventory-container"]'),
    sortDropdown: () => cy.get('[data-test="product-sort-container"]'),
    productCards: () => cy.get('[data-test="inventory-item"]'),
    productNames: () => cy.get('[data-test="inventory-item-name"]'),
    productPrices: () => cy.get('[data-test="inventory-item-price"]'),
    cartLink: () => cy.get('[data-test="shopping-cart-link"]')
  };

  assertLoaded() {
    this.elements.pageTitle()
      .should('be.visible')
      .and('have.text', 'Products');

    this.elements.inventoryContainer().should('be.visible');
  }

  addProductByName(productName) {
    this.elements.productCards()
      .filter(`:has([data-test="inventory-item-name"])`)
      .contains('[data-test="inventory-item-name"]', productName)
      .closest('[data-test="inventory-item"]')
      .find('button')
      .should('contain.text', 'Add to cart')
      .click();
      cy.wait(2000);
  }

  selectSortOption(value) {
    this.elements.sortDropdown().select(value);
  }

  getProductPrices() {
    return this.elements.productPrices().then(($prices) =>
      [...$prices].map((element) => Number(element.innerText.replace('$', '').trim()))
    );
  }

  openCart() {
    this.elements.cartLink().click();
  }
}

export default InventoryPage;
