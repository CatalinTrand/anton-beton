import React from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import ApiConstants from '../../../shared/constants/apiConstants.json';
import Colors from '../../../shared/themes/Colors';
import I18n from '../../../shared/I18n/I18n';
import Header from '../../components/sections/header';
import { CustomIcons, Fonts } from '../../../shared/themes';
import GlobalLtrStyle from '../../../shared/styles/global.ltr.style';

const PrivacyPolicy = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Header
        leftComponent={
          <CustomIcons
            size={Fonts.medium}
            color={Colors.black}
            name="arrow-back"
            onPress={navigation.goBack}
          />
        }
        centerComponent={<Text style={GlobalLtrStyle.headerText}>{I18n.t('privacy_title')}</Text>}
      />
      <WebView
        source={{
          uri: ApiConstants.GET_PRIVACY_POLICY,
        }}
      />
    </View>
  );
};

export default PrivacyPolicy;
