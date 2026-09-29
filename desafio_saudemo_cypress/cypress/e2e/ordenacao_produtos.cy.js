import InventoryPage from '../pages/InventoryPage';

describe('Catálogo - ordenação de produtos', () => {
  it('deve ordenar os produtos por preço do menor para o maior', () => {
    const inventoryPage = new InventoryPage();

    cy.login();
    inventoryPage.assertLoaded();

    inventoryPage.selectSortOption('lohi');

    inventoryPage.getProductPrices().then((prices) => {
      const sortedPrices = [...prices].sort((a, b) => a - b);

      expect(prices, 'preços exibidos após Low to High').to.deep.equal(sortedPrices);
      cy.wait(2000);
    });
  });
});
