import { authReducer } from "./auth";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { stationsReducer } from "./stations";

const rootReducer = combineReducers({
  auth: authReducer,
  stations: stationsReducer,
});

export const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk)
);
