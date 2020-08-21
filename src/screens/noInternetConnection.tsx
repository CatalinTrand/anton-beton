import React, { useState } from 'react';
import { Keyboard, Text, View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors, CustomIcons, Fonts, Metrics } from '../../shared/themes';
import Header from '../components/sections/header';
import loginPageStyle from '../../shared/styles/auth.ltr.style';
import GlobalLtrStyle from '../../shared/styles/global.ltr.style';
import I18n from '../../shared/I18n/I18n';
import DoctorProfileLtrStyle from '../../shared/styles/doctorProfile.ltr.style';
import RegularButton from '../../shared/components/buttons/regularButton';

const NoInternetConnection = ({ navigation }): JSX.Element => {
  const onPress = () => {
    console.warn('check for internet');
  };
  return (
    <>
      <Header
        leftComponent={
          <CustomIcons
            size={Fonts.medium}
            color={Colors.black}
            name="arrow-back"
            onPress={navigation.goBack}
          />
        }
      />
      <View style={loginPageStyle.containerView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={GlobalLtrStyle.centeredView}>
            <View style={[DoctorProfileLtrStyle.row]}>
              <View style={[DoctorProfileLtrStyle.column, { width: '100%', alignItems: 'center' }]}>
                <Icon name="wifi-off" size={70} color={Colors.darkGrey} />
                <Text
                  style={[
                    GlobalLtrStyle.headline,
                    {
                      color: Colors.grey,
                      fontSize: Fonts.medium,
                      marginTop: Metrics.doubleBaseMargin,
                    },
                  ]}
                >
                  {I18n.t('no_internet')}
                </Text>
              </View>
            </View>
            <View style={[DoctorProfileLtrStyle.row, { marginVertical: Metrics.doubleBaseMargin }]}>
              <View style={[DoctorProfileLtrStyle.column, { width: '100%' }]}>
                <RegularButton
                  title={I18n.t('retry')}
                  onPress={onPress}
                  buttonStyle={[
                    GlobalLtrStyle.buttonStyle,
                    {
                      marginTop: 50,
                      backgroundColor: Colors.orange,
                    },
                  ]}
                  containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default NoInternetConnection;
