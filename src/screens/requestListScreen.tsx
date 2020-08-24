import RequestListScreenLtrStyle from '../../shared/styles/RequestListScreen.ltr.style';
import {Text, View} from "react-native";
import * as React from "react";
import BottomTabNavigator from "../components/navigation/bottomTabNavigator";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import Colors from "../../shared/themes/Colors";
import MapScreenLtrStyle from "../../shared/styles/mapScreen.ltr.style";
import I18n from "../../shared/I18n/I18n";
import Header from "../components/sections/header";

const RequestListScreen = ({route, navigation}) => {

  const openSettings = () => {

  };

  return (
    <View style={RequestListScreenLtrStyle.container}>
      <Header
        placement="left"
        leftComponent={
          <CustomIcons
            style={{marginTop: 15,marginLeft: 10}}
            size={Fonts.h6}
            color={Colors.black}
            name="cog"
            onPress={() => openSettings()}
          />
        }
        centerComponent={
          <View style={[RequestListScreenLtrStyle.title, {marginTop: 15}]}>
            <Text style={RequestListScreenLtrStyle.title_text}>{I18n.t('view_your_requests')}</Text>
          </View>
        }
        rightComponent={null}
        noBorder={true}
      />
      <BottomTabNavigator route={route} navigation={navigation} selected={2}/>
    </View>
  );
};

export default RequestListScreen;
