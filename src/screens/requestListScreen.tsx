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

  const token = SyncStorage.get("token");
  const [initial_requests, setInitialRequests] = useState([] as {}[]);
  const [requests, setRequests] = useState([] as {}[]);
  const [got_list, setGotList] = useState(false);

  if(!got_list) {
    getRequest("client/order/list", token, response => {
      if (response.data.success) {
        let  data = response.data.data.filter( order => order.delivered == false && !order.canceledByCustomer && !order.canceledBySupplier);
        setInitialRequests(data);
        setRequests(data);
      }
    });
    setGotList(true);
  }

  const [selectedFilterValue, setSelectedFilterValue] = useState(I18n.t('all'));
  const [openSettings, setOpenSettings] = useState(false);

  const prettyDate = (date) => {
    let separator = ".";
    return date.split(separator)[1] + " " + I18n.t("month_" + date.split(separator)[0]) + " " + date.split(separator)[2];
  };

  const pressedDelivery = (delivery) => {
    if (delivery.inProgress == true)
      navigation.navigate('ViewTruckMapScreen', {id: delivery._id, coordinates: delivery.coordinates, supplier_id: delivery.supplier_id});
    else
      Alert.alert(
        I18n.t('cancel_order_title'),
        I18n.t('cancel_order_msg'),
        [
          { text: I18n.t("cancel_order"), onPress: () => {/* TODO */} },
          { text: I18n.t("back"), onPress: () => {}, style: 'cancel' }
        ],
        { cancelable: false }
      );
  };

  const filterRequests = (value) => {
    setSelectedFilterValue(value);
    let newRequests = initial_requests;

    if(value == I18n.t('open'))
      newRequests = initial_requests.filter(request => request.selectedBidder == null);

    if(value == I18n.t('ongoing'))
      newRequests = initial_requests.filter(request => request.inProgress == true);

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
                if(request.selectedBidder == null)
                  navigation.navigate('OrderScreen', {request});
                else
                  pressedDelivery(request);
              }}>
            <View style={RequestListScreenLtrStyle.title_contents}>
              <Text style={[RequestListScreenLtrStyle.list_item_title,{color: request.state == 2 ? (request.inDelivery ? Colors.lightGreen : Colors.yellow) : Colors.black}]}>{I18n.t('request')}<Text style={{fontSize:16}}>{" #" + request._id}</Text></Text>
              <Text style={RequestListScreenLtrStyle.offers_count}>{request.state == 1 ? (request.offers + " " + I18n.t('offers')) : (request.supplier_name)}</Text>
            </View>
            <Text style={RequestListScreenLtrStyle.list_item_date_time}>{prettyDate(request.deliveryDate) + ", " + request.deliveryTime}</Text>
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
