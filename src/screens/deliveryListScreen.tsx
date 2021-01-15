import DeliveryListScreenLtrStyle from '../../shared/styles/DeliveryListScreen.ltr.style';
import {Alert, ScrollView, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import BottomTabNavigator from "../components/navigation/bottomTabNavigator";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import Colors from "../../shared/themes/Colors";
import I18n from "../../shared/I18n/I18n";
import Header from "../components/sections/header";
import {useState} from "react";
import {getRequest} from "../requestHandler";
import SyncStorage from 'sync-storage';

const DeliveryListScreen = ({route, navigation}) => {

  const [openSettings, setOpenSettings] = useState(false);
  const [deliveries, setDeliveries] = useState([] as {}[]);
  const [got_list, setGotList] = useState(false);

  const token = SyncStorage.get("token");

  // if(!got_list) {
  //   let data = [
  //     {
  //       _id: 1000004,
  //       state: 2,
  //       address: "Str. Lujerului 42J, Bucuresti, Romania",
  //       quantity: 1000,
  //       price: 3000,
  //       deliveryDate: "10.12.2020",
  //       deliveryTime: "12:00",
  //       inDelivery: false,
  //       selectedBidder: null,
  //       supplier_name: "Beton S.R.L.",
  //       delivered: true,
  //     },
  //     {
  //       _id: 1000005,
  //       state: 2,
  //       address: "Str. Lujerului 42J, Bucuresti, Romania",
  //       quantity: 2000,
  //       price: 2000,
  //       deliveryDate: "10.12.2020",
  //       deliveryTime: "12:00",
  //       inDelivery: false,
  //       selectedBidder: null,
  //       supplier_name: "Beton S.R.L.",
  //       canceledBySupplier: true,
  //     },
  //   ];
  //   setDeliveries(data);
  //   setGotList(true);
  // }

  if(!got_list) {
    getRequest("client/order/list", token, response => {
      console.log(response.data);
      if (response.data) {
        setDeliveries(response.data.data.filter( order => order.delivered == true || order.canceledBySupplier == true ));
      }//TODO - quantity to int
    });
    setGotList(true);
  }

  const prettyDate = (date) => {
    let separator = ".";
    return date.split(separator)[0] + " " + I18n.t("month_" + date.split(separator)[1]) + " " + date.split(separator)[2];
  };

  const logoutUser = () => {
    SyncStorage.set('token', null);
    SyncStorage.set('cards', null);
    navigation.navigate('Login');
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
            color={Colors.orange}
            name="cog"
            onPress={() => setOpenSettings(true)}
          />
        }
        centerComponent={
          <View style={[DeliveryListScreenLtrStyle.title, {marginTop: 15}]}>
            <Text style={DeliveryListScreenLtrStyle.title_text}>{I18n.t('finished_orders')}</Text>
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
      <ScrollView contentContainerStyle={DeliveryListScreenLtrStyle.list}>
        {deliveries.map((delivery, idx) =>
          <TouchableOpacity key={idx}
                            style={[DeliveryListScreenLtrStyle.list_item, {backgroundColor: Colors.black}]}
                            onPress={() => {
                              //pressedDelivery(delivery)
                            }}>
            <View style={DeliveryListScreenLtrStyle.list_item_details}>
              <View style={DeliveryListScreenLtrStyle.list_item_address}>
                <Text style={DeliveryListScreenLtrStyle.list_item_address_value}>{delivery.address}</Text>
                <Text style={DeliveryListScreenLtrStyle.list_item_date_time}>{prettyDate(delivery.deliveryDate) + ", " + delivery.deliveryTime}</Text>
              </View>
            </View>
            <View style={DeliveryListScreenLtrStyle.title_contents}>
              {delivery.delivered && <Text style={{paddingLeft: 10, fontSize: 14,color: Colors.orange}}>Livrata de {delivery.selectedBidder}</Text>}
              {delivery.canceledBySupplier && <Text style={{paddingLeft: 10, fontSize: 14, color: Colors.red}}>Anulata de {delivery.selectedBidder}</Text>}
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
