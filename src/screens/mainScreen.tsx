import React from 'react';
import { SafeAreaView, ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import I18n from '../../shared/I18n/I18n';
import HomePageLtrStyle from '../../shared/styles/homePage.ltr.style';
import { Images, Colors, CustomIcons, Metrics } from '../../shared/themes';
import RegularButton from '../../shared/components/buttons/regularButton';
import GlobalLtrStyle from '../../shared/styles/global.ltr.style';

const MainScreen = ({ navigation }): JSX.Element => {
  const css = HomePageLtrStyle;
  const availableSpecialists = 132;
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={css.scrollView}>
        <Text style={[css.nameApp, { color: Colors.orange }]}>medical app</Text>
        <Image style={css.homepageImage} source={Images.homepagePatient} />
        <Text style={[css.homepageHeader, { color: Colors.orange }]}>
          {`${I18n.t('medical_app.home_screen_patient.header')}`}
        </Text>
        <View style={css.childrenRow}>
          <View
            style={[
              css.circle,
              { width: 10, height: 10, backgroundColor: Colors.green },
            ]}
          />
          <Text style={{ marginHorizontal: 5 }}>{availableSpecialists}</Text>
          <Text>{I18n.t('medical_app.home_screen_patient.sub_title')}</Text>
        </View>
        <RegularButton
          title={I18n.t('medical_app.home_screen_patient.want_doctor')}
          icon={
            <CustomIcons
              style={{ marginRight: 10 }}
              name="audio-call"
              size={15}
              color={Colors.white}
            />
          }
          onPress={() => navigation.navigate('GetDoctor')}
          buttonStyle={[
            GlobalLtrStyle.buttonStyle,
            {
              backgroundColor: Colors.orange,
            },
          ]}
          containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        />
        <RegularButton
          title={I18n.t('medical_app.home_screen_patient.search_specialist')}
          icon={
            <CustomIcons
              style={{ marginRight: 10 }}
              name="search-dr"
              size={15}
              color={Colors.lightBlack}
            />
          }
          onPress={() => navigation.navigate('SearchSpecialists')}
          buttonStyle={[
            GlobalLtrStyle.buttonStyle,
            {
              backgroundColor: Colors.white,
              borderWidth: 1,
              borderColor: Colors.grey,
            },
          ]}
          containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          titleStyle={{ color: Colors.lightBlack }}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Auth', { screen: 'FeedbackScreen' })}>
          <Text>button</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default MainScreen;
