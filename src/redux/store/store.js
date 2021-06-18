import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import UiReducer from "../reducers/UiReducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger();

const middlewares = [thunk, logger];

const configureStore = () => {
  const store = createStore(
    combineReducers({
      UiReducer:UiReducer
    }),
    composeEnhancers(applyMiddleware(...middlewares))
  );
  return store;
};

export default configureStore;
