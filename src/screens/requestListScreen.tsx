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
import {getRequest, putRequest} from "../requestHandler";
import SyncStorage from 'sync-storage';
import SupplierOpenOrdersScreenLtrStyle from "../../shared/styles/supplierOpenOrdersScreen.ltr.style";

let intervalRef = null;

const RequestListScreen = ({route, navigation}) => {

  const token = SyncStorage.get("token");
  const [initial_requests, setInitialRequests] = useState([] as {}[]);
  const [requests, setRequests] = useState([] as {}[]);
  const [got_list, setGotList] = useState(false);
  if (!got_list) {
    getRequest("client/order/list", token, response => {
        if (response.data.success) {
          let data = response.data.data.filter(order => order.delivered == false && !order.canceledByCustomer && !order.canceledBySupplier);
          setInitialRequests(data.map(req => ({
            ...req,
          })));
          setRequests(data.map(req => ({
            ...req,
          })).sort((a, b) => {
            return b.orderId - a.orderId;
          }));

        } else {
          console.log(response);
        }
      }
    );
    setGotList(true);
  }

  const [selectedFilterValue, setSelectedFilterValue] = useState(I18n.t('all'));
  const [selectedSortValue, setSelectedSortValue] = useState(I18n.t('new'));
  const [openSettings, setOpenSettings] = useState(false);

  const prettyDate = (date) => {
    let separator = ".";
    return date.split(separator)[0] + " " + I18n.t("month_" + date.split(separator)[1]) + " " + date.split(separator)[2];
  };

  const pressedDelivery = (delivery) => {
    if (delivery.driverLocation)
      navigation.navigate('ViewTruckMapScreen', {
        id: delivery.orderId,
        coordinates: delivery.coordinates,
        driverLocation: delivery.driverLocation
      });
    else
      Alert.alert(
        I18n.t('cancel_order_title'),
        I18n.t('cancel_order_msg'),
        [
          {
            text: I18n.t("cancel_order"), onPress: () => {
              putRequest('client/order/cancel', {orderId: delivery.orderId}, token, response => {
                if (response.data)
                  navigation.reload();
              });
            }
          },
          {
            text: I18n.t("back"), onPress: () => {
            }, style: 'cancel'
          }
        ],
        {cancelable: false}
      );
  };

  const filterRequests = (value) => {
    setSelectedFilterValue(value);
    let newRequests = initial_requests;

    if (value == I18n.t('open'))
      newRequests = initial_requests.filter(request => request.selectedBidder == null);

    if (value == I18n.t('ongoing'))
      newRequests = initial_requests.filter(request => request.selectedBidder && !request.inDelivery == true);

    if (value == I18n.t('inDelivery'))
      newRequests = initial_requests.filter(request => request.inDelivery == true);

    setRequests(newRequests);
  };

  const sortRequests = type => {
    let newRequests = requests;
    switch (type) {
      case I18n.t('new'):
        newRequests.sort((a, b) => {
          return b.orderId - a.orderId;
        });
        break;
      case I18n.t('old'):
        newRequests.sort((a, b) => {
          return a.orderId - b.orderId;
        });
        break;
    }
    setRequests(newRequests);
  };

  const logoutUser = () => {
    SyncStorage.set('token', null);
    SyncStorage.set('cards', null);
    navigation.navigate('Login');
  };

  console.log(requests);

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
            <Text style={{
              width: '100%',
              paddingBottom: 30,
              textAlign: "center",
              fontSize: Fonts.h6,
              fontWeight: 'bold',
              color: Colors.black
            }}>{I18n.t('settings')}</Text>
            <TouchableOpacity style={{
              marginLeft: 25,
              width: 170,
              marginBottom: 20,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: "center"
            }} onPress={() => navigation.navigate('MyCardsScreen')}>
              <CustomIcons
                style={{marginRight: 8}}
                size={Fonts.h6}
                color={Colors.orange}
                name="credit-card"
              /><Text style={{
              width: 140,
              color: Colors.orange,
              fontWeight: 'bold',
              fontSize: Fonts.regular
            }}>{I18n.t('my_cards')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              marginLeft: 25,
              width: 170,
              marginBottom: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: "center"
            }} onPress={() => logoutUser()}>
              <CustomIcons
                style={{marginRight: 5, marginLeft: 3}}
                size={Fonts.h6}
                color={Colors.orange}
                name="exit"
              /><Text style={{
              width: 140,
              color: Colors.orange,
              fontWeight: 'bold',
              fontSize: Fonts.regular
            }}>{I18n.t('logout_button')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{position: "absolute", top: 2, right: 10}} onPress={() => setOpenSettings(false)}>
              <Text style={{color: Colors.black, fontWeight: 'bold', fontSize: Fonts.h5}}>&times;</Text>
            </TouchableOpacity>
          </View>] : null
      }
      <View style={SupplierOpenOrdersScreenLtrStyle.sort_filter}>
        <View style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
          <CustomIcons
            style={{marginRight: 5}}
            size={Fonts.regular}
            color={Colors.white}
            name="equalizer"
          />
          <Picker
            style={{flex: 1, fontSize: Fonts.small, color: Colors.white}}
            itemStyle={{fontSize: Fonts.small, color: Colors.white}}
            selectedValue={selectedFilterValue}
            onValueChange={(value) => filterRequests(value)}
          >
            <Picker.Item label={I18n.t('all')} value={I18n.t('all')}/>
            <Picker.Item label={I18n.t('open')} value={I18n.t('open')}/>
            <Picker.Item label={I18n.t('ongoing')} value={I18n.t('ongoing')}/>
            <Picker.Item label={I18n.t('inDelivery')} value={I18n.t('inDelivery')}/>
          </Picker>
        </View>
        <View style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <CustomIcons
            style={{marginRight: 5}}
            size={Fonts.regular}
            color={Colors.white}
            name="sort-amount-asc"
          />
          <Picker
            style={{flex: 1, color: Colors.white}}
            selectedValue={selectedSortValue}
            onValueChange={value => {
              sortRequests(value);
              setSelectedSortValue(value)
            }}
          >
            <Picker.Item label={I18n.t('new')} value={I18n.t('new')}/>
            <Picker.Item label={I18n.t('old')} value={I18n.t('old')}/>
          </Picker>
        </View>
      </View>
      <ScrollView contentContainerStyle={RequestListScreenLtrStyle.list}>
        {requests.map((request, idx) =>
          <TouchableOpacity key={idx} style={
            [RequestListScreenLtrStyle.list_item,
              {
                backgroundColor: Colors.black
              }
            ]}
                            onPress={() => {
                              if (request.selectedBidder == null)
                                navigation.navigate('OrderScreen', {request});
                              else
                                pressedDelivery(request);
                            }}>
            <Text style={RequestListScreenLtrStyle.list_item_date_time}>{request.address}</Text>
            <View style={RequestListScreenLtrStyle.list_item_details}>
              <View style={RequestListScreenLtrStyle.list_item_address}>
                <Text
                  style={RequestListScreenLtrStyle.list_item_address_value}>{prettyDate(request.deliveryDate) + ", " + request.deliveryTime}</Text>
              </View>
            </View>
            <View style={RequestListScreenLtrStyle.title_contents}>
              <Text style={[RequestListScreenLtrStyle.list_item_title, {
                fontSize: 14,
                color: request.selectedBidder !== null ? (request.driverLocation ? Colors.orange : Colors.yellow) : Colors.white
              }]}>{request.selectedBidder !== null ? (request.driverLocation ? "In curs de livrare" : "Acceptata de furnizor") : "In curs de licitare"}<Text
                style={{fontSize: 18}}></Text></Text>
              <Text
                style={RequestListScreenLtrStyle.offers_count}>{request.selectedBidder == null ? (request.bidders.length + " " + I18n.t('offers')) : (request.company)}</Text>
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
