import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

describe('Fluxo E2E de compra - SauceDemo', () => {
  const products = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light'
  ];

  it('deve realizar uma compra completa com dois produtos', () => {
    const inventoryPage = new InventoryPage();
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();

    cy.login();
    inventoryPage.assertLoaded();

    products.forEach((product) => {
      inventoryPage.addProductByName(product);
    });

    inventoryPage.openCart();
    cartPage.assertLoaded();
    cartPage.assertProductsPresent(products);

    cartPage.proceedToCheckout();
    checkoutPage.assertInformationPageLoaded();

    checkoutPage.fillCustomerInformation({
      firstName: 'Ana',
      lastName: 'Cesario',
      postalCode: '32600-000'
    });
    cy.wait(2000);

    checkoutPage.continue();
    checkoutPage.finishOrder();

    checkoutPage.assertOrderSuccess();
    cy.wait(2000);
  });
});
