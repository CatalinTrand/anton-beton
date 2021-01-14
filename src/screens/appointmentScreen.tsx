import AppointmentScreenLtrStyle from '../../shared/styles/appointmentScreen.ltr.style';
import moment from 'moment';
import * as React from "react";
import {Alert, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import Colors from "../../shared/themes/Colors";
import I18n from "../../shared/I18n/I18n";
import Header from "../components/sections/header";
import DatePicker from 'react-native-datepicker';
import {useState} from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import FloatPlaceholderTextInput from "../../shared/components/sections/floatPlaceholderTextInput";
import GlobalLtrStyle from "../../shared/styles/global.ltr.style";
import RegularButton from "../../shared/components/buttons/regularButton";
import SyncStorage from 'sync-storage';
import {postRequest} from "../requestHandler";

const AppointmentScreen = ({route, navigation}) => {

  moment.locale(I18n.locale);

  const {destination_coords, destination_name} = route.params;
  const [date, setDate] = useState(moment());
  const [time, setTime] = useState(new Date());
  const [isVisibleTimePicker, setTimePickerVisibility] = useState(false);
  const [quantity, setQuantity] = useState('');

  const sendRequest = () => {
    if(destination_coords == null || destination_name == null)
      return;

    let token = SyncStorage.get("token");

    let formattedDate = new Date(date);
    let formattedDatetring = formattedDate.getDay() + "." + (formattedDate.getMonth() + 1) + "." + formattedDate.getFullYear();
    let formattedTimeString = time.getHours() + ":" + time.getMinutes();

    postRequest("client/order", {date: formattedDatetring, time: formattedTimeString, quantity: quantity, address: destination_name, coordinates: destination_coords, type: "F1"}, token, response => {
      if(response.data.success) {
        Alert.alert(
          I18n.t('request_made_title'),
          I18n.t('request_made_msg'),
          [
            { text: "Ok", onPress: () => navigation.navigate('RequestListScreen') }
          ],
          { cancelable: false }
        );
      } else {
        console.log(response.data.error);
      }
    });
  };

  return (
    <View style={AppointmentScreenLtrStyle.container}>
      <Header
        placement="left"
        containerPaddingBottom={10}
        leftComponent={
          <CustomIcons
            size={Fonts.medium}
            color={Colors.orange}
            style={{marginTop: 10, marginLeft: 5}}
            name="arrow-back"
            onPress={navigation.goBack}
          />
        }
        centerComponent={
          <View style={[AppointmentScreenLtrStyle.title, {marginTop: 10, paddingRight: 15}]}>
            <Text style={[AppointmentScreenLtrStyle.title_text, {color: Colors.orange}]}>{I18n.t('delivery_requirements').toLowerCase()}</Text>
          </View>
        }
        rightComponent={null}
        noBorder={false}
      />
      <ScrollView contentContainerStyle={{backgroundColor: Colors.black}}>
        <View style={AppointmentScreenLtrStyle.inputs}>
          <View style={AppointmentScreenLtrStyle.delivery_address}>
            <Text style={AppointmentScreenLtrStyle.delivery_address_title}>{I18n.t('delivery_address')}</Text>
            <Text style={AppointmentScreenLtrStyle.delivery_address_value}>{destination_name}</Text>
          </View>
          <Text style={AppointmentScreenLtrStyle.delivery_date_title}>{I18n.t('delivery_date')}</Text>
          <DatePicker
            style={AppointmentScreenLtrStyle.date_picker}
            date={date}
            mode="date"
            placeholder="select date"
            format="DD MMMM YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 45,
                borderRadius: 7,
                borderColor: Colors.white,
                backgroundColor: Colors.lightGrey,
                color: "#fff"
              }
            }}
            onDateChange={(date) => {
              setDate(date)
            }}
          />
          <Text style={AppointmentScreenLtrStyle.delivery_date_title}>{I18n.t('delivery_time')}</Text>
          <View style={AppointmentScreenLtrStyle.delivery_time_container}>
            <CustomIcons
              size={Fonts.h4}
              color={Colors.white}
              style={{marginTop: 0}}
              name="clock"
            />
            <TouchableOpacity style={AppointmentScreenLtrStyle.delivery_time_details} onPress={() => {setTimePickerVisibility(true)}}>
              <Text style={AppointmentScreenLtrStyle.delivery_time_value}>{time == undefined ? (new Date()).getHours() + ":" + ((new Date()).getMinutes() < 10 ? "0" : "") + (new Date()).getMinutes() : time.getHours() + ":" + (time.getMinutes() < 10 ? "0" : "" ) + time.getMinutes()}</Text>
            </TouchableOpacity>
          </View>
          {isVisibleTimePicker ?
            <RNDateTimePicker
              value={time}
              mode="time"
              is24Hour={true}
              onChange={(e, time) => {
                setTimePickerVisibility(false);
                setTime(time == undefined ? new Date() : time);
              }}
            />
            : null}
          <Text style={AppointmentScreenLtrStyle.delivery_date_title}>{I18n.t('quantity')}</Text>
          <View style={AppointmentScreenLtrStyle.quantity_container}>
            <CustomIcons
              size={Fonts.h4}
              color={Colors.white}
              style={{marginTop: 0, marginLeft: -10}}
              name="truck"
              onPress={navigation.goBack}
            />
            <TextInput
              style={{backgroundColor: Colors.lightGrey, width: '50%', padding: 10, margin: 15, borderRadius: 7, color: "#000"}}
              placeholder={I18n.t('enter_quantity')}
              keyboardType="number-pad"
              value={quantity}
              onChangeText={(value) => setQuantity(value)}
            />
            <Text style={AppointmentScreenLtrStyle.quantity_unit}>m³</Text>
          </View>
        </View>
      </ScrollView>
      <RegularButton
        title={I18n.t('send_request')}
        onPress={() => sendRequest()}
        buttonStyle={[
          GlobalLtrStyle.buttonStyle,
          {
            width: '90%',
            marginTop: 20,
            backgroundColor: Colors.orange,
            color: Colors.black
          },
        ]}
        containerStyle={{justifyContent: 'center', alignItems: 'center', color: Colors.black}}
      />
    </View>
  );
};

export default AppointmentScreen;
