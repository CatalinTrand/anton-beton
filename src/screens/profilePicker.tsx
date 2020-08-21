import ProfilePickerLtrStyle from '../../shared/styles/profilePicker.ltr.style';
import Colors from "../../shared/themes/Colors";
import Header from "../components/sections/header";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import {FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import ScheduleCalendarLtrStyle from "../../shared/styles/scheduleCalendar.ltr.style";
import I18n from "../../shared/I18n/I18n";
import UserAvatar from "../../shared/components/sections/userAvatar";
import Metrics from "../../shared/themes/Metrics";
import * as React from "react";

const ProfilePicker = ({route, navigation}) => {

  const {time, date, doctor} = route.params;

  const profiles = [
    {
      id: 1,
      firstName: "Maria",
      lastName: "Popescu",
      name: "Maria Popescu",
      age: 24,
      imgUrl: "https://specials-images.forbesimg.com/imageserve/1139665860/960x0.jpg?fit=scale"
    },
    {
      id: 2,
      firstName: "Andrei",
      lastName: "Ionescu",
      name: "Andrei Ionescu",
      age: 9,
      imgUrl: "https://specials-images.forbesimg.com/imageserve/1139665860/960x0.jpg?fit=scale"
    },
  ];
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
      <View style={{marginTop: 'auto', marginBottom: 'auto'}}>
        <View style={ProfilePickerLtrStyle.header_text}>
          <Text style={ProfilePickerLtrStyle.header_step_text}>{I18n.t('step').toUpperCase()} 2/4</Text>
          <Text style={ProfilePickerLtrStyle.header_schedule_text}>{I18n.t('profile')}</Text>
        </View>
        <ScrollView style={ProfilePickerLtrStyle.profile_list}>
          { profiles.map( (profile,idx) =>
          <TouchableOpacity key={idx} style={ProfilePickerLtrStyle.profile_details} onPress={() => navigation.navigate('DocumentSelector', { pacient: profile, time, date, doctor } ) }>
            <View style={ProfilePickerLtrStyle.profile_details_left}>
              <UserAvatar
                imageURL={profile.imgUrl}
                firstName={profile.firstName}
                lastName={profile.lastName}
                theme={Colors.borderGrey}
                size={Metrics.icons.xl}
              />
            </View>
            <View style={ProfilePickerLtrStyle.profile_details_right}>
              <Text style={ProfilePickerLtrStyle.profile_details_name}>{profile.name}</Text>
              <Text
                style={ProfilePickerLtrStyle.profile_details_specialization}>{profile.age} {I18n.t('years')} - {profile.age > 18 ? I18n.t('adult') : I18n.t('child')}</Text>
            </View>
          </TouchableOpacity>
          )}
        </ScrollView>
        <TouchableOpacity style={ProfilePickerLtrStyle.new_profile} >
          <View style={ProfilePickerLtrStyle.new_profile_left}>
            <CustomIcons
              size={Fonts.medium}
              color={Colors.orange}
              name="plus"
              onPress={navigation.goBack}
            />
          </View>
          <View style={ProfilePickerLtrStyle.new_profile_right}>
            <Text style={ProfilePickerLtrStyle.new_profile_title}>{I18n.t('add_profile')}</Text>
            <Text style={ProfilePickerLtrStyle.new_profile_description}>{I18n.t('for_a_family_member')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePicker;
