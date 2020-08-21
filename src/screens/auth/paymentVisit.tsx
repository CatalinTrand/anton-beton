import React, { useState } from 'react';
import {
  Keyboard,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { CURRENCY } from '../../../shared/constants/stringConstants.json';
import loginPageStyle from '../../../shared/styles/auth.ltr.style';
import Header from '../../components/sections/header';
import I18n from '../../../shared/I18n/I18n';
import { Colors, CustomIcons, Fonts, Metrics } from '../../../shared/themes';
import GlobalLtrStyle from '../../../shared/styles/global.ltr.style';
import DoctorProfileLtrStyle from '../../../shared/styles/doctorProfile.ltr.style';
import RegularButton from '../../../shared/components/buttons/regularButton';
import DoctorCellLtrStyle from '../../../shared/styles/doctorCell.ltr.styles';
import UserAvatar from '../../../shared/components/sections/userAvatar';
import FloatPlaceholderTextInput from '../../../shared/components/sections/floatPlaceholderTextInput';

const PaymentVisitScreen = ({ navigation }): JSX.Element => {
  const onPress = () => {
    navigation.navigate('SearchDoctor');
  };
  const stepString = `${I18n.t('step')} 3/3`;
  const disabledNextStep = () => {
    return false;
  };
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const selectedDoctor = {
    id: 2,
    name: 'Dr. Maria Luminita',
    firstName: 'Luminita',
    lastName: 'Maria',
    rating: 5.0,
    reviewsNumber: 83,
    urgentPrice: 150,
    specialization: 'neurologie',
    title: 'medic primar',
    status: 'offline',
    imgUrl: 'https://specials-images.forbesimg.com/imageserve/1139665860/960x0.jpg?fit=scale',
  };
  const [expirationCard, setExpirationCard] = useState('');
  const ratingString = `${selectedDoctor.rating} (${selectedDoctor.reviewsNumber})`;
  const priceString = `${CURRENCY} ${selectedDoctor.urgentPrice}`;
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
              {I18n.t('payment_talk')}
            </Text>
            <View style={[DoctorCellLtrStyle.wrapper]}>
              <View style={[DoctorCellLtrStyle.wrapperRow]}>
                <View
                  style={[
                    DoctorCellLtrStyle.avatar,
                    selectedDoctor.status === 'online'
                      ? { borderWidth: 2, borderColor: Colors.green }
                      : { borderWidth: 2, borderColor: Colors.grey },
                  ]}
                >
                  <UserAvatar
                    imageURL={selectedDoctor.imgUrl}
                    firstName={selectedDoctor.firstName}
                    lastName={selectedDoctor.lastName}
                    theme={Colors.borderGrey}
                    size={Metrics.avatarWidth}
                  />
                </View>
                <View style={[DoctorCellLtrStyle.rightData]}>
                  <Text style={[DoctorCellLtrStyle.specialization]}>{selectedDoctor.title}</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DoctorProfile', { data: selectedDoctor })}
                  >
                    <Text style={[DoctorCellLtrStyle.name]}>{selectedDoctor.name}</Text>
                  </TouchableOpacity>
                  <View style={[DoctorCellLtrStyle.ratingRow]}>
                    <CustomIcons name="star" size={Fonts.small} color={Colors.darkGrey} />
                    <Text style={[DoctorCellLtrStyle.ratingText]}>{ratingString}</Text>
                  </View>
                  <View />
                </View>
              </View>
              <View style={[{ borderTopWidth: 1, borderTopColor: Colors.grey }]}>
                <View
                  style={[
                    DoctorCellLtrStyle.wrapperRow,
                    {
                      justifyContent: 'space-between',
                    },
                  ]}
                >
                  <Text style={{ fontWeight: 'bold' }}>{I18n.t('price_estimation')}</Text>
                  <Text style={{ color: Colors.darkGrey }}>{priceString}</Text>
                </View>
              </View>
            </View>
            <View style={[DoctorProfileLtrStyle.row]}>
              <View style={[DoctorProfileLtrStyle.column, { width: '100%' }]}>
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
            <View style={[DoctorProfileLtrStyle.row, { marginTop: Metrics.doubleBaseMargin }]}>
              <Text style={{ color: Colors.darkGrey }}>{I18n.t('money_info')}</Text>
            </View>
            <View style={[DoctorProfileLtrStyle.row, { marginBottom: Metrics.doubleBaseMargin }]}>
              <View style={[DoctorProfileLtrStyle.column, { width: '100%' }]}>
                <RegularButton
                  disabledStyle={[{ backgroundColor: Colors.orangeOpacity }]}
                  disabledTitleStyle={[{ color: Colors.white }]}
                  disabled={disabledNextStep()}
                  title={I18n.t('finish')}
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

export default PaymentVisitScreen;
