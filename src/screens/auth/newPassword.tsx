import React, { useState } from 'react';
import { Keyboard, Text, View, TouchableWithoutFeedback } from 'react-native';
import loginPageStyle from '../../../shared/styles/auth.ltr.style';
import Header from '../../components/sections/header';
import I18n from '../../../shared/I18n/I18n';
import { Colors, CustomIcons, Fonts, Metrics } from '../../../shared/themes';
import GlobalLtrStyle from '../../../shared/styles/global.ltr.style';
import DoctorProfileLtrStyle from '../../../shared/styles/doctorProfile.ltr.style';
import RegularButton from '../../../shared/components/buttons/regularButton';
import FloatPlaceholderTextInput from '../../../shared/components/sections/floatPlaceholderTextInput';

const NewPasswordScreen = ({ navigation }): JSX.Element => {
  const onPress = () => {
    navigation.navigate('AppBottomTabNavigator', { screen: 'HomeStackNavigator' });
  };
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const disabledNextStep = () => {
    return !token || !password || !confirmPassword || password !== confirmPassword;
  };
  return (
    <>
      <Header
        leftComponent={
          <CustomIcons
            size={Fonts.medium}
            color={Colors.black}
            name="arrow-back"
            onPress={navigation.goBack}
          />
        }
      />
      <View style={loginPageStyle.containerView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={GlobalLtrStyle.centeredView}>
            <Text style={[GlobalLtrStyle.bigHeader, { color: Colors.orange, marginBottom: 0 }]}>
              {I18n.t('new_password')}
            </Text>
            <View style={[DoctorProfileLtrStyle.row]}>
              <View style={[DoctorProfileLtrStyle.column, { width: '100%' }]}>
                <FloatPlaceholderTextInput
                  label={I18n.t('token')}
                  value={token}
                  type="regular"
                  onChange={(value) => setToken(value)}
                />
                <FloatPlaceholderTextInput
                  label={I18n.t('password')}
                  value={password}
                  type="password"
                  onChange={(value) => setPassword(value)}
                />
                <FloatPlaceholderTextInput
                  label={I18n.t('confirm_password')}
                  value={confirmPassword}
                  type="password"
                  onChange={(value) => setConfirmPassword(value)}
                />
              </View>
            </View>
            <View style={[DoctorProfileLtrStyle.row, { marginVertical: Metrics.doubleBaseMargin }]}>
              <View style={[DoctorProfileLtrStyle.column, { width: '100%' }]}>
                <RegularButton
                  disabledStyle={[{ backgroundColor: Colors.orangeOpacity }]}
                  disabledTitleStyle={[{ color: Colors.white }]}
                  disabled={disabledNextStep()}
                  title={I18n.t('change_password')}
                  onPress={onPress}
                  buttonStyle={[
                    GlobalLtrStyle.buttonStyle,
                    {
                      marginTop: 50,
                      backgroundColor: Colors.orange,
                    },
                  ]}
                  containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default NewPasswordScreen;
