import { LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../types/authTypes';
import { genericActionTypes as actionType } from '../types/genericTypes';

function AuthReducer(
  state = {
    isLoggedIn: undefined,
    changePasswordError: undefined,
  },
  action: actionType,
) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...action.payload, isLoggedIn: true };
    case LOGIN_ERROR:
      return { ...state, isLoggedIn: false };
    case LOGOUT_SUCCESS:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

export default AuthReducer;
