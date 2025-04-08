// We use legacy_createStore to avoid the deprecation warning from createStore.
// Redux Toolkit's configureStore is the recommended approach, but it's not allowed in this test.
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import productsReducer from "./products/reducer";
import thunk from "./thunkMiddleware";

const rootReducer = combineReducers({
  products: productsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, undefined, applyMiddleware(thunk));

export default store;
