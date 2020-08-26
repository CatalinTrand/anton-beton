import ViewTruckMapScreenLtrStyle from '../../shared/styles/ViewTruckMapScreen.ltr.style';
import * as React from "react";
import Colors from "../../shared/themes/Colors";
import Header from "../components/sections/header";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import {SafeAreaView, Text, View} from "react-native";
import OrderScreenLtrStyle from "../../shared/styles/orderScreen.ltr.style";
import I18n from "../../shared/I18n/I18n";

const ViewTruckMapScreen = ({route, navigation}) => {

  const {id, supplier_id} = route.params;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <Header
        placement="left"
        leftComponent={
          <CustomIcons
            style={{marginTop: 15,}}
            size={Fonts.medium}
            color={Colors.black}
            name="arrow-back"
            onPress={navigation.goBack}
          />
        }
        centerComponent={
          <View style={[OrderScreenLtrStyle.title, {marginTop: 15}]}>
            <Text style={OrderScreenLtrStyle.title_text}>{I18n.t('delivery_progress') + " #" + id}</Text>
          </View>
        }
        rightComponent={null}
        noBorder={true}
      />
    </SafeAreaView>
  );
};

export default ViewTruckMapScreen;
