import OrderScreenLtrStyle from '../../shared/styles/orderScreen.ltr.style';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import BottomTabNavigator from "../components/navigation/bottomTabNavigator";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import Colors from "../../shared/themes/Colors";
import I18n from "../../shared/I18n/I18n";
import Header from "../components/sections/header";
import {useState} from "react";
import RequestListScreenLtrStyle from "../../shared/styles/RequestListScreen.ltr.style";

let set = false;

const OrderScreen = ({route, navigation}) => {

  const {request} = route.params;

  const [height, setHeight] = useState(100);

  const openSettings = () => {

  };

  const offer_list = [
    {
      supplier_id: 1,
      supplier_name: "Beton S.R.L.",
      time: "12:30",
      price: 30000,
      advance_price: 3000,
    },
    {
      supplier_id: 2,
      supplier_name: "ExpertConstruct",
      time: "12:00",
      price: 35000,
      advance_price: 2000,
    },
    {
      supplier_id: 3,
      supplier_name: "LivrezBetonAcasa S.A.",
      time: "12:45",
      price: 20000,
      advance_price: 5000,
    },
    {
      supplier_id: 4,
      supplier_name: "Beton S.R.L.",
      time: "12:30",
      price: 30000,
      advance_price: 3000,
    },
  ];

  const prettyDate = (date) => {
    let separator = "/";
    return date.split(separator)[0] + " " + I18n.t("month_" + date.split(separator)[1]) + " " + date.split(separator)[2];
  };

  return (
    <View style={OrderScreenLtrStyle.container}>
      <Header
        placement="left"
        containerPaddingBottom={10}
        leftComponent={
          <CustomIcons
            style={{marginTop: 15, marginLeft: 5}}
            size={Fonts.medium}
            color={Colors.black}
            name="arrow-back"
            onPress={navigation.goBack}
          />
        }
        centerComponent={
          <View style={[OrderScreenLtrStyle.title, {marginTop: 15}]}>
            <Text style={OrderScreenLtrStyle.title_text}>{I18n.t('request') + " #" + request.id}</Text>
          </View>
        }
        rightComponent={null}
        noBorder={false}
      />
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
      <Text style={OrderScreenLtrStyle.offers_received}>{I18n.t('offers_received')}</Text>
      <ScrollView contentContainerStyle={OrderScreenLtrStyle.list}>
        {offer_list.map((offer, idx) =>
          <TouchableOpacity key={idx} style={OrderScreenLtrStyle.list_item}
                            onPress={() => navigation.navigate('PaymentScreen', {
                              request: request,
                              offer: offer
                            })}>
            <View style={OrderScreenLtrStyle.list_item_details}>
              <View style={OrderScreenLtrStyle.list_item_left}>
                <Text style={OrderScreenLtrStyle.list_item_title}>{offer.supplier_name}</Text>
                <View style={OrderScreenLtrStyle.list_item_time}>
                  <Text style={OrderScreenLtrStyle.list_item_time_title}>{I18n.t('time')}</Text>
                  <Text style={OrderScreenLtrStyle.list_item_time_value}>{offer.time}</Text>
                </View>
              </View>
              <View style={OrderScreenLtrStyle.list_item_right}>
                <View style={OrderScreenLtrStyle.list_item_detail}>
                  <Text style={OrderScreenLtrStyle.list_item_detail_title}>{I18n.t('set_price')}</Text>
                  <Text style={OrderScreenLtrStyle.list_item_detail_value}>{offer.price + " RON"}</Text>
                </View>
                <View style={OrderScreenLtrStyle.list_item_detail}>
                  <Text style={OrderScreenLtrStyle.list_item_detail_title}>{I18n.t('advance_price')}</Text>
                  <Text style={OrderScreenLtrStyle.list_item_detail_value}>{offer.advance_price + " RON"}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        <View style={{height: 50}}></View>
      </ScrollView>
      <BottomTabNavigator route={route} navigation={navigation} selected={2}/>
    </View>
  );
};

export default OrderScreen;
