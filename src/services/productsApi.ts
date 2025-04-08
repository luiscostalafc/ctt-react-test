import { PRODUCTS_MOCKS } from "../mocks/products";
import { Product } from "../store/products/types";

export const getProductsService = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PRODUCTS_MOCKS);
    }, 500);
  });
};

export const addProductService = (
  product: Omit<Product, "id">
): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...product,
        id: new Date().getTime().toString(),
      });
    }, 500);
  });
};

export const updateProductService = (product: Product): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(product);
    }, 500);
  });
};

export const deleteProductService = (id: string): Promise<{ id: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id });
    }, 500);
  });
};
