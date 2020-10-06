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

const PaymentScreen = ({route, navigation}) => {

  const myCards = [ // TODO - get from local storage
    {
      type: "Mastercard",
      cardName: "Ionescu George",
      cardNumber: "1234 1234 1234 1234",
      expirationDate: "05/21",
      cvv: "222"
    },
    {
      type: "Visa",
      cardName: "Popescu Vasile",
      cardNumber: "2345 2345 2345 2345",
      expirationDate: "08/23",
      cvv: "345",
    }
  ];

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

  const saveCard = () => {
    //TODO - set to local storage
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
            <Text style={OrderScreenLtrStyle.title_text}>{I18n.t('my_cards')}</Text>
          </View>
        }
        rightComponent={null}
        noBorder={true}
      />
      <ScrollView>
        <View style={{borderTopWidth: 1, borderTopColor: Colors.black, paddingTop: 10, marginTop: 20}}>
          {
            myCards.map(
              (card, index) =>
                <View style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  borderWidth: 1,
                  borderColor: Colors.black,
                  borderRadius: 4,
                  padding: 10,
                  margin: 10
                }} key={index + 1}>
                  <Text style={{
                    color: Colors.black,
                    fontSize: Fonts.regular,
                    fontWeight: 'bold'
                  }}>{card.type + " " + card.expirationDate + " - " + card.cardName}</Text>
                  <Text style={{color: Colors.darkGrey, fontSize: Fonts.medium}}>{card.cardNumber}</Text>
                </View>
            )
          }
        </View>
        <View style={{borderTopWidth: 1, borderTopColor: Colors.black, paddingTop: 10, marginTop: 10}}>
          <Text style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 15, color: Colors.orange, fontSize: Fonts.h6, fontWeight: 'bold'}}>{I18n.t('new_card')}</Text>
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
        </View>
        <RegularButton
          title={I18n.t('save')}
          onPress={() => saveCard()}
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
              marginBottom: 20
            },
          ]}
          titleStyle={{color: 'white', fontSize: Fonts.regular}}
          containerStyle={{marginLeft: 15, marginRight: 15, justifyContent: 'center', alignItems: 'center'}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentScreen;
