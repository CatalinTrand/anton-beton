import React, { useState } from 'react';
import { Keyboard, Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import loginPageStyle from '../../../shared/styles/auth.ltr.style';
import Header from '../../components/sections/header';
import I18n from '../../../shared/I18n/I18n';
import { Colors, CustomIcons, Fonts, Metrics } from '../../../shared/themes';
import GlobalLtrStyle from '../../../shared/styles/global.ltr.style';
import DoctorProfileLtrStyle from '../../../shared/styles/doctorProfile.ltr.style';
import RegularButton from '../../../shared/components/buttons/regularButton';
import confirmationCodeStyle from '../../../shared/styles/confirmationCode.ltr.style';

const CheckPhoneNumberScreen = ({ navigation }): JSX.Element => {
  const codeLength = 5;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: codeLength });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const onPress = () => {
    navigation.navigate('PaymentVisit');
  };
  const stepString = `${I18n.t('step')} 2/3`;
  const disabledNextStep = () => {
    return !value || value.length < codeLength;
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
            <Text
              style={[GlobalLtrStyle.headline, { color: Colors.grey, textTransform: 'uppercase' }]}
            >
              {stepString}
            </Text>
            <Text style={[GlobalLtrStyle.bigHeader, { color: Colors.orange, marginBottom: 0 }]}>
              {I18n.t('check_phone')}
            </Text>
            <Text style={[GlobalLtrStyle.headline, { color: Colors.orange }]}>
              {I18n.t('check_phone_subtitle')}
            </Text>
            <View style={[DoctorProfileLtrStyle.row, { marginVertical: Metrics.doubleBaseMargin }]}>
              <View style={[DoctorProfileLtrStyle.column, { width: '100%' }]}>
                <CodeField
                  ref={ref}
                  {...props}
                  value={value}
                  onChangeText={setValue}
                  cellCount={codeLength}
                  rootStyle={confirmationCodeStyle.codeFiledRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <Text
                      key={index}
                      style={[
                        confirmationCodeStyle.cell,
                        isFocused && confirmationCodeStyle.focusCell,
                      ]}
                      onLayout={getCellOnLayoutHandler(index)}
                    >
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />
                <RegularButton
                  disabledStyle={[{ backgroundColor: Colors.orangeOpacity }]}
                  disabledTitleStyle={[{ color: Colors.white }]}
                  disabled={disabledNextStep()}
                  title={I18n.t('next_step')}
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

export default CheckPhoneNumberScreen;
