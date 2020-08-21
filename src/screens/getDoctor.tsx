import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
// @ts-ignore
import I18n from '../../shared/I18n/I18n';
import { Colors, CustomIcons, Fonts, Metrics } from '../../shared/themes';
import Header from '../components/sections/header';
import GlobalLtrStyle from '../../shared/styles/global.ltr.style';
import DoctorProfileLtrStyle from '../../shared/styles/doctorProfile.ltr.style';

const GetDoctor = ({ navigation }): JSX.Element => {
  const options = [
    {
      id: 1,
      name: 'medical_app.adult',
      path: 'SearchSpecialists',
      icon: 'parent',
    },
    {
      id: 2,
      name: 'medical_app.child',
      path: 'SearchSpecialists',
      icon: 'child',
    },
  ];
  const isLoggedIn = true;
  const handleAction = (item) => {
    if (isLoggedIn) {
      navigation.navigate('Auth', {
        screen: 'SearchDoctor',
      });
    } else {
      navigation.navigate('Auth', {
        screen: 'Login',
      });
    }
  };
  const renderOptions = () => {
    return options.map((item, index) => {
      return (
        <TouchableOpacity
          onPress={() => handleAction(item)}
          key={index.toString()}
          style={[{ width: `${95 / options.length}%` }]}
        >
          <View style={[GlobalLtrStyle.iconTextWrapper, { padding: Metrics.doubleBaseMargin }]}>
            <CustomIcons name={item.icon} size={Fonts.h3} color={Colors.black} />
            <Text style={[GlobalLtrStyle.iconText]}>{I18n.t(item.name)}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
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
        centerComponent={
          <Text style={GlobalLtrStyle.headerText}>{I18n.t('medical_app.get_doctor')}</Text>
        }
      />
      <View style={GlobalLtrStyle.centeredView}>
        <Text style={[GlobalLtrStyle.bigHeader, { color: Colors.orange }]}>
          {I18n.t('medical_app.get_doctor_title')}
        </Text>
        <View style={[DoctorProfileLtrStyle.row, { justifyContent: 'space-between' }]}>
          {renderOptions()}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetDoctor;
