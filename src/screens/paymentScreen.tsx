import PaymentScreenLtrStyle from '../../shared/styles/paymentScreen.ltr.style';
import Colors from "../../shared/themes/Colors";
import Header from "../components/sections/header";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import {SafeAreaView, ScrollView, Text, TextInput, View} from "react-native";
import I18n from "../../shared/I18n/I18n";
import UserAvatar from "../../shared/components/sections/userAvatar";
import Metrics from "../../shared/themes/Metrics";
import * as React from "react";
import {useState} from "react";
import GlobalLtrStyle from "../../shared/styles/global.ltr.style";
import RegularButton from "../../shared/components/buttons/regularButton";

const PaymentScreen = ({route, navigation}) => {

  const {time, date, pacient, doctor, documents} = route.params;

  const [state, setState] = useState({
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: ""
  });

  const setCardName = (name) => {
    setState({
      cardName: name,
      cardNumber: state.cardNumber,
      expirationDate: state.expirationDate,
      cvv: state.cvv
    });
  };

  const setCardNumber = (number) => {
    setState({
      cardName: state.cardName,
      cardNumber: number,
      expirationDate: state.expirationDate,
      cvv: state.cvv
    });
  };

  const setCardExpirationDate = (date) => {
    setState({
      cardName: state.cardName,
      cardNumber: state.cardNumber,
      expirationDate: date,
      cvv: state.cvv
    });
  };

  const setCardCvv = (cvv) => {
    setState({
      cardName: state.cardName,
      cardNumber: state.cardNumber,
      expirationDate: state.expirationDate,
      cvv: cvv
    });
  };

  const prettyDate = (date) => {
    let day = date.split('-')[0];
    if (day.length == 2 && day[0] == '0')
      day = day.substring(1);
    let month = date.split('-')[1];
    if (month.length == 2 && month[0] == '0')
      month = month.substring(1);
    let year = date.split('-')[2];

    return day + " " + I18n.t('month_' + month) + ", " + year;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <Header
        placement="left"
        leftComponent={
          <CustomIcons
            size={Fonts.medium}
            color={Colors.black}
            name="arrow-back"
            onPress={navigation.goBack}
          />
        }
        centerComponent={null}
        rightComponent={null}
        noBorder={true}
      />
      <ScrollView style={{marginTop: 10}}>
        <View style={PaymentScreenLtrStyle.header_text}>
          <Text style={PaymentScreenLtrStyle.header_step_text}>{I18n.t('step').toUpperCase()} 4/4</Text>
          <Text style={PaymentScreenLtrStyle.header_schedule_text}>{I18n.t('summary_and_payment')}</Text>
        </View>
        <View style={PaymentScreenLtrStyle.appointment}>
          <View style={PaymentScreenLtrStyle.doctor_details}>
            <View style={PaymentScreenLtrStyle.doctor_details_left}>
              <UserAvatar
                imageURL={doctor.imgUrl}
                firstName={doctor.firstName}
                lastName={doctor.lastName}
                theme={Colors.borderGrey}
                size={Metrics.icons.large}
              />
            </View>
            <View style={PaymentScreenLtrStyle.doctor_details_right}>
              <Text style={PaymentScreenLtrStyle.doctor_details_specialization}>{doctor.specialization}</Text>
              <Text
                style={PaymentScreenLtrStyle.doctor_details_name}>{doctor.name}</Text>
            </View>
          </View>
          <View style={PaymentScreenLtrStyle.date}>
            <Text style={PaymentScreenLtrStyle.date_text}>{I18n.t('date')}</Text>
            <Text style={PaymentScreenLtrStyle.date_value}>{prettyDate(date)}</Text>
          </View>
          <View style={PaymentScreenLtrStyle.time}>
            <Text style={PaymentScreenLtrStyle.time_text}>{I18n.t('time')}</Text>
            <Text style={PaymentScreenLtrStyle.time_value}>{time}</Text>
          </View>
          <View style={PaymentScreenLtrStyle.price}>
            <View style={PaymentScreenLtrStyle.price_top}>
              <Text style={PaymentScreenLtrStyle.price_top_left}>
                {I18n.t('appointment_price')}
              </Text>
              <Text style={PaymentScreenLtrStyle.price_top_right}>
                RON 15
              </Text>
            </View>
            <View style={PaymentScreenLtrStyle.price_bottom}>
              <Text style={PaymentScreenLtrStyle.price_bottom_text}>{I18n.t('rest_of_payment')}</Text>
              <Text style={PaymentScreenLtrStyle.price_bottom_text}>RON {doctor.price - 15}</Text>
            </View>
          </View>
        </View>
        <View style={PaymentScreenLtrStyle.card_details}>
          <TextInput
            editable
            style={[PaymentScreenLtrStyle.card_inputs, { width: '100%'}]}
            placeholder={I18n.t("card_holder")}
            maxLength={40}
            onChangeText={text => setCardName(text)}
            value={state.cardName}/>
          <TextInput
            editable
            style={[PaymentScreenLtrStyle.card_inputs, { width: '100%'}]}
            placeholder={I18n.t("card_number")}
            maxLength={16}
            onChangeText={text => setCardNumber(text)}
            value={state.cardNumber}/>
          <TextInput
            editable
            style={[PaymentScreenLtrStyle.card_inputs, { width: '47%'}]}
            placeholder={I18n.t("card_expiration_date")}
            maxLength={4}
            onChangeText={text => setCardExpirationDate(text)}
            value={state.expirationDate}/>
          <TextInput
            editable
            style={[PaymentScreenLtrStyle.card_inputs, { width: '47%'}]}
            placeholder={I18n.t("card_cvv")}
            maxLength={3}
            onChangeText={text => setCardCvv(text)}
            value={state.cvv}/>
        </View>
      </ScrollView>
      <RegularButton
        title={I18n.t('confirm_appointment')}
        onPress={() => console.warn("confirmed appointment") }
        buttonStyle={[
          GlobalLtrStyle.buttonStyle,
          {
            backgroundColor: Colors.orange,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            borderRadius: 7,
          },
        ]}
        titleStyle={{color: 'white', fontSize: Fonts.regular}}
        containerStyle={{marginLeft: 15, marginRight: 15, justifyContent: 'center', alignItems: 'center'}}
      />
    </SafeAreaView>
  );
};

export default PaymentScreen;
