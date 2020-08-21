/**
 * @ref https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6
 * @param state
 * @param action
 * @returns {{}}
 */
const loadingReducer = (state = {}, action) => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|ERROR)/.exec(type);

  // not a *_REQUEST / *_SUCCESS /  *_ERROR actions, so we ignore them
  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,

    [requestName]: requestState === 'REQUEST',
  };
};

export default loadingReducer;
