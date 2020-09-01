import MapScreen from "./mapScreen";
import {useState} from "react";
import I18n from "../../shared/I18n/I18n";

const DisplayScreen = ({route,navigation}) => {

  const [lng, setLng] = useState(I18n.locale);

  const userType = 2; //1 - client, 2 - furnizor

  if(userType == 1)
    navigation.navigate('MapScreen',{lng});
  else
    navigation.navigate('SupplierOpenOrdersScreen',{lng});

  return null;
};

export default DisplayScreen;
