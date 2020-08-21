import axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';
import * as React from 'react';
import * as ApiConstants from '../constants/apiConstants.json';
import * as StringConstants from '../constants/stringConstants.json';
import storageService from './storageService';
import I18n from '../I18n/I18n';

const baseURL = `${Config.BASE_URL}/${I18n.locale}/api`;

const doRefreshToken = () => {
  const refreshTokenEndpoint = ApiConstants.REFRESH_TOKEN_ENDPOINT;
  return new Promise((resolve) => {
    storageService.getData(StringConstants.REFRESH_TOKEN, null).then((refreshedToken) => {
      const api = axios.create({
        baseURL,
        timeout: 10000,
      });
      api
        .post(refreshTokenEndpoint, {
          refresh_token: refreshedToken,
        })
        .then((response) => {
          storageService.setData(StringConstants.USER_TOKEN, response.data.token).then(() => {
            storageService
              .setData(StringConstants.REFRESH_TOKEN, response.data.refresh_token)
              .then(() => {
                resolve(response.data.token);
              });
          });
        })
        .catch(() => {
          // logout();
          resolve('');
        });
    });
  });
};
const AxiosInterceptorService = () => {
  // const ignoredRefreshTokenURLs = [ApiConstants.LOGIN_ENDPOINT, ApiConstants.LOGOUT_ENDPOINT];
  const api = axios.create({
    baseURL,
    timeout: 10000,
  });

  const handleRequestInterceptor = async (request) => {
    const token = await storageService.getData(StringConstants.USER_TOKEN, null);
    if (token) {
      return {
        ...request,
        headers: {
          ...request.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }
    return request;
  };

  const watchResponseInterceptor = (response) => {
    if (response.headers['x-maintenance']) {
      // store.dispatch(enableMaintenanceMode({ message: response.headers['x-maintenance-message'] }));
    }
    return response;
  };

  const handleResponseInterceptorError = (error) => {
    let errorToReturn;
    if (!error.response) {
      errorToReturn = { message: I18n.t('check_internet'), code: 404 };
      // errorToReturn = { message: JSON.stringify(error), code: 404 };
    } else if (error.response.data.constructor === String) {
      errorToReturn = {
        message: `(${error.response.status}) ${error.response.data}`,
        code: error.response.status,
      };
    } else {
      errorToReturn = {
        message: `(${error.response.status}) ${error.response.data.message}`,
        code: error.response.status,
      };
    }
    if (errorToReturn.code === 406) {
      errorToReturn.message = I18n.t('error_406');
    } else if (errorToReturn.code === 409) {
      errorToReturn.message = I18n.t('error_409');
    } else if (
      errorToReturn.code === 400 &&
      error.response &&
      error.response.data &&
      error.response.data.errors &&
      error.response.data.errors.errors &&
      Array.isArray(error.response.data.errors.errors)
    ) {
      // eslint-disable-next-line prefer-destructuring
      errorToReturn.message = error.response.data.errors.errors[0];
    }
    return new Promise((resolve, reject) => {
      if (errorToReturn.code === 401) {
        doRefreshToken().then((token) => {
          if (token) {
            api.request(error.config).then((initialRequestResponse) => {
              resolve(initialRequestResponse);
            });
          } else {
            // logout();
            resolve();
          }
        });
      } else {
        reject(errorToReturn);
      }
    });
  };

  api.interceptors.request.use(
    (request) => handleRequestInterceptor(request),
    (error) => error,
  );

  api.interceptors.response.use(
    (response) => watchResponseInterceptor(response),
    (error) => handleResponseInterceptorError(error),
  );

  return api;
};
const ApiRef = React.createRef<AxiosInstance>();
export { AxiosInterceptorService, doRefreshToken, ApiRef };
