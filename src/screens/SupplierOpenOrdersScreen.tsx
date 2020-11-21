import SupplierOpenOrdersScreenLtrStyle from "../../shared/styles/supplierOpenOrdersScreen.ltr.style";
import I18n from "../../shared/I18n/I18n";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
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

  const [selectedFilterValue, setSelectedFilterValue] = useState(I18n.t('all'));
  const [selectedSortValue, setSelectedSortValue] = useState(I18n.t('new'));
  const [requests, setRequests] = useState([] as {}[]);

  //TODO - to test
  let token = SyncStorage();
  getRequest("supplier/order/list", token, response => {
    if(response.data) {
      setRequests(response.data.data.sort(
        (a,b) => {
          return b.id - a.id;
        }
      ).map(offer => { return {...offer, alreadyBid: offer.bid !== null} })); //TODO - quantity to int
    } else {
      console.log(response);
    }
  });

  const openSettings = () => {

  };

  const sortRequests = (type) => {
    let newRequests = requests;
    switch(type) {
      case I18n.t('new'):
        newRequests.sort((a, b) => {
          return b.id - a.id;
        });
        break;
      case I18n.t('old'):
        newRequests.sort((a, b) => {
          return a.id - b.id;
        });
        break;
      case I18n.t('quantity_desc'):
        newRequests.sort((a, b) => {
          return b.quantity - a.quantity;
        });
        break;
      case I18n.t('quantity_asc'):
        newRequests.sort((a, b) => {
          return a.quantity - b.quantity;
        });
        break;
    }

    setRequests(newRequests);
  };

  const prettyDate = (date) => {
    let separator = ".";
    return date.split(separator)[1] + " " + I18n.t("month_" + date.split(separator)[0]) + " " + date.split(separator)[2];
  };

  const openOrder = (request) => {
    navigation.navigate('SupplierViewOpenOrderScreen', {request});
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
            <Text style={[RequestListScreenLtrStyle.title_text, {color: Colors.black}]}>{I18n.t('requests_in_your_range')}</Text>
          </View>
        }
        rightComponent={null}
        noBorder={false}
      />
      <View style={SupplierOpenOrdersScreenLtrStyle.sort_filter}>
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
            onValueChange={(value) => setSelectedFilterValue(value)}
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
            color={Colors.black}
            name="sort-amount-asc"
          />
          <Picker
            style={{flex: 1}}
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
            <View style={RequestListScreenLtrStyle.title_contents}>
              <Text style={[RequestListScreenLtrStyle.list_item_title, request.alreadyBid ? {color: Colors.green} : {color: Colors.black}]}>{I18n.t('request') + " #" + request._id}</Text>
            </View>
            <Text
              style={RequestListScreenLtrStyle.list_item_date_time}>{prettyDate(request.deliveryDate) + ", " + request.deliveryTime}</Text>
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
      <BottomTabSupplierNavigator route={route} navigation={navigation} selected={1}/>
    </View>
  );
};

export default SupplierOpenOrdersScreen;
