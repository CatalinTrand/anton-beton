import RequestListScreenLtrStyle from '../../shared/styles/RequestListScreen.ltr.style';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import BottomTabNavigator from "../components/navigation/bottomTabNavigator";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import Colors from "../../shared/themes/Colors";
import MapScreenLtrStyle from "../../shared/styles/mapScreen.ltr.style";
import I18n from "../../shared/I18n/I18n";
import Header from "../components/sections/header";

const RequestListScreen = ({route, navigation}) => {

  const openSettings = () => {

  };

  const requests = [
    {
      id: 10005,
      address: 'Str. Lujerului 42J, Bucuresti, Romania',
      coordinates: {lat: 45.34, lng: 21.55},
      quantity: 5000,
      maxPrice: 30000,
      offers: 4,
    },
    {
      id: 10006,
      address: 'Str. Lujerului 42J, Bucuresti, Romania',
      coordinates: {lat: 45.34, lng: 21.55},
      quantity: 15000,
      maxPrice: 300000,
      offers: 1,
    },
    {
      id: 10007,
      address: 'Str. Lujerului 42J, Bucuresti, Romania',
      coordinates: {lat: 45.34, lng: 21.55},
      quantity: 3400,
      maxPrice: 35000,
      offers: 0,
    },
    {
      id: 10008,
      address: 'Str. Lujerului 42J, Bucuresti, Romania',
      coordinates: {lat: 45.34, lng: 21.55},
      quantity: 1000,
      maxPrice: 10000,
      offers: 7,
    },
    {
      id: 10009,
      address: 'Str. Lujerului 42J, Bucuresti, Romania',
      coordinates: {lat: 45.34, lng: 21.55},
      quantity: 4000,
      maxPrice: 20000,
      offers: 3,
    },
  ];

  return (
    <View style={RequestListScreenLtrStyle.container}>
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
          <View style={[RequestListScreenLtrStyle.title, {marginTop: 15}]}>
            <Text style={RequestListScreenLtrStyle.title_text}>{I18n.t('view_your_requests')}</Text>
          </View>
        }
        rightComponent={null}
        noBorder={false}
      />
      <ScrollView contentContainerStyle={RequestListScreenLtrStyle.list}>
        {requests.map((request, idx) =>
          <TouchableOpacity key={idx} style={RequestListScreenLtrStyle.list_item} onPress={() => console.log("clicked request id " + request.id)}>
            <View style={RequestListScreenLtrStyle.title_contents}>
              <Text style={RequestListScreenLtrStyle.list_item_title}>{I18n.t('request') + " #" + request.id}</Text>
              <Text style={RequestListScreenLtrStyle.offers_count}>{request.offers + " " + I18n.t('offers')}</Text>
            </View>
            <View style={RequestListScreenLtrStyle.list_item_details}>
              <View style={RequestListScreenLtrStyle.list_item_address}>
                <Text style={RequestListScreenLtrStyle.list_item_address_title}>{I18n.t('short_address')}</Text>
                <Text style={RequestListScreenLtrStyle.list_item_address_value}>{request.address}</Text>
              </View>
              <View style={RequestListScreenLtrStyle.list_item_additional_details}>
                <View style={RequestListScreenLtrStyle.list_item_detail}>
                  <Text style={RequestListScreenLtrStyle.list_item_detail_title}>{I18n.t('quantity')}</Text>
                  <Text style={RequestListScreenLtrStyle.list_item_detail_value}>{request.quantity + " m³"}</Text>
                </View>
                <View style={RequestListScreenLtrStyle.list_item_detail}>
                  <Text style={RequestListScreenLtrStyle.list_item_detail_title}>{I18n.t('price')}</Text>
                  <Text style={RequestListScreenLtrStyle.list_item_detail_value}>{request.maxPrice + " RON"}</Text>
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

export default RequestListScreen;
