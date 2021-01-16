import * as React from "react";
import {TouchableOpacity, View} from "react-native";
import {useState} from "react";
import Fonts from "../../../shared/themes/Fonts";
import Colors from "../../../shared/themes/Colors";
import {CustomIcons} from "../../../shared/themes";

const BottomTabSupplierNavigator = ({route, navigation, selected}) => {

  const [selectedItem, setSelected] = useState(selected);

  return (
    <View style={{position: 'absolute', top: 'auto', bottom: 0, left: 0,display: 'flex', flexDirection: 'row',width: '100%', height: '8.3%', zIndex: 1, borderTopWidth: 2, borderColor: "#000000", marginBottom: 0}}>
      <TouchableOpacity style={selectedItem == 1 ?
        {width: '50%', display: 'flex',justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.orange} :
        {width: '50%', display: 'flex',justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.black, borderColor: Colors.black, borderWidth: 1}
      }
        onPress={selectedItem == 1 ? () => {} : () => { setSelected(1); navigation.navigate('SupplierOpenOrdersScreen')}}
      >
        <CustomIcons
          size={Fonts.regular}
          color={selectedItem == 1 ? Colors.black : Colors.orange}
          style={{}}
          name="list"
        />
      </TouchableOpacity>
      <TouchableOpacity style={selectedItem == 2 ?
        {width: '50%', display: 'flex',justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.orange} :
        {width: '50%', display: 'flex',justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.black, borderColor: Colors.black, borderWidth: 1}
      }
        onPress={selectedItem == 2 ? () => {} : () => { navigation.navigate('SupplierOngoingOrdersScreen')}}
      >
        <CustomIcons
          size={Fonts.regular}
          color={selectedItem == 2 ? Colors.black : Colors.orange}
          style={{}}
          name="truck"
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabSupplierNavigator;
