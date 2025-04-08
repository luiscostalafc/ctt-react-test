import {
  ProductsState,
  ProductsActionTypes,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
} from "./types";

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

const productsReducer = (
  state = initialState,
  action: ProductsActionTypes
): ProductsState => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_PRODUCT_SUCCESS:
      return { ...state, items: [...state.items, action.payload] };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        items: state.items.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        items: state.items.filter((product) => product.id !== action.payload),
      };
    default:
      return state;
  }
};

export default productsReducer;
