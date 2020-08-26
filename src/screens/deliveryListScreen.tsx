import DeliveryListScreenLtrStyle from '../../shared/styles/DeliveryListScreen.ltr.style';
import {Alert, ScrollView, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import BottomTabNavigator from "../components/navigation/bottomTabNavigator";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import Colors from "../../shared/themes/Colors";
import I18n from "../../shared/I18n/I18n";
import Header from "../components/sections/header";

const DeliveryListScreen = ({route, navigation}) => {

  const openSettings = () => {

  };

  const deliveries = [
    {
      id: 10005,
      supplier_id: 1,
      supplier_name: 'Beton S.R.L.',
      address: 'Str. Lujerului 42J, Bucuresti, Romania',
      coordinates: {lat: 45.34, lng: 21.55},
      quantity: 5000,
      price: 30000,
      date: '12/7/2021',
      time: '12:00',
      inDelivery: false,
    },
    {
      id: 10006,
      supplier_id: 2,
      supplier_name: 'LivrezBetonOriunde S.A.',
      address: 'Str. Lujerului 42J, Bucuresti, Romania',
      coordinates: {lat: 45.34, lng: 21.55},
      quantity: 4000,
      price: 20000,
      date: '15/7/2021',
      time: '17:00',
      inDelivery: true,
    },
    {
      id: 10007,
      supplier_id: 1,
      supplier_name: 'Beton S.R.L.',
      address: 'Str. Lujerului 42J, Bucuresti, Romania',
      coordinates: {lat: 45.34, lng: 21.55},
      quantity: 5000,
      price: 30000,
      date: '12/7/2021',
      time: '12:00',
      inDelivery: false,
    },
    {
      id: 10008,
      supplier_id: 1,
      supplier_name: 'Beton S.R.L.',
      address: 'Str. Lujerului 42J, Bucuresti, Romania',
      coordinates: {lat: 45.34, lng: 21.55},
      quantity: 5000,
      price: 30000,
      date: '12/7/2021',
      time: '12:00',
      inDelivery: false,
    },
  ];

  const prettyDate = (date) => {
    let separator = "/";
    return date.split(separator)[0] + " " + I18n.t("month_" + date.split(separator)[1]) + " " + date.split(separator)[2];
  };

  return (
    <View style={DeliveryListScreenLtrStyle.container}>
      <Header
        placement="left"
        containerPaddingBottom={10}
        leftComponent={
          <CustomIcons
            style={{marginTop: 15, marginLeft: 10}}
            size={Fonts.h6}
            color={Colors.black}
            name="cog"
            onPress={() => openSettings()}
          />
        }
        centerComponent={
          <View style={[DeliveryListScreenLtrStyle.title, {marginTop: 15}]}>
            <Text style={DeliveryListScreenLtrStyle.title_text}>{I18n.t('orders_for_delivery')}</Text>
          </View>
        }
        rightComponent={null}
        noBorder={false}
      />
      <ScrollView contentContainerStyle={DeliveryListScreenLtrStyle.list}>
        {deliveries.map((delivery, idx) =>
          <TouchableOpacity key={idx} style={[DeliveryListScreenLtrStyle.list_item, {backgroundColor: delivery.inDelivery? Colors.lightGreen : Colors.white}]} onPress={() => {return; if(delivery.inDelivery) navigation.navigate('ViewTruckMap', {supplier_id: delivery.supplier_id})} }>
            <View style={DeliveryListScreenLtrStyle.title_contents}>
              <Text style={DeliveryListScreenLtrStyle.list_item_title}>{I18n.t('request') + " #" + delivery.id}</Text>
              {delivery.inDelivery ? <Text style={DeliveryListScreenLtrStyle.item_in_delivery}>{I18n.t('in_delivery')}</Text> : null}
            </View>
            <Text style={DeliveryListScreenLtrStyle.list_item_supplier_name}>{delivery.supplier_name}</Text>
            <Text style={DeliveryListScreenLtrStyle.list_item_date_time}>{prettyDate(delivery.date) + ", " + delivery.time}</Text>
            <View style={DeliveryListScreenLtrStyle.list_item_details}>
              <View style={DeliveryListScreenLtrStyle.list_item_address}>
                <Text style={DeliveryListScreenLtrStyle.list_item_address_title}>{I18n.t('short_address')}</Text>
                <Text style={DeliveryListScreenLtrStyle.list_item_address_value}>{delivery.address}</Text>
              </View>
              <View style={DeliveryListScreenLtrStyle.list_item_additional_details}>
                <View style={DeliveryListScreenLtrStyle.list_item_detail}>
                  <Text style={DeliveryListScreenLtrStyle.list_item_detail_title}>{I18n.t('quantity')}</Text>
                  <Text style={DeliveryListScreenLtrStyle.list_item_detail_value}>{delivery.quantity + " m³"}</Text>
                </View>
                <View style={DeliveryListScreenLtrStyle.list_item_detail}>
                  <Text style={DeliveryListScreenLtrStyle.list_item_detail_title}>{I18n.t('price')}</Text>
                  <Text style={DeliveryListScreenLtrStyle.list_item_detail_value}>{delivery.price + " RON"}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        <View style={{height: 50}}></View>
      </ScrollView>
      <BottomTabNavigator route={route} navigation={navigation} selected={3}/>
    </View>
  );
};

export default DeliveryListScreen;
