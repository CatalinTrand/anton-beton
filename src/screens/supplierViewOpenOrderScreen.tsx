import SupplierViewOpenOrderScreenLtrStyle from "../../shared/styles/supplierViewOpenOrderScreen.ltr.style";
import * as React from "react";
import {Alert, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
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
import AppointmentScreenLtrStyle from "../../shared/styles/appointmentScreen.ltr.style";
import OrderScreenLtrStyle from "../../shared/styles/orderScreen.ltr.style";
import Constants from '../../shared/constants/otherConstants.json';
import RNPickerSelect from 'react-native-picker-select';
import {putRequest} from "../requestHandler";
import SyncStorage from "sync-storage";

let set = false;

const SupplierViewOpenOrderScreen = ({route, navigation}) => {

  const {request} = route.params;

  const [concreteType, setConcreteType] = useState("1");
  const [time, setTime] = useState(new Date());
  const [price, setPrice] = useState('');
  const [advance_price, setAdvancePrice] = useState('');
  const [isVisibleTimePicker, setTimePickerVisibility] = useState(false);
  const [height, setHeight] = useState(100);

  const hasNotApplied = !request.alreadyBid;

  const offerData = request.bid;
  // {
  //   concrete_type: 1,
  //   time: new Date(),
  //   price: "30000",
  //   advance_price: "3000",
  // };

  const prettyDate = (date) => {
    let separator = "/";
    return date.split(separator)[0] + " " + I18n.t("month_" + date.split(separator)[1]) + " " + date.split(separator)[2];
  };

  const sendOffer = () => {
    if(request.id == null || price.length == 0 || advance_price.length == 0)
      return;

    let token = SyncStorage.get("token");
    putRequest("supplier/order/bid", {orderID: request.id, price: price, advancePrice: advance_price, time: time, concreteType: concreteType} , token, response => {
      if(response.data.success) {
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
      } else {
        console.log(response.data.error);
      }
    });
  };

  const renderConcreteOptions = () => {

    let result = [] as any;

    for(let i = 1; i <= Constants.NR_OF_CONCRETE_TYPES; i++) {
      // @ts-ignore
      result.push(
        {
          value: i+"",
          label: I18n.t("concrete_type_" + i)
        });
    }

    return result;
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
            <Text style={[RequestListScreenLtrStyle.title_text, {color: Colors.black}]}>{I18n.t('order_details') + "#" + request.id}</Text>
          </View>
        }
        rightComponent={null}
        noBorder={false}
      />
      <ScrollView contentContainerStyle={SupplierViewOpenOrderScreenLtrStyle.container}>
        <View style={SupplierViewOpenOrderScreenLtrStyle.order_details}>
          <View style={OrderScreenLtrStyle.order_details}
                onLayout={(event) => {
                  if (!set) {
                    set = true;
                    setHeight(event.nativeEvent.layout.height - 15);
                  }
                }}>
            <View style={OrderScreenLtrStyle.order_address}>
              <Text style={OrderScreenLtrStyle.order_address_title}>{I18n.t('short_address')}</Text>
              <Text style={OrderScreenLtrStyle.order_address_value}>{request.address}</Text>
              <View style={OrderScreenLtrStyle.order_detail}>
                <Text style={OrderScreenLtrStyle.order_detail_title}>{I18n.t('quantity')}</Text>
                <Text style={OrderScreenLtrStyle.order_detail_value}>{request.quantity + " m³"}</Text>
              </View>
            </View>
            <View style={[OrderScreenLtrStyle.order_additional_details, {height: height}]}>
              <View style={OrderScreenLtrStyle.order_detail}>
                <Text style={OrderScreenLtrStyle.order_detail_title}>{I18n.t('date')}</Text>
                <Text style={OrderScreenLtrStyle.order_detail_value}>{prettyDate(request.date)}</Text>
              </View>
              <View style={OrderScreenLtrStyle.order_detail}>
                <Text style={OrderScreenLtrStyle.order_detail_title}>{I18n.t('time')}</Text>
                <Text style={OrderScreenLtrStyle.order_detail_value}>{request.time}</Text>
              </View>
              <View style={OrderScreenLtrStyle.order_detail}>
                <Text style={OrderScreenLtrStyle.order_detail_title}>{I18n.t('price')}</Text>
                <Text style={OrderScreenLtrStyle.order_detail_value}>{request.maxPrice + " RON"}</Text>
              </View>
            </View>
          </View>
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
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
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
                  <Text style={{fontSize: Fonts.regular, paddingBottom: 10}}>RON</Text>
                </View>
              </View>
              <View style={[SupplierViewOpenOrderScreenLtrStyle.offer_details_entry,{alignItems: 'flex-start', flexDirection: "column"}]}>
                <Text style={[SupplierViewOpenOrderScreenLtrStyle.offer_details_entry_title, {paddingLeft: 20}]}>{I18n.t("appointment_price")}</Text>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
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
                  <Text style={{fontSize: Fonts.regular, paddingTop: 10}}>RON</Text>
                </View>
              </View>
            </View> :
            <View style={[SupplierViewOpenOrderScreenLtrStyle.offer_input,{height: 'auto', paddingLeft: 10}]}>
              <Text style={{paddingLeft: 5, paddingBottom: 10, fontSize: Fonts.regular, fontWeight: 'bold'}}>{I18n.t("concrete_type")}</Text>
              <RNPickerSelect
                onValueChange={(value) => setConcreteType(value)}
                items={renderConcreteOptions()}
              />
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
              <View style={[SupplierViewOpenOrderScreenLtrStyle.offer_details_entry,{alignItems: 'flex-start', flexDirection: "column"}]}>
                <Text style={[SupplierViewOpenOrderScreenLtrStyle.offer_details_entry_title, {paddingLeft: 10}]}>{I18n.t("appointment_price")}</Text>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: 20}}>
                  <TextInput
                    style={{
                      backgroundColor: Colors.lightGrey,
                      width: '50%',
                      padding: 10,
                      margin: 15,
                      marginLeft: 10,
                      borderRadius: 7,
                      marginBottom: 0
                    }}
                    placeholder={I18n.t('enter_price')}
                    keyboardType="number-pad"
                    value={price}
                    onChangeText={(value) => setPrice(value)}
                  />
                  <Text style={{fontSize: Fonts.regular, paddingTop: 10}}>RON</Text>
                </View>
              </View>
              <View style={[SupplierViewOpenOrderScreenLtrStyle.offer_details_entry,{alignItems: 'flex-start', flexDirection: "column"}]}>
                <Text style={[SupplierViewOpenOrderScreenLtrStyle.offer_details_entry_title, {paddingLeft: 10}]}>{I18n.t("set_price")}</Text>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    style={{
                      backgroundColor: Colors.lightGrey,
                      width: '50%',
                      padding: 10,
                      margin: 15,
                      marginLeft: 10,
                      borderRadius: 7,
                      marginBottom: 0
                    }}
                    placeholder={I18n.t('enter_price')}
                    keyboardType="number-pad"
                    value={advance_price}
                    onChangeText={(value) => setAdvancePrice(value)}
                  />
                  <Text style={{fontSize: Fonts.regular, paddingTop: 10}}>RON</Text>
                </View>
            </View>
              <RegularButton
                title={I18n.t('send_offer')}
                onPress={() => sendOffer()}
                buttonStyle={[
                  GlobalLtrStyle.buttonStyle,
                  {
                    width: '90%',
                    marginTop: 40,
                    marginRight: 15,
                    backgroundColor: Colors.orange,
                  },
                ]}
                containerStyle={{justifyContent: 'center', alignItems: 'center'}}
              />
            </View>
        }
      </ScrollView>
    </View>
  );
};

export default SupplierViewOpenOrderScreen;
