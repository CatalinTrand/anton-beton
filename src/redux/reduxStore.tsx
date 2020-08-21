import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as PropTypes from 'prop-types';
import AuthReducer from './reducers/authReducer';
import * as sagas from './saga';
import { genericActionTypes as actionType } from './types/genericTypes';
import loadingReducer from './src/genericReducer';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const appReducer = combineReducers({
  loadingState: loadingReducer,
  userState: AuthReducer,
});

const rootReducer = (state, action: actionType) => {
  return appReducer(state, action);
};

const createPreloadedStore = (preloadedState: Record<string, unknown> | undefined) =>
  createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(sagaMiddleware)));

const store = createPreloadedStore({});

Object.values(sagas).map((saga) => {
  sagaMiddleware.run(saga);
  return saga;
});

const Provider = ({ children }) => <ReduxProvider store={store}>{children}</ReduxProvider>;
Provider.propTypes = {
  children: PropTypes.element.isRequired,
};
export { Provider, createPreloadedStore, store };
