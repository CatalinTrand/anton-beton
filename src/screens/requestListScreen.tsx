import RequestListScreenLtrStyle from '../../shared/styles/RequestListScreen.ltr.style';
import {Alert, Linking, ScrollView, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import BottomTabNavigator from "../components/navigation/bottomTabNavigator";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import Colors from "../../shared/themes/Colors";
import I18n from "../../shared/I18n/I18n";
import Header from "../components/sections/header";
import {useState} from "react";
import {Picker} from "@react-native-community/picker";
import {getRequest} from "../requestHandler";
import SyncStorage from 'sync-storage';

const RequestListScreen = ({route, navigation}) => {

  // const initial_requests = [
  //   {
  //     id: 10005,
  //     address: 'Str. Lujerului 42J, Bucuresti, Romania',
  //     coordinates: {lat: 45.34, lng: 21.55},
  //     quantity: 5000,
  //     maxPrice: 30000,
  //     date: '12/7/2021',
  //     time: '12:00',
  //     offers: 4,
  //     state: 1, //1 = open, 2 = in derulare, 3 = finalizate, 4 = cancelled
  //     inDelivery: null,
  //   },
  //   {
  //     id: 10006,
  //     address: 'Str. Lujerului 42J, Bucuresti, Romania',
  //     coordinates: {lat: 45.34, lng: 21.55},
  //     quantity: 15000,
  //     maxPrice: 300000,
  //     date: '12/7/2021',
  //     time: '12:00',
  //     offers: 1,
  //     state: 1,
  //     inDelivery: null,
  //   },
  //   {
  //     id: 10007,
  //     address: 'Str. Lujerului 42J, Bucuresti, Romania',
  //     coordinates: {lat: 45.34, lng: 21.55},
  //     quantity: 3400,
  //     price: 35000,
  //     date: '12/7/2021',
  //     time: '12:00',
  //     offers: null,
  //     state: 2,
  //     inDelivery: false,
  //     supplier_id: 1,
  //     supplier_name: 'Beton S.R.L.',
  //   },
  //   {
  //     id: 10008,
  //     address: 'Str. Lujerului 42J, Bucuresti, Romania',
  //     coordinates: {lat: 45.34, lng: 21.55},
  //     quantity: 1000,
  //     price: 10000,
  //     date: '12/7/2021',
  //     time: '12:00',
  //     offers: null,
  //     state: 2,
  //     inDelivery: true,
  //     supplier_id: 2,
  //     supplier_name: 'LivrezBetonOriunde S.A.',
  //   },
  //   {
  //     id: 10009,
  //     address: 'Str. Lujerului 42J, Bucuresti, Romania',
  //     coordinates: {lat: 45.34, lng: 21.55},
  //     quantity: 4000,
  //     price: 20000,
  //     date: '12/7/2021',
  //     time: '12:00',
  //     offers: null,
  //     state: 2,
  //     inDelivery: false,
  //     supplier_id: 1,
  //     supplier_name: 'Beton S.R.L.',
  //   },
  // ];

  const token = SyncStorage.get("token");
  const [initial_requests, setInitialRequests] = useState([] as {id, address, coordinates, quantity, maxPrice, price, date, time, offers, state, inDelivery, suppplier_id, supplier_name}[]);
  const [requests, setRequests] = useState([] as {id, address, coordinates, quantity, maxPrice, price, date, time, offers, state, inDelivery, suppplier_id, supplier_name}[]);

  getRequest("user/order/list", token, response => {
    console.log(response.data);
    if (response.data.success) {
      setInitialRequests(response.data.orders);
      setRequests(response.data.orders);
    }
  });

  const [selectedFilterValue, setSelectedFilterValue] = useState(I18n.t('all'));
  const [openSettings, setOpenSettings] = useState(false);

  const prettyDate = (date) => {
    let separator = "/";
    return date.split(separator)[0] + " " + I18n.t("month_" + date.split(separator)[1]) + " " + date.split(separator)[2];
  };

  const pressedDelivery = (delivery) => {
    if (delivery.inDelivery)
      navigation.navigate('ViewTruckMapScreen', {id: delivery.id, coordinates: delivery.coordinates, supplier_id: delivery.supplier_id});
    else
      Alert.alert(
        I18n.t('cancel_order_title'),
        I18n.t('cancel_order_msg'),
        [
          { text: I18n.t("cancel_order"), onPress: () => {} },
          { text: I18n.t("back"), onPress: () => {}, style: 'cancel' }
        ],
        { cancelable: false }
      );
  };

  const filterRequests = (value) => {
    setSelectedFilterValue(value);
    let newRequests = initial_requests;

    if(value == I18n.t('open'))
      newRequests = initial_requests.filter(request => request.state == 1);

    if(value == I18n.t('ongoing'))
      newRequests = initial_requests.filter(request => request.state == 2);

    setRequests(newRequests);
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
            onPress={() => setOpenSettings(true)}
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
      <View style={RequestListScreenLtrStyle.select_view}>
        <View style={{width: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
          <CustomIcons
            style={{marginRight: 5}}
            size={Fonts.regular}
            color={Colors.black}
            name="equalizer"
          />
          <Picker
            style={{flex: 1, fontSize: Fonts.small}}
            itemStyle={{fontSize: Fonts.small}}
            selectedValue={selectedFilterValue}
            onValueChange={(value) => filterRequests(value)}
          >
            <Picker.Item label={I18n.t('all')} value={I18n.t('all')}/>
            <Picker.Item label={I18n.t('open')} value={I18n.t('open')}/>
            <Picker.Item label={I18n.t('ongoing')} value={I18n.t('ongoing')}/>
          </Picker>
        </View>
      </View>
      <ScrollView contentContainerStyle={RequestListScreenLtrStyle.list}>
        {requests.map((request, idx) =>
          <TouchableOpacity key={idx} style={
            [RequestListScreenLtrStyle.list_item,
              {
                backgroundColor: Colors.white
              }
              ]}
              onPress={() => {
                if(request.state == 1)
                  navigation.navigate('OrderScreen', {request});
                else
                  pressedDelivery(request);
              }}>
            <View style={RequestListScreenLtrStyle.title_contents}>
              <Text style={[RequestListScreenLtrStyle.list_item_title,{color: request.state == 2 ? (request.inDelivery ? Colors.lightGreen : Colors.yellow) : Colors.black}]}>{I18n.t('request') + " #" + request.id}</Text>
              <Text style={RequestListScreenLtrStyle.offers_count}>{request.state == 1 ? (request.offers + " " + I18n.t('offers')) : (request.supplier_name)}</Text>
            </View>
            <Text style={RequestListScreenLtrStyle.list_item_date_time}>{prettyDate(request.date) + ", " + request.time}</Text>
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
                  <Text style={RequestListScreenLtrStyle.list_item_detail_title}>{request.state == 1 ? I18n.t('price') : I18n.t('set_price')}</Text>
                  <Text style={RequestListScreenLtrStyle.list_item_detail_value}>{(request.state == 1 ? request.maxPrice : request.price) + " RON"}</Text>
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
