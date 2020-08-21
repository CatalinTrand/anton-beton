import ScheduleCalendarLtrStyle from '../../shared/styles/scheduleCalendar.ltr.style';
import {SafeAreaView, Text, View, ScrollView, TouchableOpacity} from "react-native";
import * as React from "react";
import {useState} from "react";
import Colors from "../../shared/themes/Colors";
import Header from "../components/sections/header";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import I18n from '../../shared/I18n/I18n';
import UserAvatar from "../../shared/components/sections/userAvatar";
import Metrics from "../../shared/themes/Metrics";
import RegularButton from "../../shared/components/buttons/regularButton";
import GlobalLtrStyle from "../../shared/styles/global.ltr.style";

const scheduleCalendar = ({route, navigation}) => {

  const {specialization, imgUrl, firstName, lastName, name, price} = route.params;

  const selectedDate = "08-08-2020";

  const availableHours = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30"];

  const [time, setTime] = useState({time: '', idx: -1});

  const clickedInterval = (newTime, newIdx) => {
    setTime({time: newTime, idx: newIdx});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <Header
        placement="left"
        leftComponent={
          <CustomIcons
            size={Fonts.medium}
            color={Colors.black}
            name="arrow-back"
            onPress={navigation.goBack}
          />
        }
        centerComponent={null}
        rightComponent={null}
        noBorder={true}
      />
      <ScrollView>
        <View style={ScheduleCalendarLtrStyle.header_text}>
          <Text style={ScheduleCalendarLtrStyle.header_step_text}>{I18n.t('step').toUpperCase()} 1/4</Text>
          <Text style={ScheduleCalendarLtrStyle.header_schedule_text}>{I18n.t('appointment')}</Text>
        </View>
        <View style={ScheduleCalendarLtrStyle.doctor_details}>
          <View style={ScheduleCalendarLtrStyle.doctor_details_left}>
            <UserAvatar
              imageURL={imgUrl}
              firstName={firstName}
              lastName={lastName}
              theme={Colors.borderGrey}
              size={Metrics.icons.xl}
            />
          </View>
          <View style={ScheduleCalendarLtrStyle.doctor_details_right}>
            <Text style={ScheduleCalendarLtrStyle.doctor_details_specialization}>{specialization}</Text>
            <Text style={ScheduleCalendarLtrStyle.doctor_details_name}>{name}</Text>
          </View>
        </View>
        <View style={ScheduleCalendarLtrStyle.calendar}>

        </View>
        <View style={ScheduleCalendarLtrStyle.hours_container}>
          <Text style={ScheduleCalendarLtrStyle.hours_title}>{I18n.t('time')}</Text>
          <View style={ScheduleCalendarLtrStyle.hours}>
            {
              availableHours.map((hour, idx) =>
                (
                  <TouchableOpacity key={idx} style={[
                    ScheduleCalendarLtrStyle.single_hour,
                    {
                      borderColor: time.idx == idx ? Colors.orange : Colors.grey,
                      borderWidth: time.idx == idx ? 2 : 1,
                    },
                  ]}
                  onPress={() => { clickedInterval(hour, idx)}} >
                    <Text style={[
                      ScheduleCalendarLtrStyle.single_hour_text,
                      {
                        paddingLeft: time.idx == idx ? 24 : 25,
                        paddingRight: time.idx == idx ? 24 : 25,
                      }
                    ]}>{hour}</Text>
                  </TouchableOpacity>)
              )
            }
          </View>
        </View>
        <RegularButton
          title={I18n.t('go_to_next_step')}
          onPress={() => time.idx == -1 ? console.warn('no time selected') : navigation.navigate('ProfilePicker', {time: time.time, date: selectedDate, doctor: {specialization, firstName, lastName, name, imgUrl, price}}) }
          buttonStyle={[
            GlobalLtrStyle.buttonStyle,
            {
              backgroundColor: time.idx == -1 ? Colors.grey : Colors.orange,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              borderRadius: 7,
            },
          ]}
          titleStyle={{color: 'white', fontSize: Fonts.regular}}
          containerStyle={{marginLeft: 15, marginRight: 15, justifyContent: 'center', alignItems: 'center'}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default scheduleCalendar;
