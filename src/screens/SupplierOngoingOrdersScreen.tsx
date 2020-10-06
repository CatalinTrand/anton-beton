import SupplierOngoingOrdersScreenLtrStyle from "../../shared/styles/supplierOngoingOrdersScreen.ltr.style";
import * as React from "react";
import {Alert, Linking, ScrollView, Text, TouchableOpacity, View} from "react-native";
import BottomTabSupplierNavigator from "../components/navigation/bottomTabSupplierNavigator";
import RequestListScreenLtrStyle from "../../shared/styles/RequestListScreen.ltr.style";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import Colors from "../../shared/themes/Colors";
import I18n from "../../shared/I18n/I18n";
import Header from "../components/sections/header";
import {useState} from "react";

const SupplierOngoingOrdersScreen = ({route, navigation}) => {

  const [requests, setRequests] = useState([
    {
      id: 10005,
      address: 'Str. Lujerului 42J, Bucuresti, Romania',
      coordinates: {lat: 45.34, lng: 21.55},
      quantity: 5000,
      maxPrice: 30000,
      date: '12/7/2021',
      time: '12:00',
    },
    {
      id: 10006,
      address: 'Str. Lujerului 42J, Bucuresti, Romania',
      coordinates: {lat: 45.34, lng: 21.55},
      quantity: 15000,
      maxPrice: 300000,
      date: '12/7/2021',
      time: '16:00',
    },
    {
      id: 10007,
      address: 'Str. Lujerului 42J, Bucuresti, Romania',
      coordinates: {lat: 45.34, lng: 21.55},
      quantity: 3400,
      maxPrice: 35000,
      date: '12/7/2021',
      time: '14:00',
    },
  ]);

  const [openRequest, setOpenRequest] = useState(null as any);

  const openSettings = () => {

  };

  const prettyDate = (date) => {
    let separator = "/";
    return date.split(separator)[0] + " " + I18n.t("month_" + date.split(separator)[1]) + " " + date.split(separator)[2];
  };

  const cancelOrder = () => {

  };

  const finishOrder = () => {
    //TODO - send request to server with data

    Alert.alert(
      I18n.t('finish_order_title'),
      I18n.t('finish_order_msg'),
      [
        { text: "Ok", onPress: () => {} },
        { text: "Cancel", onPress: () => {}, style: 'cancel' }
      ],
      { cancelable: false }
    );
  };

  const wazeLink = (request) => {
    let link = "https://waze.com/ul?q=" + request.address.split(" ").join("%20") + "&ll=" + request.coordinates.lat + "," + request.coordinates.lng + "&navigate=yes";
    console.log(link);
    return link;
  };

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
            <Text style={[RequestListScreenLtrStyle.title_text, {color: Colors.black}]}>{I18n.t('ongoing_orders')}</Text>
          </View>
        }
        rightComponent={null}
        noBorder={false}
      />
      {openRequest !== null ?
        [
          <View style={{
            backgroundColor: Colors.lightGrey,
            opacity: 0.6,
            position: 'absolute',
            zIndex: 10,
            top: 0,
            left: 0,
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}></View>,
          <View style={{
            opacity: 1,
            borderRadius: 5,
            backgroundColor: Colors.white,
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
            paddingTop: 30,
            paddingBottom: 30,
            marginLeft: '10%',
            marginRight: '10%',
            marginTop: '40%',
            marginBottom: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 11
          }}>
            <Text style={{width: '100%', paddingBottom: 20, textAlign: "center", fontSize: Fonts.regular, fontWeight: 'bold', color: Colors.black}}>{I18n.t('request') + " #" + openRequest.id}</Text>
            <TouchableOpacity style={{width: '70%'}} onPress={() => Linking.openURL(encodeURI(wazeLink(openRequest)))} >
              <Text style={{display: 'flex', fontSize: Fonts.medium, marginBottom: 20, textAlign: "center", backgroundColor: Colors.orange, width: '100%', paddingTop: 10, paddingBottom: 10}}>{I18n.t('start_delivery')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '70%'}} onPress={() => finishOrder()}>
              <Text style={{display: 'flex', fontSize: Fonts.medium, marginBottom: 50, textAlign: "center", backgroundColor: Colors.orange, width: '100%', paddingTop: 10, paddingBottom: 10}}>{I18n.t('finish_order')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '70%', marginTop: 30}} onPress={() => cancelOrder()}>
              <Text style={{display: 'flex', fontSize: Fonts.medium, marginBottom: 50, textAlign: "center", backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.black, width: '100%', paddingTop: 10, paddingBottom: 10}}>{I18n.t('cancel_order')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpenRequest(null)}>
              <Text style={{color: Colors.primary, fontWeight: 'bold', fontSize: Fonts.medium}}>{I18n.t('cancel')}</Text>
            </TouchableOpacity>
          </View>] : null
      }
      <ScrollView contentContainerStyle={RequestListScreenLtrStyle.list}>
        {requests.map((request, idx) =>
          <TouchableOpacity key={idx} style={[RequestListScreenLtrStyle.list_item]} onPress={() => {
            setOpenRequest(request)
          }}>
            <View style={RequestListScreenLtrStyle.title_contents}>
              <Text
                style={[RequestListScreenLtrStyle.list_item_title, {color: Colors.green}]}>{I18n.t('request') + " #" + request.id}</Text>
            </View>
            <Text
              style={RequestListScreenLtrStyle.list_item_date_time}>{prettyDate(request.date) + ", " + request.time}</Text>
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
      <BottomTabSupplierNavigator route={route} navigation={navigation} selected={2}/>
    </View>
  );
};

export default SupplierOngoingOrdersScreen;
