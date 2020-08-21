import _ from 'lodash';
import loadedRoutes from './loadedRoutes.json';

const createErrorMessageSelector = () => (state) => {
  const actions = loadedRoutes;
  // returns the first error messages for actions
  // * We assume when any request fails on a page that
  //   requires multiple API calls, we shows the first error
  return (
    _(actions)
      .map((action) => _.get(state, `errorState.${action}`))
      .compact()
      .last() || ''
  );
};

const createLoadingSelector = () => (state) => {
  const actions = loadedRoutes;
  // returns true only when all actions is not loading
  return actions.some((action) => _.get(state, `loadingState.${action}`));
};

export { createErrorMessageSelector, createLoadingSelector };
