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
import RequestListScreenLtrStyle from "../../shared/styles/RequestListScreen.ltr.style";
import {Picker} from "@react-native-community/picker";
import SyncStorage from 'sync-storage';
import {putRequest} from "../requestHandler";
import stripe from 'react-native-stripe-payments';

const PaymentScreen = ({route, navigation}) => {

  const {request, offer} = route.params;

  let myCards = SyncStorage.get('cards');
  myCards = myCards ? myCards : [];

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
    let separator = ".";
    return date.split(separator)[1] + " " + I18n.t("month_" + date.split(separator)[0]) + " " + date.split(separator)[2];
  };

  const [selectedCardValue, setSelectedCardValue] = useState(I18n.t('please_choose_a_credit_card'));

  const createPaymentMethod = (number, month, year, cvc) => {
    const cardDetails = {
      "card[number]": number,
      "card[exp_month]": month,
      "card[exp_year]": year,
      "card[cvc]": cvc
    };
    let formBody = [] as String[];
    for (let property in cardDetails) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(cardDetails[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    let formBodyJoined = formBody.join("&");
    fetch('https://api.stripe.com/v1/payment_methods?type=card&' + formBodyJoined, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + 'sk_test_51Hft5MFKh7yu6OY6RXod8xHUMajQeAPCqlpR0F8iq8dheM17vHC2bE7QKvqrgktO61aX2zpSlV8u01GM1p1z8l6U00hHLN0STF'
      },
    })
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        return error;
      });
  };

  const createPaymentIntent = (amount, currency, payment_method, description) => {
    let truncated = parseFloat(parseFloat(amount).toFixed(2));
    let stripeAmount = truncated * 100;
    fetch('https://api.stripe.com/v1/payment_intents?amount=' + stripeAmount + '&currency='+ currency +'&payment_method_types[]=card&payment_method=' + payment_method + '&confirmation_method=automatic&confirm=true&description=' + description, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + 'sk_test_51Hft5MFKh7yu6OY6RXod8xHUMajQeAPCqlpR0F8iq8dheM17vHC2bE7QKvqrgktO61aX2zpSlV8u01GM1p1z8l6U00hHLN0STF'
      },
    })
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        return error;
      });
  };

  const confirmPaymentIntent = (payment_method) => {
    fetch('https://api.stripe.com/v1/payment_intents/' + payment_method, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + 'sk_test_51Hft5MFKh7yu6OY6RXod8xHUMajQeAPCqlpR0F8iq8dheM17vHC2bE7QKvqrgktO61aX2zpSlV8u01GM1p1z8l6U00hHLN0STF'    },
    })
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        return error;
      });
  };

  const paymentMade = async () => {
    stripe.setOptions({ publishingKey: 'pk_test_51Hft5MFKh7yu6OY6zH710XMr6hM8Nz6aW5fs12nUf2MTDcjjTCiR4fiibsFObOjESOaTF2ycpdIVfhzL6w6UL24700xFdU58mN' });
    console.log("stripe", stripe);
    let selectedCardIdx = -1;
    for (let i = 0; i < myCards.length; i++)
      if (myCards[i].cardNumber == selectedCardValue)
        selectedCardIdx = i;

    if (selectedCardIdx == -1 || !stripe)
      return;

    const cardDetails = {
      number: myCards[selectedCardIdx].cardNumber,
      expMonth: myCards[selectedCardIdx].expiryDate.split("/")[0],
      expYear: myCards[selectedCardIdx].expiryDate.split("/")[1],
      cvc: myCards[selectedCardIdx].cvv,
    };

    let token = SyncStorage.get("token");
    putRequest("client/order/confirm", {
      orderID: request.id,
      supplierEmail: offer.supplierEmail,
      advancePrice: 1000,
    }, token, response => {
      if (response.data) {
        Alert.alert(
          I18n.t('confirm_payment_title'),
          I18n.t('confirm_payment_msg'),
          [
            {text: "Ok", onPress: () => {
                stripe.confirmPayment(response.data.data, cardDetails).then( result => {
                  if (result) {
                    console.log(result);
                    Alert.alert(
                      I18n.t('payment_made_title'),
                      I18n.t('payment_made_msg'),
                      [
                        {text: "Ok", onPress: () => navigation.navigate('DeliveryListScreen')}
                      ],
                      {cancelable: false}
                    );
                  }
                }).catch( error => console.log(error) );
              }}
          ],
          {cancelable: true}
        );
      } else {
        console.log(response.data.error);
      }
    });

  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
      <Header
        placement="left"
        leftComponent={
          <CustomIcons
            size={Fonts.medium}
            color={Colors.orange}
            name="arrow-back"
            onPress={navigation.goBack}
            style={{marginLeft: 5}}
          />
        }
        centerComponent={
          <View style={[OrderScreenLtrStyle.title, {marginTop: 5, paddingRight: 10}]}>
            <Text style={OrderScreenLtrStyle.title_text}>{I18n.t('summary_and_payment')}</Text>
          </View>
        }
        rightComponent={null}
        noBorder={true}
      />
      <ScrollView style={{marginTop: 10}}>
        <View style={PaymentScreenLtrStyle.order_details}>
          <Text style={PaymentScreenLtrStyle.order_title}>{I18n.t('request') + " #" + request._id}</Text>
          <Text style={PaymentScreenLtrStyle.supplier_name}>{offer.company}</Text>
          <View style={PaymentScreenLtrStyle.address}>
            <Text style={PaymentScreenLtrStyle.address_title}>{I18n.t('short_address')}</Text>
            <Text style={PaymentScreenLtrStyle.address_value}>{request.address}</Text>
          </View>
          <View style={PaymentScreenLtrStyle.detail}>
            <Text style={PaymentScreenLtrStyle.detail_title}>{I18n.t('date_time')}</Text>
            <Text style={PaymentScreenLtrStyle.detail_value}>{prettyDate(request.deliveryDate) + ", " + request.deliveryTime}</Text>
          </View>
          <View style={PaymentScreenLtrStyle.detail}>
            <Text style={PaymentScreenLtrStyle.detail_title}>{I18n.t('concrete_type')}</Text>
            <Text style={PaymentScreenLtrStyle.address_value}>{I18n.t('concrete_type_' + offer.concrete_type)}</Text>
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
        <View style={RequestListScreenLtrStyle.select_view}>
          <View style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}>
            <CustomIcons
              style={{marginRight: 2, marginLeft: 7}}
              size={Fonts.regular}
              color={Colors.white}
              name="equalizer"
            />
            <Picker
              style={{flex: 1, fontSize: Fonts.small,color: Colors.white}}
              itemStyle={{fontSize: Fonts.smal}}
              selectedValue={selectedCardValue}
              onValueChange={(value) => {
                if (value == I18n.t("add_new_card")) navigation.navigate("MyCardsScreen", {
                  from: {
                    request,
                    offer
                  }
                }); else setSelectedCardValue(value);
              }}
            >
              <Picker.Item key={1} color={Colors.primary} label={I18n.t('please_choose_a_credit_card')}
                           value={I18n.t('please_choose_a_credit_card')}/>
              {
                myCards.map((card, index) =>
                  <Picker.Item color={Colors.black} label={card.type + " **** " + card.cardNumber.substr(-4, 4)}
                               value={card.cardNumber} key={index + 2}/>
                )
              }
              <Picker.Item key={myCards.length + 2} color={Colors.green} label={" + " + I18n.t('add_new_card')}
                           value={I18n.t('add_new_card')}/>
            </Picker>
          </View>
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
        titleStyle={{color: Colors.black, fontSize: Fonts.regular}}
        containerStyle={{marginLeft: 15, marginRight: 15, justifyContent: 'center', alignItems: 'center'}}
      />
    </SafeAreaView>
  );
};

export default PaymentScreen;
