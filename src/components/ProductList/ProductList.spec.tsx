import { fetchProducts } from "../../store/products/actions";
import { getProductsService } from "../../services/productsApi";
import { makeStore } from "../../utils/storeFactory";

jest.mock("../../services/productsApi");

describe("Redux integration tests", () => {
  it("should fetch products and update state", async () => {
    (getProductsService as jest.Mock).mockResolvedValue([
      {
        id: "a3bb189e-8bf9-3888-9912-ace4e6543002",
        stock: 10,
        description: "Product 1",
        categories: ["cat1", "cat2"],
        price: 99.99,
      },
    ]);

    const store = makeStore();

    await store.dispatch(fetchProducts() as any);

    const state = store.getState();
    expect(state.products.loading).toBe(false);
    expect(state.products.items).toHaveLength(1);
    expect(state.products.items[0].description).toBe("Product 1");
  });
});
