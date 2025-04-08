import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import productsReducer from "../store/products/reducer";
import thunk from "../store/thunkMiddleware";

const rootReducer = combineReducers({
  products: productsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const makeStore = () =>
  createStore(rootReducer, undefined, applyMiddleware(thunk));
