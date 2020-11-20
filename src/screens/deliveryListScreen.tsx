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

  if(!got_list) {
    getRequest("client/order/list", token, response => {
      console.log(response.data);
      if (response.data) {
        setDeliveries(response.data.data.filter( order => order.delivered == true || order.canceledBySupplier == true ));
      }
    });
    setGotList(true);
  }

  const prettyDate = (date) => {
    let separator = ".";
    return date.split(separator)[1] + " " + I18n.t("month_" + date.split(separator)[0]) + " " + date.split(separator)[2];
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
            <TouchableOpacity style={{marginBottom: 40, display: 'flex', flexDirection: 'row'}} onPress={() => navigation.navigate('MyCardsScreen')}>
              <CustomIcons
                style={{marginRight: 5}}
                size={Fonts.h6}
                color={Colors.green}
                name="credit-card"
              /><Text style={{color: Colors.green, fontWeight: 'bold', fontSize: Fonts.regular}}>{I18n.t('my_cards')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpenSettings(false)}>
              <Text style={{color: Colors.primary, fontWeight: 'bold', fontSize: Fonts.regular}}>{I18n.t('back')}</Text>
            </TouchableOpacity>
          </View>] : null
      }
      <ScrollView contentContainerStyle={DeliveryListScreenLtrStyle.list}>
        {deliveries.map((delivery, idx) =>
          <TouchableOpacity key={idx}
                            style={[DeliveryListScreenLtrStyle.list_item, {backgroundColor: delivery.inDelivery ? Colors.lightGreen : Colors.white}]}
                            onPress={() => {
                              //pressedDelivery(delivery)
                            }}>
            <View style={DeliveryListScreenLtrStyle.title_contents}>
              <Text style={DeliveryListScreenLtrStyle.list_item_title}>{I18n.t('request') + " #" + delivery._id}</Text>
            </View>
            <Text style={DeliveryListScreenLtrStyle.list_item_supplier_name}>{delivery.supplier_name}</Text>
            <Text
              style={DeliveryListScreenLtrStyle.list_item_date_time}>{prettyDate(delivery.deliveryDate) + ", " + delivery.deliveryTime}</Text>
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
                  <Text style={DeliveryListScreenLtrStyle.list_item_detail_title}>{I18n.t('set_price')}</Text>
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
