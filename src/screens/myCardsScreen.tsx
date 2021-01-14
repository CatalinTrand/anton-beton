import PaymentScreenLtrStyle from '../../shared/styles/paymentScreen.ltr.style';
import Colors from "../../shared/themes/Colors";
import Header from "../components/sections/header";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import {SafeAreaView, ScrollView, Text, TextInput, View} from "react-native";
import I18n from "../../shared/I18n/I18n";
import * as React from "react";
import {useState} from "react";
import GlobalLtrStyle from "../../shared/styles/global.ltr.style";
import RegularButton from "../../shared/components/buttons/regularButton";
import OrderScreenLtrStyle from "../../shared/styles/orderScreen.ltr.style";
import SyncStorage from 'sync-storage';

const MyCardsScreen = ({route, navigation}) => {

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
    if(date.length > 2 && !date.includes("/"))
      date = date.substr(0,2) + "/" + date.substr(2,2);
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
    if(state.cardName.length <= 6 || state.cardNumber.length != 16 || state.expirationDate.length != 5 || state.cvv.length != 3)
      return;

    myCards.push({
      type: state.cardNumber[0] == '4' ? "Visa" : "Mastercard",
      cardName: state.cardName,
      cardNumber: state.cardNumber,
      expirationDate: state.expirationDate,
      cvv: state.cvv
    });

    SyncStorage.set('cards', myCards);

    setState({
      cardName: "",
      cardNumber: "",
      expirationDate: "",
      cvv: ""
    });
  };
  let invalidInput = state.cardName.length <= 6 || state.cardNumber.length != 16 || state.expirationDate.length != 5 || state.cvv.length != 3;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
      <Header
        placement="left"
        leftComponent={
          <CustomIcons
            size={Fonts.regular}
            color={Colors.orange}
            name="arrow-back"
            onPress={navigation.goBack}
            style={{paddingTop: 15, paddingLeft: 5}}
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
      <ScrollView contentContainerStyle={{backgroundColor: Colors.black}}>
        <View style={{borderTopWidth: 1, borderTopColor: Colors.darkGrey, paddingTop: 10, marginTop: 20}}>
          { myCards.length === 0 ? <Text style={{paddingTop: 10, paddingBottom: 10, fontSize: 18, color: Colors.white, paddingLeft: 10}}>No cards available</Text> :
            myCards.map(
              (card, index) =>
                <View style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  borderWidth: 1,
                  borderColor: Colors.white,
                  borderRadius: 3,
                  padding: 10,
                  margin: 10
                }} key={index + 1}>
                  <Text style={{
                    color: Colors.white,
                    fontSize: Fonts.regular,
                    fontWeight: 'bold'
                  }}>{card.type + " " + card.expirationDate + " - " + card.cardName}</Text>
                  <Text style={{color: Colors.white, fontSize: Fonts.medium}}>{card.cardNumber}</Text>
                </View>
            )
          }
        </View>
        <View style={{borderTopWidth: 1, borderTopColor: Colors.darkGrey, paddingTop: 10, marginTop: 10}}>
          <Text style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 15,
            color: Colors.orange,
            fontSize: Fonts.h6,
            fontWeight: 'bold'
          }}>{I18n.t('new_card')}</Text>
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
              maxLength={5}
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
              backgroundColor: !invalidInput ? Colors.orange : Colors.grey,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              borderRadius: 7,
              marginBottom: 20
            },
          ]}
          titleStyle={{color: Colors.black, fontSize: Fonts.regular}}
          containerStyle={{marginLeft: 15, marginRight: 15, justifyContent: 'center', alignItems: 'center'}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyCardsScreen;
