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

const ForgotPasswordScreen = ({ navigation }): JSX.Element => {

  I18n.locale = 'ro';

  const onPress = () => {
    navigation.navigate('Auth', { screen: 'NewPassword' });
  };
  const [email, setEmail] = useState('');
  const disabledNextStep = () => {
    return !email;
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
              {I18n.t('reset_password')}
            </Text>
            <Text style={[GlobalLtrStyle.headline, { color: Colors.grey, fontSize: Fonts.medium }]}>
              {I18n.t('reset_password_text')}
            </Text>
            <View style={[DoctorProfileLtrStyle.row]}>
              <View style={[DoctorProfileLtrStyle.column, { width: '100%' }]}>
                <FloatPlaceholderTextInput
                  label={I18n.t('email')}
                  value={email}
                  type="regular"
                  onChange={(value) => setEmail(value)}
                />
              </View>
            </View>
            <View style={[DoctorProfileLtrStyle.row, { marginVertical: Metrics.doubleBaseMargin }]}>
              <View style={[DoctorProfileLtrStyle.column, { width: '100%' }]}>
                <RegularButton
                  disabledStyle={[{ backgroundColor: Colors.orangeOpacity }]}
                  disabledTitleStyle={[{ color: Colors.white }]}
                  disabled={disabledNextStep()}
                  title={I18n.t('reset_password')}
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

export default ForgotPasswordScreen;
