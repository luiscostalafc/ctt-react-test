import { Middleware } from "redux";
import { AppState } from "./index";

const thunk: Middleware<{}, AppState> =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };

export default thunk;
