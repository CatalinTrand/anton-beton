import PaymentScreenLtrStyle from '../../shared/styles/paymentScreen.ltr.style';
import Colors from "../../shared/themes/Colors";
import Header from "../components/sections/header";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import {Alert, SafeAreaView, ScrollView, Text, TextInput, View} from "react-native";
import I18n from "../../shared/I18n/I18n";
import UserAvatar from "../../shared/components/sections/userAvatar";
import Metrics from "../../shared/themes/Metrics";
import * as React from "react";
import {useState} from "react";
import GlobalLtrStyle from "../../shared/styles/global.ltr.style";
import RegularButton from "../../shared/components/buttons/regularButton";
import OrderScreenLtrStyle from "../../shared/styles/orderScreen.ltr.style";

const PaymentScreen = ({route, navigation}) => {

  const {request, offer} = route.params;

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
    let separator = "/";
    return date.split(separator)[0] + " " + I18n.t("month_" + date.split(separator)[1]) + " " + date.split(separator)[2];
  };

  const paymentMade = () => {
    Alert.alert(
      I18n.t('payment_made_title'),
      I18n.t('payment_made_msg'),
      [
        { text: "Ok", onPress: () => navigation.navigate('DeliveryListScreen') }
      ],
      { cancelable: false }
    );
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
        centerComponent={
          <View style={[OrderScreenLtrStyle.title, {marginTop: 15}]}>
            <Text style={OrderScreenLtrStyle.title_text}>{I18n.t('summary_and_payment')}</Text>
          </View>
        }
        rightComponent={null}
        noBorder={true}
      />
      <ScrollView style={{marginTop: 10}}>
        <View style={PaymentScreenLtrStyle.order_details}>
          <Text style={PaymentScreenLtrStyle.order_title}>{I18n.t('request') + " #" + request.id}</Text>
          <Text style={PaymentScreenLtrStyle.supplier_name}>{offer.supplier_name}</Text>
          <View style={PaymentScreenLtrStyle.address}>
            <Text style={PaymentScreenLtrStyle.address_title}>{I18n.t('short_address')}</Text>
            <Text style={PaymentScreenLtrStyle.address_value}>{request.address}</Text>
          </View>
          <View style={PaymentScreenLtrStyle.detail}>
            <Text style={PaymentScreenLtrStyle.detail_title}>{I18n.t('date_time')}</Text>
            <Text style={PaymentScreenLtrStyle.detail_value}>{prettyDate(request.date) + ", " + request.time}</Text>
          </View>
          <View style={PaymentScreenLtrStyle.detail}>
            <Text style={PaymentScreenLtrStyle.detail_title}>{I18n.t('quantity')}</Text>
            <Text style={PaymentScreenLtrStyle.address_value}>{request.quantity + " m³"}</Text>
          </View>
          <View style={PaymentScreenLtrStyle.detail}>
            <Text style={PaymentScreenLtrStyle.detail_title}>{I18n.t('set_price')}</Text>
            <Text style={PaymentScreenLtrStyle.address_value}>{offer.price + " RON"}</Text>
          </View>
          <View style={PaymentScreenLtrStyle.detail}>
            <Text style={PaymentScreenLtrStyle.detail_title}>{I18n.t('advance_price')}</Text>
            <Text style={PaymentScreenLtrStyle.address_value}>{offer.advance_price + " RON"}</Text>
          </View>
          <View style={PaymentScreenLtrStyle.total_payment}>
            <Text style={PaymentScreenLtrStyle.total_payment_title}>{I18n.t('total_payment')}</Text>
            <Text style={PaymentScreenLtrStyle.total_payment_value}>{offer.advance_price + " RON"}</Text>
          </View>
        </View>
        <View style={PaymentScreenLtrStyle.card_details}>
          <TextInput
            editable
            style={[PaymentScreenLtrStyle.card_inputs, {width: '100%'}]}
            placeholder={I18n.t("card_holder")}
            maxLength={40}
            onChangeText={text => setCardName(text)}
            value={state.cardName}/>
          <TextInput
            editable
            style={[PaymentScreenLtrStyle.card_inputs, {width: '100%'}]}
            placeholder={I18n.t("card_number")}
            maxLength={16}
            onChangeText={text => setCardNumber(text)}
            value={state.cardNumber}/>
          <TextInput
            editable
            style={[PaymentScreenLtrStyle.card_inputs, {width: '47%'}]}
            placeholder={I18n.t("card_expiration_date")}
            maxLength={4}
            onChangeText={text => setCardExpirationDate(text)}
            value={state.expirationDate}/>
          <TextInput
            editable
            style={[PaymentScreenLtrStyle.card_inputs, {width: '47%'}]}
            placeholder={I18n.t("card_cvv")}
            maxLength={3}
            onChangeText={text => setCardCvv(text)}
            value={state.cvv}/>
        </View>
      </ScrollView>
      <RegularButton
        title={I18n.t('confirm_order')}
        onPress={() => paymentMade()}
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
