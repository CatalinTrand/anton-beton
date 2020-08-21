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

const AddCreditCardScreen = ({ navigation }): JSX.Element => {
  const onPress = () => {
    navigation.navigate('Auth', { screen: 'SearchDoctor' });
  };
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const stepString = `${I18n.t('step')} 2/2`;
  const [expirationCard, setExpirationCard] = useState('');
  const disabledNextStep = () => {
    return !cardHolder || !cardNumber || !cvv || !expirationCard;
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
              {I18n.t('add_card')}
            </Text>
            <View style={[DoctorProfileLtrStyle.row]}>
              <View style={[DoctorProfileLtrStyle.column, { width: '100%' }]}>
                <FloatPlaceholderTextInput
                  label={I18n.t('card_holder')}
                  value={cardHolder}
                  type="regular"
                  onChange={(value) => setCardHolder(value)}
                />
                <FloatPlaceholderTextInput
                  label={I18n.t('card_number')}
                  value={cardNumber}
                  type="regular"
                  onChange={(value) => setCardNumber(value)}
                />
              </View>
            </View>
            <View style={[DoctorProfileLtrStyle.row, { justifyContent: 'space-between' }]}>
              <View style={[DoctorProfileLtrStyle.column, { width: '45%' }]}>
                <FloatPlaceholderTextInput
                  label="LL/AA"
                  value={expirationCard}
                  type="expiration"
                  onChange={(value) => setExpirationCard(value)}
                />
              </View>
              <View style={[DoctorProfileLtrStyle.column, { width: '45%' }]}>
                <FloatPlaceholderTextInput
                  label="CVV"
                  value={cvv}
                  type="regular"
                  onChange={(value) => setCvv(value)}
                />
              </View>
            </View>
            <View style={[DoctorProfileLtrStyle.row, { marginVertical: Metrics.doubleBaseMargin }]}>
              <View style={[DoctorProfileLtrStyle.column, { width: '100%' }]}>
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

export default AddCreditCardScreen;
