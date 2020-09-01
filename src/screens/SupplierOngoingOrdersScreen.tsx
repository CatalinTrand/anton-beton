import SupplierOngoingOrdersScreenLtrStyle from "../../shared/styles/supplierOngoingOrdersScreen.ltr.style";
import * as React from "react";
import {Text, View} from "react-native";
import BottomTabSupplierNavigator from "../components/navigation/bottomTabSupplierNavigator";
import RequestListScreenLtrStyle from "../../shared/styles/RequestListScreen.ltr.style";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import Colors from "../../shared/themes/Colors";
import I18n from "../../shared/I18n/I18n";
import Header from "../components/sections/header";

const SupplierOngoingOrdersScreen = ({route, navigation}) => {

  const openSettings = () => {

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
            <Text style={RequestListScreenLtrStyle.title_text}>{I18n.t('ongoing_orders')}</Text>
          </View>
        }
        rightComponent={null}
        noBorder={false}
      />
      <BottomTabSupplierNavigator route={route} navigation={navigation} selected={2}/>
    </View>
  );
};

export default SupplierOngoingOrdersScreen;
