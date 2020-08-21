import I18n from 'i18n-js';
import React, { MutableRefObject, useEffect } from 'react';
import { AppState, StatusBar, View } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { AxiosInstance } from 'axios';
import MainAppNavigation from '../../components/navigation/appNavigation';
import { Colors } from '../../../shared/themes';
import { createErrorMessageSelector, createLoadingSelector } from './genericSeletors';
import StorageService from '../../../shared/services/storageService';
import { navigationRef, isMountedRef } from '../../../shared/services/navigationService';
import * as StringConstants from '../../../shared/constants/stringConstants.json';
import GlobalLtrStyle from '../../../shared/styles/global.ltr.style';
import LoadingSpinner from '../../../shared/views/LoadingSpinner';
import { ApiRef, AxiosInterceptorService } from '../../../shared/services/axiosService';

const ReduxAppWrapper = (): JSX.Element => {
  const loadingSelector = createLoadingSelector();
  const errorSelector = createErrorMessageSelector();
  const { isLoggedIn } = useSelector((state) => state.userState);
  const isLoading = useSelector((state) => loadingSelector(state));
  const error = useSelector((state) => errorSelector(state));
  useEffect(() => {
    (async () => {
      I18n.locale = await StorageService.getData(StringConstants.APP_LANGUAGE, 'en');
    })();
    return () => {
      try {
        // @ts-ignore
        AppState.removeAllListeners();
        // eslint-disable-next-line no-empty
      } catch (e) {}
    };
  }, []);
  useEffect(() => {
    (isMountedRef as MutableRefObject<boolean>).current = true;
    (ApiRef as MutableRefObject<AxiosInstance>).current = AxiosInterceptorService();
  }, []);
  return (
    <View style={GlobalLtrStyle.FlexView}>
      <StatusBar backgroundColor={Colors.grey} barStyle="dark-content" />
      <NavigationContainer ref={navigationRef}>
        <MainAppNavigation />
      </NavigationContainer>
      <LoadingSpinner
        visible={isLoading}
        textContent="Loading..."
        textStyle={{
          color: '#fff',
        }}
      />
    </View>
  );
};

export default ReduxAppWrapper;
