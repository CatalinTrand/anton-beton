import * as React from "react";
import {TouchableOpacity, View} from "react-native";
import {useState} from "react";
import Fonts from "../../../shared/themes/Fonts";
import Colors from "../../../shared/themes/Colors";
import {CustomIcons} from "../../../shared/themes";

const BottomTabNavigator = ({route, navigation, selected}) => {

  const [selectedItem, setSelected] = useState(selected);

  return (
    <View style={{position: 'absolute', top: 'auto', bottom: 0, left: 0,display: 'flex', flexDirection: 'row',width: '100%', height: 50, zIndex: 1, borderTopWidth: 1, borderColor: Colors.black, marginBottom: 0, borderTopColor: "#000000"}}>
      <TouchableOpacity style={selectedItem == 1 ?
        {width: '33.33%', display: 'flex',justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.black} :
        {width: '33.33%', display: 'flex',justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.orange, borderColor: Colors.black, borderWidth: 1}
      }
        onPress={selectedItem == 1 ? () => {} : () => { setSelected(1); navigation.navigate('MapScreen')}}
      >
        <CustomIcons
          size={Fonts.regular}
          color={selectedItem == 1 ? Colors.orange : Colors.black}
          style={{}}
          name="plus"
        />
      </TouchableOpacity>
      <TouchableOpacity style={selectedItem == 2 ?
        {width: '33.34%', display: 'flex',justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.black} :
        {width: '33.34%', display: 'flex',justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.orange, borderColor: Colors.black, borderWidth: 1}
      }
        onPress={selectedItem == 2 ? () => {} : () => { navigation.navigate('RequestListScreen')}}
      >
        <CustomIcons
          size={Fonts.regular}
          color={selectedItem == 2 ? Colors.orange : Colors.black}
          style={{}}
          name="list"
        />
      </TouchableOpacity>
      <TouchableOpacity style={selectedItem == 3 ?
        {width: '33.33%', display: 'flex',justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.black} :
        {width: '33.33%', display: 'flex',justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.orange, borderColor: Colors.black, borderWidth: 1}
      }
        onPress={selectedItem == 3 ? () => {} : () => { navigation.navigate('DeliveryListScreen')}}
      >
        <CustomIcons
          size={Fonts.h5}
          color={selectedItem == 3 ? Colors.orange : Colors.black}
          style={{}}
          name="checkbox-checked"
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabNavigator;
