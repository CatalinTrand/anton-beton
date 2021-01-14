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
import SyncStorage from "sync-storage";
import {getRequest, putRequest} from "../requestHandler";

const SupplierOngoingOrdersScreen = ({route, navigation}) => {

  const [openSettings, setOpenSettings] = useState(false);
  const [requests, setRequests] = useState([] as {}[]);
  const [got_list, setGotList] = useState(false);

  let token = SyncStorage.get("token");

  // if(!got_list) {
  //   let data = [
  //     {
  //       _id: 1000001,
  //       state: 1,
  //       address: "Str. Lujerului 42J, Bucuresti, Romania",
  //       quantity: 1000,
  //       deliveryDate: "10.12.2020",
  //       deliveryTime: "12:00",
  //     },
  //   ];
  //   setRequests(data);
  //   setGotList(true);
  // }

  if(!got_list) {
    getRequest("supplier/order/list/accepted", token, response => {
      if (response.data) {
        setRequests(response.data.data);
      } else {
        console.log(response);
      }
    });
    setGotList(true);
  }

  const [openRequest, setOpenRequest] = useState(null as any);

  const prettyDate = (date) => {
    let separator = ".";
    return date.split(separator)[1] + " " + I18n.t("month_" + date.split(separator)[0]) + " " + date.split(separator)[2];
  };

  const cancelOrder = (id) => {
    Alert.alert(
      I18n.t('cancel_order_title'),
      I18n.t('cancel_order_msg'),
      [
        { text: I18n.t("cancel_order"), onPress: () => {
            putRequest('supplier/order/cancel',{orderId: id},token, response => {
              if(response.data)
                navigation.reload();
            });
          } },
        { text: I18n.t("back"), onPress: () => {}, style: 'cancel' }
      ],
      { cancelable: false }
    );
  };

  const finishOrder = (id) => {
    Alert.alert(
      I18n.t('finish_order_title'),
      I18n.t('finish_order_msg'),
      [
        { text: "Ok", onPress: () => {
              //TODO - finish order
          } },
        { text: "Cancel", onPress: () => {}, style: 'cancel' }
      ],
      { cancelable: false }
    );
  };

  const wazeLink = (request) => {
    let link = "https://waze.com/ul?q=" + request.address.split(" ").join("%20") + "&ll=" + request.coordinates.lat + "," + request.coordinates.long + "&navigate=yes";
    console.log(link);
    return link;
  };

  const logoutUser = () => {
    SyncStorage.set('token', null);
    SyncStorage.set('cards', null);
    navigation.navigate('Login');
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
            color={Colors.orange}
            name="cog"
            onPress={() => setOpenSettings(true)}
          />
        }
        centerComponent={
          <View style={[RequestListScreenLtrStyle.title, {marginTop: 15}]}>
            <Text style={[RequestListScreenLtrStyle.title_text, {color: Colors.orange}]}>{"comenzi acceptate"}</Text>
          </View>
        }
        rightComponent={null}
        noBorder={false}
      />
      {openSettings ?
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
            borderWidth: 1,
            borderColor: Colors.black,
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
            <Text style={{width: '100%', paddingBottom: 30, textAlign: "center", fontSize: Fonts.h6, fontWeight: 'bold', color: Colors.black}}>{I18n.t('settings')}</Text>
            <TouchableOpacity style={{marginLeft: 25, width: 170, marginBottom: 20, display: 'flex', flexDirection: 'row', justifyContent: "center"}} onPress={() => navigation.navigate('MyCardsScreen')}>
              <CustomIcons
                style={{marginRight: 8}}
                size={Fonts.h6}
                color={Colors.orange}
                name="credit-card"
              /><Text style={{width: 140, color: Colors.orange, fontWeight: 'bold', fontSize: Fonts.regular}}>{I18n.t('my_cards')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 25, width: 170, marginBottom: 10, display: 'flex', flexDirection: 'row', justifyContent: "center"}} onPress={() => logoutUser()}>
              <CustomIcons
                style={{marginRight: 5, marginLeft: 3}}
                size={Fonts.h6}
                color={Colors.orange}
                name="exit"
              /><Text style={{width: 140, color: Colors.orange, fontWeight: 'bold', fontSize: Fonts.regular}}>{I18n.t('logout_button')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{position: "absolute", top: 2, right: 10}} onPress={() => setOpenSettings(false)}>
              <Text style={{color: Colors.black, fontWeight: 'bold', fontSize: Fonts.h5}}>&times;</Text>
            </TouchableOpacity>
          </View>] : null
      }
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
            borderWidth: 1,
            borderColor: Colors.grey,
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
            <Text style={{width: '100%', paddingBottom: 20, textAlign: "center", fontSize: Fonts.regular, fontWeight: 'bold', color: Colors.black}}>{I18n.t('request') + " #" + openRequest._id}</Text>
            <TouchableOpacity style={{width: '70%'}} onPress={() => Linking.openURL(encodeURI(wazeLink(openRequest)))} >
              <Text style={{display: 'flex', color: Colors.darkGrey, fontSize: Fonts.medium, marginBottom: 20, textAlign: "center", backgroundColor: Colors.orange, width: '100%', paddingTop: 10, paddingBottom: 10, borderRadius: 5}}>{I18n.t('start_delivery')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '70%'}} onPress={() => finishOrder(openRequest._id)}>
              <Text style={{display: 'flex', color: Colors.darkGrey, fontSize: Fonts.medium, marginBottom: 50, textAlign: "center", backgroundColor: Colors.orange, width: '100%', paddingTop: 10, paddingBottom: 10, borderRadius: 5}}>{I18n.t('finish_order')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '70%', marginTop: 30}} onPress={() => cancelOrder(openRequest._id)}>
              <Text style={{display: 'flex', fontSize: Fonts.medium, marginBottom: 50, textAlign: "center", backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.black, width: '100%', paddingTop: 10, paddingBottom: 10, borderRadius: 5}}>{I18n.t('cancel_order')}</Text>
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
            <View style={[RequestListScreenLtrStyle.list_item_details, {width: "100%"}]}>
              <View style={[RequestListScreenLtrStyle.list_item_address,{paddingLeft: 0, width: "100%"}]}>
                <Text style={RequestListScreenLtrStyle.list_item_date_time}>{request.address}</Text>
              </View>
            </View>
            <Text style={[RequestListScreenLtrStyle.list_item_address_value,{paddingLeft: 10}]}>{prettyDate(request.deliveryDate) + ", " + request.deliveryTime}</Text>
            <View style={RequestListScreenLtrStyle.list_item_additional_details}>
              <View style={[RequestListScreenLtrStyle.list_item_detail,{paddingLeft: 10, paddingBottom: 15}]}>
                <Text style={[RequestListScreenLtrStyle.list_item_detail_title,{color: "white", fontWeight: 'normal'}]}>{I18n.t('quantity')}</Text>
                <Text style={[RequestListScreenLtrStyle.list_item_detail_value,{color: Colors.white}]}>{request.quantity + " m³"}</Text>
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
