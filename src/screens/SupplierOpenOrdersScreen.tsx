import SupplierOpenOrdersScreenLtrStyle from "../../shared/styles/supplierOpenOrdersScreen.ltr.style";
import I18n from "../../shared/I18n/I18n";
import {Linking, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Picker} from "@react-native-community/picker";
import RequestListScreenLtrStyle from "../../shared/styles/RequestListScreen.ltr.style";
import Header from "../components/sections/header";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import Colors from "../../shared/themes/Colors";
import * as React from "react";
import {useState} from "react";
import BottomTabSupplierNavigator from "../components/navigation/bottomTabSupplierNavigator";
import {getRequest} from "../requestHandler";
import SyncStorage from "sync-storage";

const SupplierOpenOrdersScreen = ({route, navigation}) => {

  const [openSettings, setOpenSettings] = useState(false);
  const [selectedFilterValue, setSelectedFilterValue] = useState(I18n.t('all'));
  const [selectedSortValue, setSelectedSortValue] = useState(I18n.t('new'));
  const [requests, setRequests] = useState([] as {}[]);
  const [bidRequests, setBidRequests] = useState([] as {}[]);
  const [allRequests, setAllRequests] = useState([] as {}[]);
  const [displayedRequests, setDisplayedRequests] = useState([] as {}[]);
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
  //       offers: 3,
  //       bid: {
  //         time: "13:30",
  //         concreteType: 2,
  //         price: 5000,
  //         advance_price: 3000,
  //       }
  //     },
  //     {
  //       _id: 1000002,
  //       state: 2,
  //       address: "Str. Lujerului 42J, Bucuresti, Romania",
  //       quantity: 2000,
  //       deliveryDate: "10.12.2020",
  //       deliveryTime: "12:00",
  //       bid: null,
  //     },
  //     {
  //       _id: 1000003,
  //       state: 2,
  //       address: "Str. Lujerului 42J, Bucuresti, Romania",
  //       quantity: 3000,
  //       deliveryDate: "10.12.2020",
  //       deliveryTime: "12:00",
  //       bid: null,
  //     },
  //   ];
  //   setInitialRequests(data);
  //   setRequests(data);
  //   setGotList(true);
  // }

  if(!got_list) {
    getRequest("supplier/order/list", token, response => {
      if (response.data) {
        setRequests(response.data.data.map(offer => {
          return {...offer, address: offer.address ? offer.address : "Str. Lujerului 42J, Bucuresti"}
        }).sort((a,b) => b.orderId - a.orderId)); //TODO - quantity to int
      } else {
        console.log(response);
      }
    });
    getRequest("supplier/order/list/bidded", token, response => {
      if (response.data) {
        setBidRequests(response.data.data.map(offer => {
          return {...offer, address: offer.address ? offer.address : "Str. Lujerului 42J, Bucuresti"}
        }).sort((a,b) => b.orderId - a.orderId)); //TODO - quantity to int
      } else {
        console.log(response);
      }
    });
    setGotList(true);
  }

  if(allRequests.length !== bidRequests.length + requests.length){
    setAllRequests([...requests, ...bidRequests].sort((a,b) => b.orderId - a.orderId));
  }

  const filterRequests = (value) => {
    setSelectedFilterValue(value);
    if(value == I18n.t('no_licitation'))
      setDisplayedRequests(requests);
    else
    if(value == I18n.t('with_licitation'))
      setDisplayedRequests(bidRequests);
    else
      setRequests(allRequests);
  };

  const sortRequests = (type) => {
    let newRequests = requests;
    let newBidRequests = bidRequests;
    let newAllRequests = allRequests;
    switch(type) {
      case I18n.t('new'):
        newRequests.sort((a, b) => {
          return b.orderId - a.orderId;
        });
        newBidRequests.sort((a, b) => {
          return b.orderId - a.orderId;
        });
        newAllRequests.sort((a, b) => {
          return b.orderId - a.orderId;
        });
        break;
      case I18n.t('old'):
        newRequests.sort((a, b) => {
          return a.orderId - b.orderId;
        });
        newBidRequests.sort((a, b) => {
          return a.orderId - b.orderId;
        });
        newAllRequests.sort((a, b) => {
          return a.orderId - b.orderId;
        });
        break;
      case I18n.t('quantity_desc'):
        newRequests.sort((a, b) => {
          return parseInt(b.quantity) - parseInt(a.quantity);
        });
        newBidRequests.sort((a, b) => {
          return parseInt(b.quantity) - parseInt(a.quantity);
        });
        newAllRequests.sort((a, b) => {
          return parseInt(b.quantity) - parseInt(a.quantity);
        });
        break;
      case I18n.t('quantity_asc'):
        newRequests.sort((a, b) => {
          return parseInt(a.quantity) - parseInt(b.quantity);
        });
        newBidRequests.sort((a, b) => {
          return parseInt(a.quantity) - parseInt(b.quantity);
        });
        newAllRequests.sort((a, b) => {
          return parseInt(a.quantity) - parseInt(b.quantity);
        });
        break;
    }

    setRequests(newRequests);
    setBidRequests(newBidRequests);
    setAllRequests(newAllRequests);
  };

  const prettyDate = (date) => {
    let separator = ".";
    return date.split(separator)[0] + " " + I18n.t("month_" + date.split(separator)[1]) + " " + date.split(separator)[2];
  };

  const openOrder = (request) => {
    navigation.navigate('SupplierViewOpenOrderScreen', {request});
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
            <Text style={[RequestListScreenLtrStyle.title_text, {color: Colors.orange}]}>{I18n.t('requests_in_your_range')}</Text>
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
      <View style={SupplierOpenOrdersScreenLtrStyle.sort_filter}>
        <View style={{width: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
          <CustomIcons
            style={{marginRight: 5}}
            size={Fonts.regular}
            color={Colors.white}
            name="equalizer"
          />
          <Picker
            style={{flex: 1, fontSize: Fonts.small, color: Colors.white}}
            itemStyle={{fontSize: Fonts.small}}
            selectedValue={selectedFilterValue}
            onValueChange={(value) => filterRequests(value)}
          >
            <Picker.Item label={I18n.t('all')} value={I18n.t('all')}/>
            <Picker.Item label={I18n.t('no_licitation')} value={I18n.t('no_licitation')}/>
            <Picker.Item label={I18n.t('with_licitation')} value={I18n.t('with_licitation')}/>
          </Picker>
        </View>
        <View style={{width: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
          <CustomIcons
            style={{marginRight: 5}}
            size={Fonts.regular}
            color={Colors.white}
            name="sort-amount-asc"
          />
          <Picker
            style={{flex: 1, color: Colors.white}}
            selectedValue={selectedSortValue}
            onValueChange={value => {sortRequests(value); setSelectedSortValue(value)}}
          >
            <Picker.Item label={I18n.t('new')} value={I18n.t('new')}/>
            <Picker.Item label={I18n.t('old')} value={I18n.t('old')}/>
            <Picker.Item label={I18n.t('quantity_desc')} value={I18n.t('quantity_desc')}/>
            <Picker.Item label={I18n.t('quantity_asc')} value={I18n.t('quantity_asc')}/>
          </Picker>
        </View>
      </View>
      <ScrollView contentContainerStyle={RequestListScreenLtrStyle.list}>
        {requests.map((request, idx) =>
          (selectedFilterValue != I18n.t('all')) && (request.alreadyBid == (selectedFilterValue == I18n.t('no_licitation')) ) ? null :
          <TouchableOpacity key={idx} style={[RequestListScreenLtrStyle.list_item]} onPress={() => {openOrder(request)}}>
            <View style={[RequestListScreenLtrStyle.list_item_address,{paddingLeft: 0, paddingBottom: 10, width: "100%"}]}>
              <Text style={RequestListScreenLtrStyle.list_item_date_time}>{request.address}</Text>
            </View>
            <View style={[RequestListScreenLtrStyle.list_item_details,{paddingLeft: 10, paddingBottom: 10}]}>
              <Text style={RequestListScreenLtrStyle.list_item_address_value}>{prettyDate(request.deliveryDate) + ", " + request.deliveryTime}</Text>
            </View>
            <View style={[RequestListScreenLtrStyle.list_item_additional_details,{paddingLeft: 0, paddingBottom: 10}]}>
              <View style={RequestListScreenLtrStyle.list_item_detail}>
                <Text style={[RequestListScreenLtrStyle.list_item_detail_title, {fontWeight: 'normal', color: Colors.white, paddingLeft: 10}]}>{I18n.t('quantity')}</Text>
                <Text style={[RequestListScreenLtrStyle.list_item_detail_value, {color: Colors.white}]}>{request.quantity + " m³"}</Text>
              </View>
            </View>
            {request.alreadyBid ? <Text style={{color: Colors.yellow, fontSize: 16, paddingLeft: 10, paddingBottom: 15}}>Licitat ✓</Text> : null}
          </TouchableOpacity>
        )}
        <View style={{height: 50}}></View>
      </ScrollView>
      <BottomTabSupplierNavigator route={route} navigation={navigation} selected={1}/>
    </View>
  );
};

export default SupplierOpenOrdersScreen;
