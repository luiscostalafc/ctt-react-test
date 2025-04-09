import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { AppState } from "../store";
import { ProductsActionTypes } from "../store/products/types";

export type AppDispatch = ThunkDispatch<AppState, unknown, ProductsActionTypes>;

export const useProductDispatch = () => useDispatch<AppDispatch>();
