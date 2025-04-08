import { Dispatch } from "redux";
import {
  Product,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  ProductsActionTypes,
} from "./types";

import {
  getProductsService,
  addProductService,
  updateProductService,
  deleteProductService,
} from "../../services/productsApi";

export const fetchProducts = () => {
  return async (dispatch: Dispatch<ProductsActionTypes>) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
      const products: Product[] = await getProductsService();
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: products });
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: errorMessage });
    }
  };
};

export const createProduct = (product: Omit<Product, "id">) => {
  return async (dispatch: Dispatch<ProductsActionTypes>) => {
    try {
      const newProduct = await addProductService(product);
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: newProduct });
    } catch (error) {
      console.error(error);
    }
  };
};

export const editProduct = (product: Product) => {
  return async (dispatch: Dispatch<ProductsActionTypes>) => {
    try {
      const updated = await updateProductService(product);
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: updated });
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeProduct = (id: string) => {
  return async (dispatch: Dispatch<ProductsActionTypes>) => {
    try {
      await deleteProductService(id);
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
    } catch (error) {
      console.error(error);
    }
  };
};
