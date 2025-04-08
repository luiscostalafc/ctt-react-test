export interface Product {
  id: string;
  stock: number;
  description: string;
  categories: string[];
  price: number;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";

interface FetchProductsRequestAction {
  type: typeof FETCH_PRODUCTS_REQUEST;
}

interface FetchProductsSuccessAction {
  type: typeof FETCH_PRODUCTS_SUCCESS;
  payload: Product[];
}

interface FetchProductsFailureAction {
  type: typeof FETCH_PRODUCTS_FAILURE;
  payload: string;
}

interface AddProductSuccessAction {
  type: typeof ADD_PRODUCT_SUCCESS;
  payload: Product;
}

interface UpdateProductSuccessAction {
  type: typeof UPDATE_PRODUCT_SUCCESS;
  payload: Product;
}

interface DeleteProductSuccessAction {
  type: typeof DELETE_PRODUCT_SUCCESS;
  payload: string;
}

export type ProductsActionTypes =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailureAction
  | AddProductSuccessAction
  | UpdateProductSuccessAction
  | DeleteProductSuccessAction;
