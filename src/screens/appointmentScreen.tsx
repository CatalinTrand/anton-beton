import AppointmentScreenLtrStyle from '../../shared/styles/appointmentScreen.ltr.style';
import moment from 'moment';
import * as React from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import Colors from "../../shared/themes/Colors";
import I18n from "../../shared/I18n/I18n";
import Header from "../components/sections/header";
import DatePicker from 'react-native-datepicker';
import {useState} from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const AppointmentScreen = ({route, navigation}) => {

  moment.locale(I18n.locale);

  const {destination_coords, destination_name} = route.params;
  const [date, setDate] = useState(moment());
  const [time, setTime] = useState(new Date());
  const [isVisibleTimePicker, setTimePickerVisibility] = useState(false);

  return (
    <View style={AppointmentScreenLtrStyle.container}>
      <Header
        placement="left"
        leftComponent={
          <CustomIcons
            size={Fonts.medium}
            color={Colors.black}
            style={{marginTop: 10}}
            name="arrow-back"
            onPress={navigation.goBack}
          />
        }
        centerComponent={
          <View style={[AppointmentScreenLtrStyle.title, {marginTop: 10}]}>
            <Text style={AppointmentScreenLtrStyle.title_text}>{I18n.t('delivery_requirements')}</Text>
          </View>
        }
        rightComponent={null}
        noBorder={true}
      />
      <ScrollView>
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
              color={Colors.black}
              style={{marginTop: 0}}
              name="clock"
            />
            <TouchableOpacity style={AppointmentScreenLtrStyle.delivery_time_details} onPress={() => {setTimePickerVisibility(true)}}>
              <Text style={AppointmentScreenLtrStyle.delivery_time_value}>{time == undefined ? (new Date()).getHours() + ":" + (new Date()).getMinutes() : time.getHours() + ":" + time.getMinutes()}</Text>
            </TouchableOpacity>
          </View>
          {isVisibleTimePicker ?
            <RNDateTimePicker
              value={time}
              mode="time"
              is24Hour={true}
              onChange={(e, time) => {
                setTime(time == undefined ? new Date() : time);
                setTimePickerVisibility(false)
              }}
            />
            : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default AppointmentScreen;
