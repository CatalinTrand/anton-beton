import { call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import * as StringConstants from '../../../shared/constants/stringConstants.json';
import {
  requestLoginError,
  requestLoginSuccess,
  requestLogoutError,
  requestLogoutSuccess,
} from '../actions/authActions';
import { loginUserAPI, logoutUserAPI } from '../api/authApi';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../types/authTypes';
import storageService from '../../../shared/services/storageService';
import I18n from '../../../shared/I18n/I18n';
import userSelector from '../selector/userSelector';

function* logIn(action) {
  try {
    const response = yield call(loginUserAPI, action.payload);
    if (!response || !response.data || response?.data?.status === 'failure') {
      yield put(requestLoginError({ message: I18n.t('wrong_user') }));
      Alert.alert(I18n.t('error'), I18n.t('invalid_username_password'));
      return;
    }
    storageService.setData(StringConstants.USER_TOKEN, response.data.token);
    storageService.setData(StringConstants.REFRESH_TOKEN, response.data.refresh_token);
    yield put(requestLoginSuccess(userSelector(response.data.user)));
  } catch (e) {
    if (e.response?.status === 401) {
      Alert.alert(I18n.t('error'), I18n.t('invalid_username_password'));
    } else {
      Alert.alert(I18n.t('error'), e.message);
    }
    yield put(requestLoginError({ message: e.message }));
  }
}

function* logOut() {
  try {
    yield call(logoutUserAPI);
    yield put(requestLogoutSuccess({}));
    storageService.clearAll();
  } catch (e) {
    Alert.alert(I18n.t('error'), e.message);
    yield put(requestLogoutError({ message: e.message }));
  }
}

function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, logIn);
  yield takeLatest(LOGOUT_REQUEST, logOut);
}

export default authSaga;
