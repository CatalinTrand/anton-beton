import MapScreenLtrStyle from '../../shared/styles/mapScreen.ltr.style';
import MapStyle from '../assets/mapStyle';
import MapView from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import I18n from '../../shared/I18n/I18n';
import {Text, View, TouchableOpacity} from 'react-native';
import * as React from "react";
import {useEffect, useState} from "react";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import Colors from "../../shared/themes/Colors";
import Header from "../components/sections/header";

const MapScreen = ({route, navigation}) => {

  const [marker, setMarker] = useState({latitude: 10, longitude: 10});
  const [mapRegion, setMapRegion] = useState({latitude: 10, longitude: 10, latitudeDelta: 1, longitudeDelta: 1});

  const monitorPosition = () => {
    Geolocation.getCurrentPosition(position => {
      if (position) {
        setMapRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        });
      }
    },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
  };

  useEffect(() => monitorPosition());

  const handleMapPress = (e) => {
    console.log(e.nativeEvent.coordinate);
    setMarker({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <View>
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
      <MapView
        style={MapScreenLtrStyle.map}
        customMapStyle={MapStyle}
        initialRegion={mapRegion}
        onPress={(e) => handleMapPress(e)}
        showsUserLocation={true}
      >
        {marker != null ?
          <MapView.Marker
            key={1}
            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
            title={I18n.t('destination')}
          /> : null
        }
      </MapView>
      <View style={MapScreenLtrStyle.bottomContainer}>
      <TouchableOpacity style={MapScreenLtrStyle.button}>
        <Text style={MapScreenLtrStyle.button_text}>{I18n.t('i_want_concrete_here')}</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapScreen;
