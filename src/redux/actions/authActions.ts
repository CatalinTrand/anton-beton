import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from '../types/authTypes';
import { genericActionTypes as actionType } from '../types/genericTypes';

const requestLogin = (payload): actionType => ({
  type: LOGIN_REQUEST,
  payload,
});

const requestLoginError = (payload): actionType => ({
  type: LOGIN_ERROR,
  payload,
});

const requestLoginSuccess = (payload): actionType => ({
  type: LOGIN_SUCCESS,
  payload,
});

const requestLogout = (payload): actionType => ({
  type: LOGOUT_REQUEST,
  payload,
});

const requestLogoutError = (payload): actionType => ({
  type: LOGOUT_ERROR,
  payload,
});

const requestLogoutSuccess = (payload): actionType => ({
  type: LOGOUT_SUCCESS,
  payload,
});

export {
  requestLogin,
  requestLoginError,
  requestLoginSuccess,
  requestLogout,
  requestLogoutError,
  requestLogoutSuccess,
};
