import SupplierViewOpenOrderScreenLtrStyle from "../../shared/styles/supplierViewOpenOrderScreen.ltr.style";
import * as React from "react";
import {Alert, Text, TextInput, TouchableOpacity, View} from "react-native";
import RequestListScreenLtrStyle from "../../shared/styles/RequestListScreen.ltr.style";
import Header from "../components/sections/header";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import Colors from "../../shared/themes/Colors";
import I18n from "../../shared/I18n/I18n";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {useState} from "react";
import GlobalLtrStyle from "../../shared/styles/global.ltr.style";
import RegularButton from "../../shared/components/buttons/regularButton";
import moment from "moment";
import AppointmentScreenLtrStyle from "../../shared/styles/appointmentScreen.ltr.style";

const SupplierViewOpenOrderScreen = ({route, navigation}) => {

  const {request} = route.params;

  const [time, setTime] = useState(new Date());
  const [price, setPrice] = useState('');
  const [advance_price, setAdvancePrice] = useState('');
  const [isVisibleTimePicker, setTimePickerVisibility] = useState(false);

  const hasNotApplied = !request.alreadyBid;

  const offerData = { //TODO - GET
    concrete_type: 1,
    time: new Date(),
    price: "30000",
    advance_price: "3000",
  };

  const prettyDate = (date) => {
    let separator = "/";
    return date.split(separator)[0] + " " + I18n.t("month_" + date.split(separator)[1]) + " " + date.split(separator)[2];
  };

  const sendOffer = () => {
    //TODO - send offer to server with data

    Alert.alert(
      I18n.t('offer_made_title'),
      I18n.t('offer_made_msg'),
      [
        {
          text: "Ok", onPress: () => {
          }
        }
      ],
      {cancelable: false}
    );
  };

  return (
    <View style={RequestListScreenLtrStyle.container}>
      <Header
        placement="left"
        containerPaddingBottom={10}
        leftComponent={
          <CustomIcons
            style={{marginTop: 15, marginLeft: 10}}
            size={Fonts.medium}
            color={Colors.black}
            name="arrow-back"
            onPress={() => navigation.navigate('SupplierOpenOrdersScreen')}
          />
        }
        centerComponent={
          <View style={[RequestListScreenLtrStyle.title, {marginTop: 15}]}>
            <Text style={RequestListScreenLtrStyle.title_text}>{I18n.t('order_details') + "#" + request.id}</Text>
          </View>
        }
        rightComponent={null}
        noBorder={false}
      />
      <View style={SupplierViewOpenOrderScreenLtrStyle.container}>
        <View style={SupplierViewOpenOrderScreenLtrStyle.order_details}>

        </View>
        {
          !hasNotApplied ?
            <View style={SupplierViewOpenOrderScreenLtrStyle.offer_details} pointerEvents="none">
              <View style={[SupplierViewOpenOrderScreenLtrStyle.offer_details_entry, {paddingLeft: 15}]}>
                <Text
                  style={SupplierViewOpenOrderScreenLtrStyle.offer_details_entry_title}>{I18n.t("concrete_type")}</Text>
                <Text>{I18n.t("concrete_type_" + offerData.concrete_type)}</Text>
              </View>
              <View style={[AppointmentScreenLtrStyle.delivery_time_container, {paddingLeft: 15, paddingTop: 20, paddingBottom: 20}]}>
                <CustomIcons
                  size={Fonts.h4}
                  color={Colors.black}
                  style={{marginTop: 0, paddingRight: 20}}
                  name="clock"
                />
                <Text
                  style={[AppointmentScreenLtrStyle.delivery_time_value, {fontSize: Fonts.regular}]}>{time == undefined ? (new Date()).getHours() + ":" + ((new Date()).getMinutes() < 10 ? "0" : "") + (new Date()).getMinutes() : time.getHours() + ":" + (time.getMinutes() < 10 ? "0" : "") + time.getMinutes()}</Text>
              </View>
              <View style={[SupplierViewOpenOrderScreenLtrStyle.offer_details_entry,{alignItems: 'flex-start', flexDirection: "column"}]}>
                <Text style={[SupplierViewOpenOrderScreenLtrStyle.offer_details_entry_title, {paddingLeft: 20}]}>{I18n.t("set_price")}</Text>
                <TextInput
                  style={{
                    backgroundColor: Colors.lightGrey,
                    width: '50%',
                    padding: 10,
                    margin: 15,
                    borderRadius: 7,
                    marginBottom: 20
                  }}
                  placeholder={I18n.t('enter_price')}
                  keyboardType="number-pad"
                  value={offerData.price}
                  editable={false}
                />
              </View>
              <View style={[SupplierViewOpenOrderScreenLtrStyle.offer_details_entry,{alignItems: 'flex-start', flexDirection: "column"}]}>
                <Text style={[SupplierViewOpenOrderScreenLtrStyle.offer_details_entry_title, {paddingLeft: 20}]}>{I18n.t("appointment_price")}</Text>
                <TextInput
                  style={{
                    backgroundColor: Colors.lightGrey,
                    width: '50%',
                    padding: 10,
                    margin: 15,
                    borderRadius: 7,
                    marginBottom: 0
                  }}
                  placeholder={I18n.t('enter_price')}
                  keyboardType="number-pad"
                  value={offerData.advance_price}
                  editable={false}
                />
              </View>
            </View> :
            <View style={SupplierViewOpenOrderScreenLtrStyle.offer_input}>
              <Text>{I18n.t("concrete_type_" + offerData.concrete_type)}</Text>
              <View style={AppointmentScreenLtrStyle.delivery_time_container}>
                <CustomIcons
                  size={Fonts.h4}
                  color={Colors.black}
                  style={{marginTop: 0}}
                  name="clock"
                />
                <TouchableOpacity style={AppointmentScreenLtrStyle.delivery_time_details} onPress={() => {
                  setTimePickerVisibility(true)
                }}>
                  <Text
                    style={AppointmentScreenLtrStyle.delivery_time_value}>{time == undefined ? (new Date()).getHours() + ":" + ((new Date()).getMinutes() < 10 ? "0" : "") + (new Date()).getMinutes() : time.getHours() + ":" + (time.getMinutes() < 10 ? "0" : "") + time.getMinutes()}</Text>
                </TouchableOpacity>
              </View>
              {isVisibleTimePicker ?
                <RNDateTimePicker
                  value={time}
                  mode="time"
                  is24Hour={true}
                  onChange={(e, time) => {
                    setTimePickerVisibility(false);
                    setTime(time == undefined ? new Date() : time);
                  }}
                />
                : null}
              <TextInput
                style={{
                  backgroundColor: Colors.lightGrey,
                  width: '50%',
                  padding: 10,
                  margin: 15,
                  borderRadius: 7,
                  marginBottom: 0
                }}
                placeholder={I18n.t('enter_price')}
                keyboardType="number-pad"
                value={price}
                onChangeText={(value) => setPrice(value)}
              />
              <TextInput
                style={{
                  backgroundColor: Colors.lightGrey,
                  width: '50%',
                  padding: 10,
                  margin: 15,
                  borderRadius: 7,
                  marginBottom: 0
                }}
                placeholder={I18n.t('enter_price')}
                keyboardType="number-pad"
                value={advance_price}
                onChangeText={(value) => setAdvancePrice(value)}
              />
              <RegularButton
                title={I18n.t('send_offer')}
                onPress={() => sendOffer()}
                buttonStyle={[
                  GlobalLtrStyle.buttonStyle,
                  {
                    width: '90%',
                    marginTop: 20,
                    backgroundColor: Colors.orange,
                  },
                ]}
                containerStyle={{justifyContent: 'center', alignItems: 'center'}}
              />
            </View>
        }
      </View>
    </View>
  );
};

export default SupplierViewOpenOrderScreen;
